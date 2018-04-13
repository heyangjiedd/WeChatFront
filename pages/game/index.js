//获取应用实例
const app = getApp()

Page({
  data: {
    currentProgress:100,
    grids:[],
    animationData:{},
    x:0,y:0
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function (query) {
    // this.timeOut()；
    // this.createCanvas();
  },
  onReady: function () {
  },
  onShow: function () {
    this.scale();
    this.scaleSmall();
    this.opacity();
    this.opacity1();
    this.rectData();
  },
  onHide: function () {
    console.log('onHide')
  },
  onUnload: function () {
    console.log('onUnload')
  },
  // 点击事件
  itemClick: function (e) {
    var _this = this;
    if (!_this.isCanClick(e.target.id)){
      return 
    }
    // 点击同一张图片或者消失的图片，直接返回。
    if (_this.beforeId == e.target.id || e.target.id =='NAN'){
      return
    } else{
      // 点击同一类型图片
      if (_this.beforeType == e.target.dataset.type) {
        this.data.grids.forEach(function (r) {
          if (r.id == e.target.id || _this.beforeId == r.id) {
            r.animation = _this.animationOpacity;
            r.id = 'NAN';
            r.border = ''
          }
        });
        _this.beforeType = null;
        _this.beforeId = null;
      } else {
        // 点击不同类型图片
        // 点击图片放大，放大图片恢复原来大小
        this.data.grids.forEach(function (r) {
          if (r.animation != ''){
            r.animation = _this.animationScaleSmall;
          }
          if (r.id == e.target.id) {
            r.animation = _this.animationScale;
          }
        });
        //与点击图片相同类型显示红色提示框
        this.data.grids.forEach(function (r) {
          r.border = ''
          if (r.id != e.target.id && e.target.dataset.type == r.type && _this.isCanClick(r.id)) {
                r.border = 'redBorder';
          }
        });
        _this.beforeType = e.target.dataset.type;
        _this.beforeId = e.target.id;
      }
    }
    this.setData({
      grids: this.data.grids
    })
    if (this.data.grids.filter(function(r){
      return r.id != 'NAN'
    }).length == 0){
      _this.tableAnimationEnd();
      _this.beforeType = null;
      _this.beforeId = null;
      wx.showModal({
        content: 'game over',
        confirmText: "再来一局",
        cancelText: "返回",
        success: function (res) {
          if (res.confirm) {
            _this.rectData(_this.animationOpacity1);
          }else{

          }
        }
      });
    }
  },
  //矩阵数据
  rectData(options =''){
    var array = [], arr = this.createData();
    for (var i = 1; i < 37; i++) {
      array.push({ style: 'plum' + arr[i - 1], id: i, border: '', animation: options,type:arr[i-1]})
    }
    this.setData({
      grids:array
    });
    this.tableAnimationEnter();
  },
  //检测是否可点击
  isCanClick(id){
    var isClick = this.data.grids.filter(function (r) {
      return r.id == id || r.id == +id + 6 || r.id == id - 6
    })
    if(isClick.length  === 3) {
      return false;
    }
    return true;
  },
  //生成配对信息
  createData(){
    var arr = [];
    for (var i = 1; i < 10; i++) {
      arr.push(i); arr.push(i); arr.push(i); arr.push(i);
    }
    return arr.sort(function(){
      return 0.5 - Math.random()
    })
  },
  //进入动画
  tableAnimationEnter:function(){
    var animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'ease-in',
    });
    animation.opacity(1).step();
    this.setData({
      animationData: animation.export()
    })
  },
  //结束动画
  tableAnimationEnd: function () {
    var animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'ease-in',
    });
    animation.opacity(0).step();
    this.setData({
      animationData: animation.export()
    })
  },
  //放大动画
  scale:function(){
    var animationScale = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    animationScale.scale(1.1, 1.1).step();
    this.animationScale = animationScale;
  },
  //缩小动画
  scaleSmall: function () {
    var animationScaleSmall = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    animationScaleSmall.scale(1,1).step();
    this.animationScaleSmall = animationScaleSmall;
  },
  //消失动画
  opacity: function () {
    var animationOpacity = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    animationOpacity.scale(1.1, 1.1).opacity(0).step();
    this.animationOpacity = animationOpacity;
  },
  // 显示动画
  opacity1: function () {
    var animationOpacity1 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    animationOpacity1.scale(1, 1).opacity(1).step();
    this.animationOpacity1 = animationOpacity1;
  },
  // 点击开始
  primary(){
    
  },
  // 点击暂停
  default() {

  },
  // 点击结束
  warn() {

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
