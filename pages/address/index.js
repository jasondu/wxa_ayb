// pages/address/index.js
const { User, Query, Cloud, Object } = require('../../libs/leancloud/av-weapp-min.js');
Page({
  data: {
    address: '',
    address_detail: '',
    keyToTitle: {
      name: '联系人',
      tel: '手机号',
      address: '地址',
      address_detail: '地址详情'
    },
    errorText: ''
  },
  objectId: '',
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    if (options.status == 'edit') {
      // 编辑
      this.objectId = options.id;
      var query = new Query('Address');
      query.get(options.id).then((address) => {
        this.setData(address);
      }, (error) => {
        // 异常处理
        console.error(error);
      });
    }
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
    console.log('getAddress');
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
  formInput: function (name) {
  },
  int: null,
  // 地址保存
  save: function (e) {
    console.log('formid: ' + e.detail.formId);
    console.log(e.detail.value);

    var formValue = e.detail.value;
    var isPass = true;
    var title = '';
    for (var key in formValue) {
      var value = formValue[key];
      if (value == '') {
        title = this.data.keyToTitle[key];
        isPass = false;
        break;
      }
    }
    if (!isPass) {
      this.setData({
        errorText: title
      });
      if (this.int == null) {
        this.int = setTimeout(() => {
          this.setData({
            errorText: ''
          });
          this.int = null;
        }, 1000);
      }
    } else {
      if (this.objectId == '') {
        // 添加地址
        var Address = Object.extend('Address');
        var address = new Address();
      } else {
        // 修改地址
        var address = Object.createWithoutData('Address', this.objectId);
      }
      address.set(formValue);
      address.save().then(function (item) {
        console.log('objectId is ' + item.id);
        var app = getApp();
        app.mustUpdate = true;
        wx.navigateBack();
      }, function (error) {
        console.error(error);
      });
    }

    // Cloud.run('sendWxaTemplate', {
    //   openid: 'owLn50BTW-H9nIMGsnFzUvcDtt0w',
    //   templateid: 'MfMVvu2FgaI-UJ1otWc5SlBsenUoewPRkI5en92zje4',
    //   formid: e.detail.formId,
    //   data: {
    //     "keyword1": {
    //       "value": "339208499",
    //       "color": "#173177"
    //     },
    //     "keyword2": {
    //       "value": "2015年01月05日 12:30",
    //       "color": "#173177"
    //     }
    //   },
    //   emphasis_keyword: 'keyword1.DATA'
    // }).then((data) => {
    //   console.log(JSON.stringify(data));
    // }).catch(error => {

    // });
  }
})