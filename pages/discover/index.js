// pages/discover/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    language: wx.L.getLanguage(),
    settingPageData: []
  },
  setpagedata () {
    this.setData({
      settingPageData: [
        // {
        //   url: '/pages/profile/kyc',
        //   imgSrc: '../../images/kycIcon.png',
        //   text: this.data.language.xkyc
        // },
        {
          url: '/pages/prem/import',
          imgSrc: '../../images/icons/pay-per-click.png',
          text: this.data.language.prem
        },
        {
          url: '',
          imgSrc: '../../images/icons/app.png',
          text: this.data.language.dapp
        },
        {
          url: '',
          imgSrc: '../../images/icons/link.png',
          text: this.data.language.appjump
        }
      ]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setpagedata()
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
    this.setData({
      language: wx.L.getLanguage()
    })
    this.setpagedata()
    wx.L.setNavigationBarTitle(wx.L.getLanguage().Discover)
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
  navigateToFun: function (event) {
    if(event.currentTarget.dataset.url == '')
    {
      wx.showToast({
        title: '即将上线',
        icon: "none",
        mask: true
      })      
    }
    else if (app.wallet.address) {
      wx.navigateTo({
        url: event.currentTarget.dataset.url,
      })
    } else {
      wx.showToast({
        title: '没有商票地址',
        icon: "none",
        mask: true
      })
    }
  }
})