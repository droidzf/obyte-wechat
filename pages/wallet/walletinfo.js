// pages/wallet/walletinfo.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: []
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      address: app.wallet ? app.wallet.address : "",
      balance: app.wallet ? app.wallet.assets[0].stable + (app.wallet.assets[0].pending > 0 ? " 待确认:" + app.wallet.assets[0].pending : "") : 0,
      publicKey: app.wallet ? app.wallet.publicKey : ""
    })
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

  copywallteaddress: function() {
    wx.setClipboardData({
      data: app.wallet.address,
      success: function(res) {
      }
    })
  }
})