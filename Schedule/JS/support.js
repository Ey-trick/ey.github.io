
function removeClass(preWeeks,lateWeeks,Day,Class){
    if(s2 <= preWeeks || s2 >= lateWeeks){
        let bridge = dayNum[Day].getElementsByTagName("ul");
        let classNum = bridge[0].getElementsByTagName("li");
        let flag = classNum[Class].getElementsByTagName('a');
        flag[0].innerHTML = " ";
        flag[1].innerHTML = " ";
    }
}
/* 遇到的问题：getEementsByTagName()获取到的子元素，包含子元素中的含有该标签的元素
            当追踪第几节课时，由于"level-1" ul 里 li 内又有 ul 的 li，导致追踪不能符合用户所想节数
            索性把没有文字的 li 处也加上"level-2" ul 及里面的 li ，
            这样用户想要的第 n 节课，在js中写成 2*(n-1) 节课就好
*/

function ReMove(){
    /* 从11周开始周1第2节课清除 */
    removeClass(0,11,0,2);
    removeClass(2,11,0,6);
    removeClass(3,14,0,8);

    removeClass(3,16,1,0);
    removeClass(2,5,1,2);
    removeClass(0,11,1,6);
    removeClass(0,15,1,8);
    removeClass(8,14,1,12);

    removeClass(0,11,2,0);
    removeClass(0,11,2,2);
    removeClass(2,11,2,6);
    removeClass(3,14,2,12);

    removeClass(0,15,3,0);
    removeClass(2,5,3,2);
    removeClass(6,11,3,12);

    removeClass(0,11,4,2);
    removeClass(0,17,4,6);
    removeClass(2,5,4,12);
    removeClass(0,11,4,0); 
}
ReMove();