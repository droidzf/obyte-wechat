// pages/transaction/receive.js

const app = getApp()
const Qr = require('../../utils/wxqrcode.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcodeImg: '',
    showModalStatus: false,
    gatheringMoney: 0,
    inputMoney: '',
    wallteAddress: '',
    isgatheringMoney: false
  },

  onShow: function () {
    var that = this;
    let qrcodeSize = that.getQRCodeSize()
    that.setData({
      wallteAddress: app.wallet.address
    })
    that.createQRCode('byteball:' + app.wallet.address, qrcodeSize)
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  },
  copyWalletAddress: function () {
    wx.setClipboardData({
      data: app.wallet.address,
      success: function (res) {
      }
    })
  },
  //适配不同屏幕大小的canvas
  getQRCodeSize: function () {
    var size = 0; try {
      var res = wx.getSystemInfoSync();
      var scale = 550 / 278; //不同屏幕下QRcode的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      size = width;

    } catch (e) {
      // Do something when catch error
      // console.log("获取设备信息失败"+e);
    }
    return size;
  },
  createQRCode: function (text, size) {
    //调用插件中的draw方法，绘制二维码图片

    let that = this

    // console.log('QRcode: ', text, size)
    let _img = Qr.createQrCodeImg(text, {
      size: parseInt(size)
    })
    that.setData({
      'qrcodeImg': _img
    })
  },
  opentanchuang() {
    this.setData({
      showModalStatus: true
    })
  },
  //打开弹窗
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  //关闭弹窗
  powerClose: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  //窗口动画
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  // 设置金额 点击确定按钮 获取金额 
  getGaetheringMoney(e) {
    this.powerDrawer(e)
    if (this.data.inputMoney.trim()) {
      this.setData({
        gatheringMoney: this.data.inputMoney,
        isgatheringMoney: true
      })
      let qrcodeSize = this.getQRCodeSize()
      this.createQRCode('byteball:' + app.wallet.address + '?amount=' + this.data.gatheringMoney, qrcodeSize)
    } else {

    }

  },
  // input 输入事件 传值
  inputMoney(e) {
    this.setData({
      inputMoney: e.detail.value
    })
  },
  //清除金额  不设置金额 
  clearMoney() {
    this.setData({
      isgatheringMoney: false,
      gatheringMoney: 0,
      inputMoney: ''
    })
    var that = this;
    let qrcodeSize = that.getQRCodeSize()
    that.createQRCode('byteball:' + app.wallet.address, qrcodeSize)
  }
})