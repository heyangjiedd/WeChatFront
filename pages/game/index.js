//获取应用实例
const app = getApp()

Page({
  data: {
    currentProgress:100,
    grids:[],
    x:0,y:0
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function (query) {
    // this.timeOut()；
    // this.createCanvas();
    this.rectData();
    console.log('onLoad')
  },
  onReady: function () {
    console.log('onReady')
  },
  onShow: function () {
    console.log('onShow')
  },
  onHide: function () {
    console.log('onHide')
  },
  onUnload: function () {
    console.log('onUnload')
  },

  //矩阵数据
  rectData(){
    var array = [];
    for (var i = 1; i < 7; i++) {
      for (var j = 1; j < 7; j++) {
        var random = Math.random();
        var style = '';
        if(random<0.25){
          style = 'block0';
        } else if (random < 0.5){
          style = 'heart0';
        } else if (random < 0.75) {
          style = 'spade0';
        }else{
          style = 'plum0';
        }
        array.push({ style: style,id:i*10+j})
      }
    }
    this.setData({
      grids:array
    })
  },
  // 点击事件
  itemClick:function(e){
    debugger
  },
  //canvas组件事件
  start: function (e) {
    this.setData({
      x: e.touches[0].x,
      y: e.touches[0].y
    })
    this.createCanvas(parseInt(e.touches[0].x /53), parseInt(e.touches[0].y/65))
  },
  move: function (e) {
    this.setData({
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  end: function (e) {
    this.setData({
      hidden: true
    })
  },
  // 创建canvas
  createCanvas(touchx, touchy){
    const ctx = this.createrect(wx.createCanvasContext('myCanvas'),6,6,{
      sWidth: 40, sHeight: 40, dWidth: 50, dHeight: 60, marginw: 4, marginh:4
    },touchx,touchy);
    ctx.draw();
  },
  //创建canvas生成矩阵
  createrect(ctx, width, height, options, touchx, touchy){
    for(var i = 0;i < width; i++){
      for(var j = 0;j < height; j++){
        if (i == touchx && j == touchy){
          ctx.setShadow(0,0,40, 'blue')
          ctx.drawImage('../../assets/aixiaochu.jpg', options.sWidth * i, options.sHeight * j, options.sWidth, options.sHeight, i * options.dWidth + i * options.marginw, j * options.dHeight + j * options.marginh, options.dWidth, options.dHeight);
        }else{
          ctx.setShadow(0, 0, 50, '#fff')
          ctx.drawImage('../../assets/aixiaochu.jpg', options.sWidth * i, options.sHeight * j, options.sWidth, options.sHeight, i * options.dWidth + i * options.marginw, j * options.dHeight + j * options.marginh, options.dWidth, options.dHeight);
        }
      }
    }
    return ctx
  },
  //进度条
  timeOut:function(){
    var _this = this;
    var interval = setInterval(function(){
      if (_this.data.currentProgress <= 0){
        clearInterval(interval);
        wx.showModal({
          content: 'game over',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        });
      }else{
        _this.setData({
          currentProgress: _this.data.currentProgress - 100 / 300
        })
      }
    },10)
  }
})
