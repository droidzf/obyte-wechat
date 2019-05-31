// pages/wallet/import.js


const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recoverGetshell: '',
    isconfirmrecover: false,
    focusIndex: 0,
    inputValue: ["", "", "", "", "", "", "", "", "", "", "", ""],
    confirm_type: ["next", "next", "next", "next", "next", "next", "next", "next", "next", "next", "next", "确定",]
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let reg = /\s/
    let that = this
    wx.getClipboardData({
      success: function (res) {

        let data = res.data.trim().split(" ")
        if (data.length == 12) {
          wx.showModal({
            title: "提示信息",
            content: "是否粘贴  " + res.data + " 进行恢复",
            success: function (res) {
              if (res.confirm) {
                that.setData({
                  inputValue: data
                })
              } else if (res.cancel) {
                // console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },

  recoverFun() {
    var self = this;
    this.isValueNull();
    if (this.data.isconfirmrecover) {
      wx.showLoading({ title: '正在恢复obyte票夹',});
      try {

        let onSuccess = function(){
          console.log("on import success");
          setTimeout(function () { wx.navigateBack() }, 500)
        }

        let onFail = function()
        {
          wx.showToast({
            title: '恢复失败，请检查口令是否正确',
            icon: "none"
          })
        }

        let onComplete = function(){
          console.log("on import complete");
          wx.hideLoading();
        }
        app.createWallet(this.data.recoverGetshell,true,onSuccess,onFail,onComplete);
      }
      catch (err) {
        wx.hideLoading()
        wx.showModal({
          title: '错误提示',
          content: '口令错误，请重新输入' + err,
          showCancel: false
        })
      }

    } else {
      wx.showToast({
        title: '请输入正确口令',
        icon: "none"
      })
    }
  },

  //  用户输入 钱包种子
  bindinput(e) {
    let focusIndex = e.currentTarget.dataset.key
    let eventValue = "inputValue[" + focusIndex + "]"
    this.setData({
      [eventValue]: e.detail.value.replace(" ", "")
    })
    this.setData({
      focusIndex: focusIndex
    })
    if (e.detail.keyCode == 32) {  // 判断用户空格
      this.setData({
        focusIndex: ++focusIndex
      })
    }
    // 判断用户删除
    if (e.detail.keyCode == 8 && e.detail.value.length == 0 && e.currentTarget.dataset.key != 0) {
      this.setData({
        focusIndex: --focusIndex
      })
    }

  },
  isValueNull() {
    for (let i = 0; i < 12; i++) {
      if (this.data.inputValue[i].trim().length === 0 || this.data.inputValue[i].trim() == undefined) {
        this.setData({
          isconfirmrecover: false
        })
      } else {

        this.setData({
          recoverGetshell: this.data.inputValue.join(" "),
          isconfirmrecover: true
        })
      }
    }
  },
  bindNextConfirm(e) {
    if (e.currentTarget.dataset.key == 11) {
      return false
    }
    this.setData({
      focusIndex: ++this.data.focusIndex
    })
  }
})