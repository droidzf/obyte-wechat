// pages/transaction/payment.js
const app = getApp();
const bng = require('../../utils/bng.js');
var bngClient;
var intervalid;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    paymentAddress: '',
    paymentMoney: '',
    paymentData: {},
    showAddressFrom: true,
    submitPaymentMoney: false,
    assets: app.wallet.assets,
    assetname: "bytes",
    assetid: "base",
    paymentApi: 'pay'
  },

  onLoad: function(options) {
    this.setData({
      assetid: options.assetid ? options.assetid : "base",
      assetname: options.assetname ? options.assetname : "bytes",
      assets: app.wallet.assets
    });
  },
  onShow: function (options) {
    bngClient = new bng.Client("wss://obyte.outman.com/bb");
    intervalid = setInterval(this.heartbeat, 10 * 1000);
  },
  heartbeat() {
    bngClient.api.heartbeat();
  },
  onHide: function (options) {
    bngClient.client.close();
    clearInterval(intervalid)
  },
  onUnload: function (options) {
    bngClient.client.close();
    clearInterval(intervalid)
  },
  bindAssetChange(e) {
    this.setData({
      assetid: app.wallet.assets[e.detail.value].assetid,
      assetname: app.wallet.assets[e.detail.value].name
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideShareMenu()
  },

  // 地址输入事件
  paymentAddressFun(e) {
    this.setData({
      paymentAddress: e.detail.value.trim()
    })
  },
  // 金额输入事件
  paymentMoneyFun(e) {
    this.setData({
      paymentMoney: e.detail.value.trim()
    })
  },
  // 扫一扫
  scanCodeFun() {
    let that = this
    wx.scanCode({
      //onlyFromCamera: false,  //是否只能从相机扫码，不允许从相册选择图片
      scanType: ['qrCode'],
      success: function(res) {
        if (res.result.indexOf("byteball") != -1) {
          that.setData({
            showAddressFrom: true,
            paymentAddress: res.result.split(":")[1].split("?")[0],
            paymentMoney: res.result.split(":")[1].split("?")[1] ? res.result.split(":")[1].split("?")[1].split("=")[1] : 0
          })
        }
      },
      fail: function(err) {
        wx.showToast({
          title: '请扫描正确的收款二维码',
          icon: 'none'
        })
      }
    })
  },
  submitPaymentMoney() {
    if(!bngClient.client.open){
      wx.showToast({
        title: '正在连接，请稍后',
      })
      return
    }
    console.log('----------------begin')
    console.log(this.data.paymentAddress)
    console.log(this.data.paymentMoney)
    console.log(this.data.paymentApi)
    console.log('-------------end')
    let that = this
    if (this.data.paymentAddress && this.data.paymentMoney) {
      wx.showLoading({
        title: '正在转帐...',
      })
      that.setData({
        submitPaymentMoney: true
      })
      this.setData({
        paymentMoney: parseInt(this.data.paymentMoney)
      })
      const payment = {
        outputs: [{
          address: this.data.paymentAddress,
          amount: this.data.paymentMoney
        }]
      };
      if (this.data.assetid != 'base') {
        payment.asset = this.data.assetid
      }
      bngClient.post.payment(payment, app.wallet.privKeyBuf, function(err, result) {

        if (err) {
          wx.showToast({
            title: '转账失败'
          })
        } else {
          wx.showToast({
            title: '转账成功'
          })
          setTimeout(function() {
            wx.navigateBack()
          }, 2000)
        }
        that.setData({
          submitPaymentMoney: false
        })
        wx.hideLoading()
      });
    } else {
      wx.showToast({
        title: '请输入地址或金额',
        icon: 'none'
      })
    }
  },
  showAddressFrom() {
    this.setData({
      showAddressFrom: true
    })
  }
})