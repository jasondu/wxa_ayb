// pages/address/index.js
const { User, Query, Cloud } = require('../../libs/leancloud/av-weapp-min.js');
Page({
  data: {
    address: '',
    addressDetail: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  getAddress: function () {
    var self = this;
    wx.chooseLocation({
      success: function (res) {
        // success
        self.setData({
          address: res.address
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  save: function (e) {
    console.log('formid: ' + e.detail.formId);
    Cloud.run('sendWxaTemplate', {
      openid: 'owLn50BTW-H9nIMGsnFzUvcDtt0w',
      templateid: 'MfMVvu2FgaI-UJ1otWc5SlBsenUoewPRkI5en92zje4',
      formid: e.detail.formId,
      data: {
        "keyword1": {
          "value": "339208499",
          "color": "#173177"
        },
        "keyword2": {
          "value": "2015年01月05日 12:30",
          "color": "#173177"
        }
      },
      emphasis_keyword: 'keyword1.DATA'
    }).then((data) => {
      console.log(JSON.stringify(data));
    }).catch(error => {

    })
  }
})