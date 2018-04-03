//index.js
//获取应用实例
const app = getApp()

Page({
  //页面的初始数据
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //生命周期函数--监听页面加载
  onLoad: function (query) {
    this.getUserDetailInfo();
  },
  //生命周期函数--监听页面初次渲染完成
  onReady:function(){
    
  },
  //生命周期函数--监听页面显示
  onShow: function () {
    
  },
  //生命周期函数--监听页面隐藏
  onHide: function () {

  },
  //生命周期函数--监听页面卸载
  onUnload: function () {
    
  }, 
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {

  },
  //页面上拉触底事件的处理函数
  onReachBottom: function () {

  },
  //用户点击右上角转发
  onShareAppMessage: function () {

  },
  //页面滚动触发事件的处理函数
  onPageScroll: function () {

  },
  //当前是 tab 页时，点击 tab 时触发
  onTabItemTap: function () {

  },
  //按钮点击事件
  bindViewTap: function () {
    wx.navigateTo({
      url: '../game/index?key1=1&key2=2',
    })
  },
  //获取用户
  getUserDetailInfo:function(){
    wx.getUserInfo({
      success: res => {
        console.log(res);
      },
      fail: res => {
        this.getSet();
      }
    })
  },
  getSet: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.getUserDetailInfo();
        } else {
          if (res.authSetting['scope.userInfo'] === undefined) {
            wx.authorize({
              scope: 'scope.userInfo',
              success: (res) => {
                this.getUserDetailInfo();
              },
            })
          }
          if (res.authSetting['scope.userInfo'] === false) {
            wx.openSetting({
              success: (res) => {
                if (res.authSetting['scope.userInfo']) {
                  this.getUserDetailInfo();
                }
              }
            })
          }
        }
      }
    })
  }
})
