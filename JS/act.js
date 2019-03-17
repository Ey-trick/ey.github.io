var d1 = new Date();
var d2 = new Date();
d2.setMonth(0);
d2.setDate(0);
var rq = d1-d2;
var s1 = Math.ceil(rq/(24*60*60*1000));
var s2 = Math.floor(s1/7) - 6;
    /* 获取当前时间为第几周：s2 */
    /* 开学第一周是本年第8周，所以s2-7 */
var week_change = document.getElementById("week");
week_change.innerHTML = s2;

var dayNum = document.getElementsByClassName("weekDay");
/* 获取元素：dayNum为数组div，其中dayNum[0]表示星期一，以此类推 */

var puts = [
    { "lesson":"仪器分析","location":"东十二104 *" },
    { "lesson":"生物信息学","location":"东十二312 *" },
    { "lesson":"数据库技术及应用","location":"东九D508 *" },
    { "lesson":"生物信息Perl编程","location":"东九D415 *" },
    { "lesson":"工程训练","location":" *" },
    { "lesson":"数据结构与算法","location":"工程实训中心A *" },
    { "lesson":"生物信息学上机","location":"工程实训中心A *" },
    { "lesson":"生物信息学","location":"东十二301 *" },
    { "lesson":"仪器分析","location":"东十二103 *" },
    { "lesson":"生物化学（二）","location":"东九D415 *" },
    { "lesson":"线性代数","location":"东九B303 *" },
    { "lesson":"毛泽东思想和中国特色社会主义理论体系概论","location":"东九C401 *" },
    { "lesson":"数据结构与算法","location":"东九D409 *" },
    { "lesson":"","location":"" },
    { "lesson":"","location":"" },
];

function showClass(Weeks,Day,Class,Content,Place){
    if(s2 >= Weeks){
        let bridge = dayNum[Day].getElementsByTagName("ul");
        let classNum = bridge[0].getElementsByTagName("li");
        let flag = classNum[Class].getElementsByTagName('a');
        flag[0].innerHTML = Content;
        flag[1].innerHTML = Place;
    }
}

function Show(){
    showClass(3,0,6,puts[0].lesson,puts[0].location);
    showClass(4,0,8,puts[1].lesson,puts[1].location);
    showClass(4,1,0,puts[2].lesson,puts[2].location);
    showClass(3,1,2,puts[3].lesson,puts[3].location);
    showClass(9,1,12,puts[6].lesson,puts[6].location);
    showClass(3,2,6,puts[8].lesson,puts[8].location);
    showClass(4,2,12,puts[7].lesson,puts[7].location);
    showClass(3,3,2,puts[3].lesson,puts[3].location);
    showClass(7,3,12,puts[5].lesson,puts[5].location);
    showClass(3,4,12,puts[3].lesson,puts[5].location);
    showClass(1,0,2,puts[9].lesson,puts[9].location);
    showClass(1,1,6,puts[10].lesson,puts[10].location);
    showClass(1,1,8,puts[11].lesson,puts[11].location);
    showClass(1,2,0,puts[9].lesson,puts[9].location);
    showClass(1,2,2,puts[12].lesson,puts[12].location);
    showClass(1,3,0,puts[11].lesson,puts[11].location);
    showClass(1,4,0,puts[10].lesson,puts[10].location);
    showClass(1,4,2,puts[12].lesson,puts[12].location);
}

Show();