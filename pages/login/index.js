// pages/login/index.js
const AV = require('../../libs/leancloud/av-weapp-min.js');
Page({
  data: {
    phone: '',
    verifycode: '',
    sendStatus: 0,
    sendTime: 60,
    btnLoading: false,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    AV.User.loginWithWeapp().then(user => {
      this.user = user;
    }).catch(console.error);
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

  setPhone: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },
  setVerifycode: function (e) {
    this.setData({
      verifycode: e.detail.value
    });
  },
  verify: function () {
    var verifycode = this.data.verifycode.trim();
    this.setData({
      btnLoading: true
    });
    if (verifycode == '') {
      wx.showModal({
        title: '温馨提示',
        content: '请输入验证码'
      });
      this.setData({
        btnLoading: false
      });
      return;
    }
    AV.User.verifyMobilePhone(verifycode).then(() => {
      //验证成功
      wx.showModal({
        title: '温馨提示',
        content: '验证成功'
      });
    }, (err) => {
      //验证失败
      console.log(err);
      this.setData({
        btnLoading: false
      });
    });
  },
  // 发送验证码
  send: function (e) {
    if (this.data.sendStatus == 0) {
      // 未发送
      console.log(this.data.phone);
      if (this.data.phone == '') {
        wx.showModal({
          title: '温馨提示',
          content: '请输入手机号码'
        });
        return;
      }
      // 登陆并发送验证码
      AV.User.loginWithWeapp().then(user => {
        // 设置并保存手机号
        user.setMobilePhoneNumber(this.data.phone);
        return user.save();
      }).then(user => {
        // 发送验证短信
        return AV.User.requestMobilePhoneVerify(user.getMobilePhoneNumber());
      }).then(() => {
        // 用户填写收到短信验证码后再调用 AV.User.verifyMobilePhone(code) 完成手机号的绑定
        // 成功后用户的 mobilePhoneVerified 字段会被置为 true
        // 此后用户便可以使用手机号加动态验证码登录了
        this.setData({
          sendStatus: 1
        });
        var int = setInterval(() => {
          if (this.data.sendTime > 0) {
            this.setData({
              sendTime: --this.data.sendTime
            })
          } else {
            clearInterval(int);
            this.setData({
              sendStatus: 0
            });
          }
        }, 1000);
      }).catch(console.error);
    } else {
      // 已发送
    }
  }
})