// pages/home/index.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    language: wx.L.getLanguage(),
    haswallet: app.hasWallet(),
    address: app.wallet.address,
    shortaddr: "getShortWalletAddres",
    balance: app.wallet.assets[0].stable + app.wallet.assets[0].pending,
    assetlist:[]
  },
  onShow: function () {
    this.setData({
      language: wx.L.getLanguage(),
      haswallet: app.hasWallet(),
      address: app.wallet.address || "",
      balance: this.getBalance(),
      assetlist: app.wallet.assets || []
    })
    wx.L.setNavigationBarTitle(wx.L.getLanguage().appname)
  },
  getBalance : function(){
    if (app.wallet && app.wallet.assets && app.wallet.assets.length > 0)
    {
      return app.wallet.assets[0].stable + app.wallet.assets[0].pending; 
    }
    else
    {
      return 0;
    }
  },

  copyWalletAddress: function () {
    wx.setClipboardData({
      data: app.wallet.address,
      success: function (res) {
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    app.syncBalances();
    this.onShow();
    wx.stopPullDownRefresh();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getShortWalletAddress:function(addr){
    return "XXXXXXXXXX...XXXXXXXXXX";
  },
  // 用户在点击后判断是否有钱包地址 
  navigateToFun: function (event) {
    if (event.currentTarget.dataset.url.indexOf("payment") != -1) {
      var url = '../transaction/payment?assetid=' + "base" + '&assetname=' + "bytes";
      wx.navigateTo({
        url: url
      })
    } else {
      if (app.wallet.address) {
        wx.navigateTo({
          url: event.currentTarget.dataset.url,
        })
      } else {
        wx.showToast({
          title: '没有钱包地址',
          // image: '../../images/code.png', // 自定义icon
          icon: "none",
          mask: true
        })
      }
    }
  },
  showAssetHistory:function(e)
  {
    if (app.hasWallet()) {
      var assetid = e.currentTarget.dataset.assetid;
      console.log('onShowAssetHistory');
      console.log(assetid);
      var assetname = e.currentTarget.dataset.name;
      var stable = e.currentTarget.dataset.stable;
      var url = '../transaction/history?assetid=' + encodeURIComponent(assetid) + '&assetname=' + assetname + '&stable=' + stable;
      console.log(url);
      wx.navigateTo({
        url: url,
      })
    } else {
      return false
    }
  }
})