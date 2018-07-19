(function(exports) {
  // 获取音乐列表
  exports.getMusicList = function() {

  };


  exports.getLogin = function(username, password, callback) {

    wx.request({
      url: 'https://otasystem.chinacloudsites.cn/oauth/token?password=' + password + '&scope=read write&client_secret=mobile&client_id=mobile-client&username=' + username + '&grant_type=password',
      header: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      success: function(res) {
        if (res.statusCode == 200) {
          console.log(res.data);
          callback(res.data)
        } else {

        }
      }

    });
  };


  /**
  touser	是	接收者（用户）的 openid
  template_id	是	所需下发的模板消息的id
  page	否	点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
  form_id	是	表单提交场景下，为 submit 事件带上的 formId；支付场景下，为本次支付的 prepay_id
  data	是	模板内容，不填则下发空模板
  color	否	模板内容字体的颜色，不填默认黑色 【废弃】
  emphasis_keyword	否	模板需要放大的关键词，不填则默认无放大
   */
  exports.sendMessage = function(openid, callback) {
    var data = {
      touser: id,
      template_id: '64HmH3Ezwwm8gDgUAROTxyC_JkbYqtWEbHyCLTpwo30',
      form_id: 'json',
      data: '您支付成功了',
      emphasis_keyword: '成功了',
      
    };
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=ACCESS_TOKEN',
      data: data,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.statusCode == 200) {
          console.log(res.data);
          callback(res.data);
        } else {

        }

      }
    });
  }








}(module.exports))