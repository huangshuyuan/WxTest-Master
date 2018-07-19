// pages/home/home.js
var MusicService = require('../../utils/music');
var base64 = require('../../utils/base64');
var Link = require('../../utils/httpUtils');
var items = ['分享', 'QQ', '微信', '新浪']
var pageObject = ({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    slider: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    radioList: [],
    songList: [],
    current: 0, // 记录轮播下标的

    // tabbar  
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    scrollLeft: 0,
    index: 0,


    logos: [{
      image: "/image/logo1.png",
      title: "路线规划"
    }, {
      image: "/image/logo2.png",
      title: "弹框"
    }, {
      image: "/image/logo3.png",
      title: "服装城"
    }, {
      image: "/image/logo4.png",
      title: "京东生鲜"
    }, {
      image: "/image/logo5.png",
      title: "京东到家"
    }, {
      image: "/image/logo6.png",
      title: "充值中心"
    }, {
      image: "/image/logo7.png",
      title: "京东金融"
    }, {
      image: "/image/logo8.png",
      title: "物流查询"
    }, {
      image: "/image/logo9.png",
      title: "领券"
    }, {
      image: "/image/logo10.png",
      title: "我的关注"
    }],

    actionSheetHidden: true,
    actionSheetItems: items,
  },
  actionSheetTap: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Link.getLogin("shuyuan111", "a11111111111", function(data) {
      console.log("login-->" + data.access_token);
    });

    MusicService.getIndexMusic(this.initData);
    var that = this;
    /**  
    * 获取系统信息  
  
    */
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  listitemClick: function(res) {
    var cla = res.currentTarget.id;
    console.log("你点击了" + cla)

    this.setData({

      clickId: cla

    })

    if (cla == 0) {
      console.log("你点击了" + cla)
      wx.navigateTo({
        url: '../home/route/map',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else if (cla == 1) {
      this.actionSheetTap();
    }

    // wx.showToast({
    //   title: '您点击了' + cla,
    // })
  },
  /**  
   * 滑动切换tab  
   */
  bindChange2: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    // 内容与tabbar的联动  
    //这里的 2 75 是根据顶部tabbar的个数来决定的，我定义的是5个，2是索引，也就是说超过三页才会改变  
    if (e.detail.current > 2) {
      var a = e.detail.current
      console.log("current" + a);
      var query = wx.createSelectorQuery()
      query.select('.scrollBox').boundingClientRect(function(res) {
        var b = res.width
        that.setData({
          scrollLeft: (a - 2) * 75
        })
      })
      query.selectViewport().scrollOffset()
      query.exec(function(res) {})
    } else {
      var a = e.detail.current
      this.setData({
        scrollLeft: 0
      })
    }

  },
  /**  
   * 点击tab切换  
   */
  swichNav: function(e) {
    var that = this;
    console.log(e.target)
    console.log("current-->" + e.target.dataset.current);
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  initData: function(data) {
    console.log(data);
    var that = this;
    that.setData({
      radioList: data.data.radioList,
      slider: data.data.slider,
      songList: data.data.songList,
      loading: true
    });

  },
  swiperClick: function(e) {
    console.log("item-->" + this.data.current);
    // 把要传递的json对象转换成字符串
    let linkInfo = JSON.stringify(this.data.slider[this.data.current]);
    let mode64 = base64.encode(linkInfo)
    // url encode
    let modeEncode = encodeURIComponent(mode64)
    console.log("info-->" + linkInfo);

    wx.navigateTo({
      url: '../web/web?linkInfo=' + modeEncode,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  bindchange: function(e) { //轮播图发生改变，下标改变了
    this.setData({
      current: e.detail.current
    })
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

for (var i = 0; i < items.length; ++i) {
  (function(itemName) {
    switch (itemName) {
      case '分享':
        pageObject['bind' + itemName] = function(e) {
          console.log('click' + itemName, e)
          this.setData({

            actionSheetHidden: !this.data.actionSheetHidden
          })
        }
        break;

      case 'QQ':
        pageObject['bind' + itemName] = function(e) {
          console.log('click' + itemName, e)
          this.setData({

            actionSheetHidden: !this.data.actionSheetHidden
          })
        }
        break;

      case '微信':
        pageObject['bind' + itemName] = function(e) {
          console.log('click' + itemName, e)
          this.setData({

            actionSheetHidden: !this.data.actionSheetHidden
          })
        }
        break;

      case '新浪':
        pageObject['bind' + itemName] = function(e) {
          console.log('click' + itemName, e)
          this.setData({

            actionSheetHidden: !this.data.actionSheetHidden
          })
        }
        break;
    }

  })(items[i])
}

Page(pageObject)