// pages/setting/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    language: wx.L.getLanguage(),
    settingPageData: []
  },
  setpagedata() {
    this.setData({
      settingPageData: [
        {
          url: '/pages/wallet/walletinfo',
          imgSrc: '../../images/wallet.png',
          text: this.data.language.walletinfo
        },
        {
          url: '/pages/wallet/mnemonic',
          imgSrc: '../../images/seedIcon.png',
          text: this.data.language.seed
        },
        {
          url: '/pages/language/index',
          imgSrc: '../../images/icons/language.png',
          text: this.data.language.language
        },
        {
          url: '',
          imgSrc: '../../images/icon_dagx.png',
          text: this.data.language.about
        }
      ]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setpagedata
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      language: wx.L.getLanguage()
    })
    this.setpagedata()
    wx.L.setNavigationBarTitle(wx.L.getLanguage().settings)
    wx.L.setTabBarLang()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  outLogin() {
    wx.showModal({
      title: '清除票夹',
      content: '确定要清除票夹？',
      showCancel: true, //是否显示取消按钮
      cancelText: "否", //默认是“取消”
      cancelColor: 'skyblue', //取消文字的颜色
      confirmText: "是", //默认是“确定”
      confirmColor: 'skyblue', //确定文字的颜色
      success: function(res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          wx.clearStorageSync()
          app.wallet = {};
          wx.switchTab({
            url: '/pages/home/index',
          })
        }
      },
      fail: function(res) {}, //接口调用失败的回调函数
      complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })

  },
  navigateToFun: function(event) {
    if (event.currentTarget.dataset.url == '') {
      wx.showToast({
        title: '即将上线',
        icon: "none",
        mask: true
      })
    } else if (app.wallet.address) {
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