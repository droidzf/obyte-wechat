// pages/wallet/create.js

const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    command: "",
    disabled_btn: true,
    showHide_btn: false
  },
  onShow: function () {
    this.setData({
      command: app.wallet.mnemonic ? app.wallet.mnemonic : ""
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu()
  },

  createwallte:function(){

    let self = this;

    wx.showLoading({
      title: '正在创建票夹...',
    })

    this.setData({
      disabled_btn: true
    })
    try {

      let onSuccess = function () {
        self.setData({
          command: app.wallet.mnemonic,
        });
      }
      app.createWallet(null, false, onSuccess);

      wx.hideLoading()
      this.setData({
        disabled_btn: false,
        showHide_btn: true
      })
    } catch (err) {
      wx.showToast({
        title: '创建票夹失败，请重新创建',
      })
    }
  },

  naviToHome: function (event) {
    wx.switchTab({
      url: "/pages/home/index",
    })
  },

  // 是否选择同意了
  checkboxChange(e) {
    if (e.detail.value.length > 0) {
      this.setData({
        disabled_btn: false
      })
    } else {
      this.setData({
        disabled_btn: true
      })
    }
  }

})