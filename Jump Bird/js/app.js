window.onload=function(){
/*返回一个计时器对象,thisObj:绑定的this对象*/
  function getTimer(duration, thisObj, startCallBack, stopCallBack) {
    let timer = null;
    if (thisObj && startCallBack) {
      startCallBack = startCallBack.bind(thisObj); //绑定this
    }
    if (thisObj && stopCallBack) {
      stopCallBack = stopCallBack.bind(thisObj);
    }
    return {
      start: function () {
        if (!timer) { //计时器不存在
          timer = setInterval(function () {
            if (startCallBack) {
              startCallBack(duration);
            }
          }, duration);
        }
      },
      stop: function () {
        if (timer) {
          clearInterval(timer);
          timer = null;
          if (stopCallBack) {
            stopCallBack();
          }
        }
      }
    }
  }
  

  //天空对象
  let sky = {
    left: 0,
    dom: document.querySelector('.sky'),
    show: function(){
      //刷新页面
      this.dom.style.left = this.left + "px";
    } 
  }
  sky.timer = getTimer(30,sky,function(){
    this.left -= 1;
    if(this.left === -game.width){
      this.left = 0;
    }
    this.show();
  });

  //大地对象
  let land = {
    left: 0,
    dom: document.querySelector('.ground'),
    show: function(){
      //刷新页面
      this.dom.style.left = this.left + "px";
    }
  }
  land.timer = getTimer(30,land,function(){
    this.left -= 2;
    if(this.left === -game.width){
      this.left = 0;
    }
    this.show();
  });

  //bird对象
  let bird = {
    width: 33,
    height: 26,
    top: 150,
    left: 200,
    dom: document.querySelector(".bird"),
    wingIndex: 0,  //记录当前小鸟的图片索引
    speed: 0, //初始速度，向下的速度，每毫秒移动的像素值
    a: 0.002, //加速度
    show: function () {
        //设置top值
        this.dom.style.top = this.top + "px";
    },
    setTop: function (newTop) {
        //设置新高度
        if (newTop < 0) {
            newTop = 0;
        }
        else if (newTop > game.maxHeight - this.height) {
            newTop = game.maxHeight - this.height;
        }
        this.top = newTop;
    },
    jump: function () {
        this.speed = -0.4;
    }
  }
  bird.wingTimer = getTimer(100,bird,function(){
    this.wingIndex = (this.wingIndex + 1) % 3;
    this.show();
  });
  bird.dropTimer = getTimer(16,bird,function(t){
    let s= this.speed * t + 0.5 * this.a * t * t;
    this.setTop(this.top + s);
    this.speed = this.speed + this.a * t;
    this.show();
  })

  //create 柱子
  let pipes = {
    width: 52,
    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    all: [],//保存产生的所有柱子
    /* 产生一对柱子*/
    createPair: function () {
      let minHeight = 60, //柱子的最小高度
          gap = 150, //空隙
          maxHeight = game.maxHeight - gap - minHeight;
      //确定柱子的高度
      let h1 = this.getRandom(minHeight, maxHeight);
      let h2 = game.maxHeight - h1 - gap;
      let div1 = document.createElement("div");
      div1.className = "up";
      div1.style.height = h1 + "px";
      div1.style.left = game.width + "px";
      game.dom.appendChild(div1);
      this.all.push({
        dom: div1,
        height: h1,
        width: this.width,
        top: 0,
        left: game.width
      });
      let div2 = document.createElement("div");
      div2.className = "down";
      div2.style.height = h2 + "px";
      div2.style.left = game.width + "px";
      this.all.push({
        dom: div2,
        height: h2,
        width: this.width,
        top: h1 + gap, //下面柱子的top值= 上面柱子的高度+空隙
        left: game.width
      });
      game.dom.appendChild(div2);
    }
  }
  //得分数对象
  let score = {
    val: 0,
    dom: document.querySelector('.counter'),
    show: function(){
      this.dom.innerHTML = this.val / 2;
    }
  }
  //柱子移动计时器
  pipes.moveTimer = getTimer(15, pipes, function () {
    for (let i = 0; i < this.all.length; i++) {
      let p = this.all[i];//得到当前的柱子
      p.left -= 2;
      if (p.left - bird.left == -p.width) {
        score.val += 1;
        score.show();
      }
      if (p.left < -p.width) {
        //移除
        p.dom.remove();
        this.all.splice(i, 1);
        i--;
      }
      else {
        p.dom.style.left = p.left + "px";
      }
    }
    game.gameOver();
  });
  //生产柱子的计时器
  pipes.produceTimer = getTimer(2500, pipes, function () {
    this.createPair();
  });

  //游戏对象
  let game = {
    width: 800,
    height: 600,
    maxHeight: 600 - 122, // bird 活动范围
    paused: true,//是否为暂停状态
    dom: document.querySelector('.container'),
    isOver: false,//游戏是否结束
    start: function(){
      sky.timer.start();
      land.timer.start();
      bird.dropTimer.start();
      pipes.moveTimer.start();
      pipes.produceTimer.start();
      this.paused = false;
    },
    stop: function(){
      sky.timer.stop();
      land.timer.stop();
      bird.dropTimer.stop();
      pipes.moveTimer.stop();
      pipes.produceTimer.stop();
      this.paused = true;
    },
    gameOver: function(){
      if (bird.top === game.maxHeight - bird.height) {
        this.stop();
        document.querySelector(".over").style.display = "block";
        this.isOver = true;
        return;
      }
      //检测碰撞
      let bx = bird.left + bird.width / 2; //小鸟x中心点
      let by = bird.top + bird.height / 2; //小鸟y中心点
      for (let i = 0; i < pipes.all.length; i++) {
        let p = pipes.all[i];
        // 两个矩形碰撞检测
        // 横向：|矩形1x中心点坐标-矩形2x中心点坐标| < 宽度和/2
        // 纵向：|矩形1y中心点坐标-矩形2y中心点坐标| < 高度和/2
        let px = p.left + p.width / 2; //柱子x中心点
        let py = p.top + 7 + p.height / 2; //柱子y中心点
        if (Math.abs(bx - px) < (p.width + bird.width) / 2 &&
            Math.abs(by - py) < (p.height + bird.height) / 2) {
          this.stop();
          document.querySelector(".over").style.display = "block";
          this.isOver = true;
            return;
        }
      }
    }
  }
  
  //游戏运行机制
  document.documentElement.onkeydown = function (e) {
    if (e.key === " ") {
      bird.jump();
    }
    else if (e.key === "Enter") {
      if (game.isOver) {
        location.reload();
      }
      else if (game.paused) {
        game.start();
      }
      else{
        game.stop();
      }
    }
  }
}

