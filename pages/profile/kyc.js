// pages/profile/kyc.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath: '../../images/idcard.png',
    userSeletPhoto: false,
    address: '',
    birth: '',
    sex: '',
    num: '',
    name: '',
    requestId: '',
    nationality: ''
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  copyrequestId(e) {  // 复制
    wx.setClipboardData({
      data: e.currentTarget.dataset.requestid,
    })
  },
  aachooseImage() {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths[0]
        var imgUrlBase64
        that.setData({
          imgPath: tempFilePaths,
          userSeletPhoto: true
        })
      }
    })
  },
  undateFile() {
    wx.showLoading({
      title: '识别中,请稍后...',
      mask: true
    })
    let that = this
    wx.uploadFile({
      url: app.conf.unLoadFileUrl + 'ocridimg',
      filePath: that.data.imgPath,
      name: "image",
      success(reg) {
        reg.data = JSON.parse(reg.data)
        if (reg.data.address) {
          that.setData({
            address: reg.data.address,
            birth: reg.data.birth,
            sex: reg.data.sex,
            num: reg.data.num,
            name: reg.data.name,
            requestId: reg.data.request_id,
            nationality: reg.data.nationality
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '照片不符合要求',
            showCancel: false
          })
        }
      },
      fail(err) {
        console.log(err)
        wx.showModal({
          title: '提示',
          content: '网络超时,请稍后重试',
          showCancel: false
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  }
})