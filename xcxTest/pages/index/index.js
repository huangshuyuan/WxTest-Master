//index.js
//获取应用实例
const app = getApp()


Page({

  base: function () {
    //跳转到新的页面
    console.log("基本组件使用");
    wx.navigateTo({
      url: '/pages/index/baseuse'
    })
  },
  phone: function () {
    wx.makePhoneCall({
      phoneNumber: '17625900755' //仅为示例，并非真实的电话号码
    })
  },
  scan: function () {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })

    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      }
    })
  },
  photo: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
      }
    })
  },
  payclick: function () {
    //支付功能
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function (res) {
      },
      'fail': function (res) {
      }
    })

  },
  click: function () {
    console.log("hello");
    wx.navigateTo({
      url: '/pages/index/test'
    })
  },
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
 
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    shareData: {
      title: '我的测试',
      desc: '小程序示例',
      src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=562788460,3373006479&fm=27&gp=0.jpg',
      path: '/pages/index/index'
    }
  },
//小程序分享
  onShareAppMessage: function () {
    return this.data.shareData
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // this.data.mottto=common.sayHello("hi")
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })

    }


  },
  onError:function(msg){
    console.log(msg)
  },
  onPageNotFound:function(){
    console.log("没有页面")
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})
