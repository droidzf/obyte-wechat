// /utils/i18n.js
let L = {
  locale: null,
  locales: {},
}

L.registerLocale = function(locales) {
  L.locales = locales;
}

L.setLocale = function(name) {
  L.locale = name;
  L.setTabBarLang()
  L.setNavigationBarTitle(L.locales[L.locale].appname)
}

L.getLanguage = function() {
  return L.locales[L.locale];
}
// 设置导航栏标题
L.setNavigationBarTitle = function(name) {
  wx.setNavigationBarTitle({
    title: name
  })
}
// 设置 TabBar 语言
L.setTabBarLang = function() {
  wx.setTabBarItem({
    'index': 0,
    'text': L.locales[L.locale].Ticketholder
  })
  wx.setTabBarItem({
    'index': 1,
    'text': L.locales[L.locale].Discover
  })
  wx.setTabBarItem({
    'index': 2,
    'text': L.locales[L.locale].settings
  })
}
export default L