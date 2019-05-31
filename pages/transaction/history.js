// pages/transaction/history.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    assetid:"",
    assetname:"",
    stable:0,
    historyData: {}
  },

  onLoad: function(options){

    this.setData({
      assetid:decodeURIComponent(options.assetid),
      assetname:options.assetname,
      stable: Number(options.stable)
    });

    this.getHistory()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getHistory();
    wx.stopPullDownRefresh();
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
    //console.log("onShow---");
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getHistory()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  clickHistory(e) {
    //console.log(e.currentTarget.dataset.unit);
    //var url = 'https://e.dagx.io/#' + e.currentTarget.dataset.unit;
    //console.log(url);
    //wx.navigateTo({url: url});
  },
  ReceiveClick(e){
    wx.navigateTo({
      url: '../../pages/transaction/receive',
    })
  },
  PaymentClick(e){
    var that = this;
    wx.navigateTo({
      url: '../../pages/transaction/payment?assetid=' +encodeURIComponent(that.data.assetid),
    })
  },
  // 时间转换
  getDate(date) {
    let adate = new Date(date)
    let n, y, r, s, f; // 年，月，日，时，分
    n = adate.getFullYear()
    y = adate.getMonth() + 1
    r = adate.getDate()
    s = adate.getHours()
    f = adate.getMinutes()
    return n + '-' + y + '-' + r + '  ' + s + ':' + f
  },
  filterHistory:function(allTrans){
    var result = [];
    for (let i in allTrans) {
      //console.log("alltrans");
      
      if(this.data.assetid == 'base' && allTrans[i].asset == null)
      {
        //console.log(allTrans[i]);
        result.push(allTrans[i]);
      }
      else
      {
        if (allTrans[i].asset == this.data.assetid)
        {
          result.push(allTrans[i]);
        }
      }
    }
    return result;
  },
  getTransMoney:function(tran){

    var money = 0;
    if(tran.text == "转入")
    {
      for (var key in tran.to) {
        if (tran.to[key].address == app.wallet.address) {
          money += Number(tran.to[key].amount);
        }
      }
    }
    else
    {
      for (var key in tran.to) {
        if (tran.to[key].address != app.wallet.address) {
          money += Number(tran.to[key].amount);
        }
      }
    }
    return money;
  },
  // 获取历史记录
  getHistory() {
    let that = this;
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: app.conf.baseUrl + 'addressInfo',
      method: 'POST',
      data: {
        address: app.wallet.address
      },
      success: function (res) {
        for (let i in res.data.objTransactions) {
          res.data.objTransactions[i].date = that.getDate(res.data.objTransactions[i].date)
          if (res.data.objTransactions[i].from[0].address == app.wallet.address) {
            res.data.objTransactions[i].text = '转出';
            res.data.objTransactions[i].money = that.getTransMoney(res.data.objTransactions[i]);
            
            var toKey = Object.keys(res.data.objTransactions[i].to)[0];
            res.data.objTransactions[i].address = res.data.objTransactions[i].to[toKey].address;

          } else {
            res.data.objTransactions[i].text = '转入';
            res.data.objTransactions[i].money = that.getTransMoney(res.data.objTransactions[i]);
            res.data.objTransactions[i].address = res.data.objTransactions[i].from[0].address;
            var fromKey = Object.keys(res.data.objTransactions[i].from)[0];
            res.data.objTransactions[i].address = res.data.objTransactions[i].from[fromKey].address;
          }
        }
        //console.log(res.data.objTransactions);
        that.setData({
          historyData: that.filterHistory(res.data.objTransactions)
        })
        wx.showToast({
          title: '加载成功',
          icon: 'none'
        })
      },
      fail: function (err) {
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        })
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  }
})