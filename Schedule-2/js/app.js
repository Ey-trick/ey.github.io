window.onload = function(){
  let classes = [
    {
      "lesson" : "分子生物学",
      "place" : "东十二 304",
      "begin" : 1,
      "finish" : 15
    },
    {
      "lesson" : "药学基础",
      "place" : "东十二 304",
      "begin" : 1,
      "finish" : 9
    },
    {
      "lesson" : "生物信息资源实践",
      "place" : "东十二 304",
      "begin" : 11,
      "finish" : 16
    },
    {
      "lesson" : "解剖生理学",
      "place" : "东十二 114",
      "begin" : 1,
      "finish" : 17,
    },
    { 
      "lesson" : "生物统计学",
      "place" : "东十二 207",
      "begin" : 7,
      "finish" : 14
    },
    {
      "lesson" : "遗传学",
      "place" : "东十二 304",
      "begin" : 1,
      "finish" : 13
    },
    {
      "lesson" : "形式与政策",
      "place" : "东九 C103",
      "begin" : 7,
      "finish" : 9
    },
    {
      "lesson" : "系统生物学",
      "place" : "东十二 304",
      "begin" : 9,
      "finish" : 17,
      "despite" : 14
    },
    {
      "lesson" : "遗传学实验",
      "place" : "东十二 五楼",
      "begin" : 8,
      "finish" : 14,
      "despite" : 10,
      "despite_2" : 13
    },
    {
      "lesson" : "解剖实验",
      "place" : "东十二 五楼",
      "begin" : 1,
      "finish" : 17
    },
    {
      "lesson" : "分子生物学实验",
      "place" : "东十二 五楼",
    },
    {
      "lesson" : "生信资源实践上机",
      "place" : "机房",
      "begin" : 12,
      "finish" : 17,
      "despite" : 14
    }
  ]
  const holiday = 5;
  // 星期模块存储数组-->storage
  let storage = document.querySelectorAll(".right");
  // 获取input框元素
  let input = document.querySelector("input");

  // 求当前上时间是2019秋季学期的第几周-->week
  let d1 = new Date();
  let d2 = new Date();
  d2.setMonth(0);
  d2.setDate(0);
  let rq = d1-d2;
  let s1 = Math.ceil(rq/(24*60*60*1000));
  let week = Math.floor(s1/7) - 34;

  // 刷新页面的函数
  function show(){
    // 显示当前周数
    if(week>=0){ 
      document.querySelector("#week").innerHTML = `第${week}周`;
    }
    // 显示周一第一节的分子生物学
    showClass(0,0,0);
    // 周一
    //  生信资源
    showClass(0,1,2);
    //  药学基础
    showClass(0,1,1);
    //  解剖实验
    showClass(0,2,9,true);
    showClass(0,3,9,true);
    //  分子生物学实验
    showExperinment(0,3,10,14);
    // 周二
    //  解剖
    showClass(1,0,3);
    //  生物统计学
    showClass(1,1,4);
    //  遗传学
    showClass(1,2,5);
    //  遗传实验
    showClass(1,4,8);
    showClass(1,5,8);
    // 周三
    //  分子生物学
    showClass(2,0,0);
    //  药学基础
    showClass(2,1,1);
    //  生信资源
    showClass(2,1,2);
    //  系统生物学
    showClass(2,2,7);
    // 周四
    //  解剖
    showClass(3,0,3);
    //  遗传
    showClass(3,1,5);
    //  形势
    showClass(3,2,6);
    //  生信资源上机
    showExperinment(3,2,11,14);
    showExperinment(3,3,11,14);
    showClass(3,4,11);
    showClass(3,5,11);
    // 周五
    //  生物统计学
    showClass(4,0,4);
    //  系统生物学
    showClass(4,1,7);
    //  分子实验
    showExperinment(4,2,10,13);
    showExperinment(4,3,10,13);
    // 周六
    //  分子实验
    showExperinment(5,0,10,13);
    showExperinment(5,1,10,13);
    // 周日
    //  分子实验
    showExperinment(6,0,10,13);
    showExperinment(6,1,10,13);
  }
  // 显示课程函数
  function display(dom,lessonIndex){
    dom.innerHTML = classes[lessonIndex].lesson;
    createInit(dom,classes[lessonIndex].place);
  }
  // 隐藏课程函数
  function hidden(dom){
    dom.innerHTML = "";
    if(dom.querySelector("ul")){
      dom.removeChild();
    }
  }
  // 创造html元素的函数
  function createInit(dom,message){
    let ulDom = document.createElement("ul");
    ulDom.className = "level-1";
    let liDom = document.createElement("li");
    liDom.innerHTML = message;
    ulDom.appendChild(liDom);
    dom.appendChild(ulDom);
  }
  // 课程、地点显示函数
  function showClass(dayIndex,rank,lessonIndex,content){
    let needIt = storage[dayIndex].querySelectorAll(".course")[rank];
    if(content){
      if(week % 2 != 0){
        return;
      }
    }
    if(week >= classes[lessonIndex].begin && week <= classes[lessonIndex].finish && week != holiday && week != classes[lessonIndex].despite && week != classes[lessonIndex].despite_2){
      display(needIt,lessonIndex);
    }
  }
  // 实验、地点显示函数
  function showExperinment(dayIndex,rank,lessonIndex,week1){
    let needIt = storage[dayIndex].querySelectorAll(".course")[rank];
    if(week == week1){
      display(needIt,lessonIndex);
    }
  }
  //重置页面
  function reset(){
    for(let i = 0; i < storage.length; i++) {
      let courses = storage[i].querySelectorAll(".course");
      for(let j = 0; j < courses.length; j++){
        if(courses[j].querySelector("ul")){
          hidden(courses[j]);
        }
      }
    }
  }

  document.querySelector("#left").addEventListener("click",function(){
    if(week>0){
      reset();
      week--;
      show();
    }
  })
  document.querySelector("#right").addEventListener("click",function(){
    if(week<20){
      reset();
      week++;
      show();
    }
  })
  input.onkeydown = function (e) {
    if(e.key === "Enter" && input.value){
      reset();
      week = input.value;
      show();
      input.value = "";
    }
  }
  show();
}
