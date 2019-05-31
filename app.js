import { createWallet } from './utils/bng.js';
import languages from './pages/language/languages.js'//各国语言
import L from './utils/i18n'//国际化工具类
L.registerLocale(languages);
L.setLocale(wx.getStorageSync('lang') || "简体中文");
wx.L = L;//wx.L.getLanguage()获取当前语言对象

App({

  onLaunch: function() {
    let self = this;
    var walletinfo = wx.getStorageSync('obyteinfo');
    if (walletinfo)
      self.wallet = walletinfo;
    this.syncBalances();
    
  },
  wallet: {
    mnemonic: "",
    walletId: "",
    address: "",
    privKeyBuf: "",
    publicKey: "",
    definition: [],
    balance: 0,
    assets: [{
      assetid: 'base',
      name: 'bytes',
      stable: 0,
      pending: 0
    }, ]
  },

  conf: {
    baseUrl: 'https://obytewallet.outman.com/',
    unLoadFileUrl: 'https://kyc.outman.com/'
  },
  //判断是否有钱包
  hasWallet: function() {
    var _haswallet = false;
    if (this.wallet && this.wallet.address && this.wallet.address.length == 32) {
      _haswallet = true;
    }
    return _haswallet;
  },


  /**
   * 创建钱包/导入钱包
   */
  createWallet: function(mneonic, dosync, onSuccess, onFail, onComplete) {
    mneonic = arguments[0] ? arguments[0] : null;
    dosync = arguments[1] ? arguments[1] : false;
    let _result = createWallet(mneonic)
    var walletinfo = {
      mnemonic: _result.mnemonic_phrase,
      walletId: _result.wallet,
      address: _result.address,
      privKeyBuf: _result.privKeyBuf,
      publicKey: _result.definition[1].pubkey,
      definition: _result.definition,
      balance: 0,
      assets: [{
        assetid: 'base',
        name: 'bytes',
        stable: 0,
        pending: 0
      }, ]
    };
    this.wallet = walletinfo;
    wx.setStorageSync('obyteinfo', this.wallet);
    if (dosync) {
      this.syncBalances(onSuccess, onFail, onComplete);
    } else {
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    }
  },

  //同步资产余额
  syncBalances: function(onSuccess, onFail, onComplete) {
    let self = this;
    if (!self.hasWallet())
      return;

    wx.request({
      url: self.conf.baseUrl + "getAssetBalance",
      data: {
        address: self.wallet.address
      },
      method: "POST",
      success: function(resp) {

        if (resp.statusCode == 200) {
          self.wallet.assets = resp.data;
          
          wx.setStorageSync('obyteinfo', self.wallet);
          if (typeof onSuccess === "function") {
            onSuccess();
          }
        } else {
          if (typeof onFail === "function") {
            onFail("读取资产余额失败");
          }
          console.log(resp);
        }
      },
      fail: function(res) {
        if (typeof onFail === "function") {
          onFail("读取资产余额失败");
        }
      },
      complete: function() {
        if (typeof onComplete === "function") {
          onComplete();
        }
      }
    })
  },
  //清除助记词
  clearMnemonic:function()
  {
    this.wallet.mnemonic = "";
    wx.setStorageSync('obyteinfo', this.wallet);
    wx.showToast({
      title: '助记词已清除',
      icon: "none"
    })
  },
  //刷新资产名称
  refreshAssetName: function() {

  }
});