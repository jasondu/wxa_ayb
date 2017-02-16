// pages/address_list/index.js
const { Query } = require('../../libs/leancloud/av-weapp-min.js');
Page({
  data:{
    first: true,
    address: []
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    new Query('Address')
      .descending('createdAt')
      .find()
      .then(address => this.setData({ address }))
      .catch(console.error);
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  editAddress: function (e) {
    wx.navigateTo({
      url: '/pages/address/index?status=edit&id=' + e.currentTarget.dataset.id
    })
  },
  addAddress: function () {
    wx.navigateTo({
      url: '/pages/address/index?status=add'
    })
  }
})