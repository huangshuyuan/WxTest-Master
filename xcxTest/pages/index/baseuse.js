// pages/index/baseuse.js

var songdata = require('../../utils/data.js').songs;
var MusicService = require('../../utils/music');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    message: "我是个文本",
    array: [1, 2, 3, 4, 5],
    view: 'APP',
    flag: true,
    object: {
      key: 'Hello '
    },
    imgUrls: [
      'http://p3.music.126.net/bKFfzVVNmdLTaRN5uHHPqA==/18786255672743757.jpg',
      'http://p4.music.126.net/n15ddawhY4cyIzFu23CSJA==/1401877341861315.jpg',
      'http://p3.music.126.net/zMwH3zh33TAacyh2_4RjXw==/1375489062675977.jpg'
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var rs = [],
      idsMap = {},
      keys = Object.keys(songdata),
      len = keys.length;

    for (var i = 0; i < len; i++) {
      var k = keys[i];

      rs.push(Object.assign({
        id: k,
      }, songdata[k]));

      idsMap[k] = {
        preid: i > 0 ? keys[i - 1] : 0,
        nextid: i < len - 1 ? keys[i + 1] : 0
      }
    }

    idsMap[keys[0]].preid = keys[len - 1];
    idsMap[keys[len - 1]].nextid = keys[0];

    this.setData({
      recommends: rs
    });


    this.initdata();
   

    MusicService.getIndexMusic(this.initPageData);
    MusicService.getTopMusicList(this.initTopList);
  },
  initPageData: function(data) {
    var self = this;
    console.log("page-->data" + data.data.slider);
    if (data.code == 0) {
      self.setData({
        slider: data.data.slider,
        radioList: data.data.radioList,
        songList: data.data.songList
      })
    }
  },
  initTopList: function(data) {
    var self = this;
    if (data.code == 0) {
      console.log("top-->data" + data.data.topList);

      self.setData({

        topList: data.data.topList
      })
    }
  },
  //初始化网络数据
  initdata: function(data) {
    var self = this;
    wx.request({
      url: 'http://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
      data: data,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {

        if (res.statusCode == 200) {
       
          console.log("success-->" + res.data);
          self.setData({
            toplistList: res.data

          });

        } else {
          console.log("success-->" + statusCode);

        }
      }
    });
  }, 
  playTap: function(e) {
    const dataset = e.currentTarget.dataset;
    console.log(dataset);
    wx.navigateTo({

      // url: `../play/index?id=${dataset.id}`
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