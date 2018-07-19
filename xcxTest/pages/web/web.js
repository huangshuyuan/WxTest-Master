// pages/out/web.js
var base64 = require('../../utils/base64');
Page({
  showNavigationBarLoading: function() {
    wx.showNavigationBarLoading()
  },
  hideNavigationBarLoading: function() {
    wx.hideNavigationBarLoading()
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let modeEncode = options.linkInfo
    let modeDecode = decodeURIComponent(modeEncode)
    let linkInfo = JSON.parse(base64.decode(modeDecode));
    console.log("linkInfo:-->" + linkInfo);
    var url = linkInfo.linkUrl;
    var url2 = url.replace('http:', 'https:');
    console.log("linkInfo url :-->" + url2);

    this.setData({
      linkUrl: url2
    })
    // var url3 = "http://192.168.20.200:81/login/Login.jsp?logintype=1";
    // this.setData({
    //   linkUrl: url3
    // })
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

  }
})