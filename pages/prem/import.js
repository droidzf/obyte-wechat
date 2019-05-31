// pages/prem/import.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textcoin:'',
    focus: 'true',
    language: wx.L.getLanguage(),
    settingPageData: []
  },

  setpagedata() {
    this.setData({
      settingPageData: [
        {
          url: '/pages/profile/kyc',
          imgSrc: '../../images/kycIcon.png',
          text: this.data.language.import
        }
      ]
    })
  },

  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      textcoin: e.detail.value,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 导入文本币
   */
  importTextcoin: function () {
    console.log(this.data.textcoin);
    

    this.setData({
      focus: 'false'
    });
    var mn = this.data.textcoin;

    //focus:'false'，

    wx.request({
      url: app.conf.baseUrl + "receiveTextCoin",
      data: {
        mnemonics: mn,
        address: app.wallet.address
      },
      method: "POST",
      success: function (resp) {
        if(resp.statusCode == 200)
        {
          wx.showToast({
            title: '导入成功',
            icon: "none"
          })

          app.syncBalances(null,null,function(){

          });
        }
        else
        {
          console.log(resp);
          wx.showToast({
            title: '导入失败:'+resp.data.err,
            icon: "none"
          })
        }
      },
      fail: function (res) {
        console.log("fail",res)
      },
      complete: function () {
      }
    })


  },
})