function special(){
    
    if(s2 == 11){
        let bridge = dayNum[1].getElementsByTagName("ul");
        let classNum = bridge[0].getElementsByTagName("li");
        let flag = classNum[12].getElementsByTagName('a');
        let one = flag[0];
        one.innerHTML = " ";
        let cd = classNum[12].getElementsByTagName("ul");
        cd[0].style.display = "none";
    }

    if(s2 >=14 && s2 <= 18){
        let bridge = dayNum[2].getElementsByTagName("ul");
        let classNum = bridge[0].getElementsByTagName("li");
        let flag = classNum[0].getElementsByTagName('a');
        let change = flag[0];
        change.innerHTML = puts[4].lesson;
        let search = classNum[0].getElementsByTagName("ul");
        let record = search[0].getElementsByTagName('a');
        record[0].innerHTML = puts[4].location;
    }

    if(s2 == 12 || s2 == 15){
        let bridge = dayNum[3].getElementsByTagName("ul");
        let classNum = bridge[0].getElementsByTagName("li");
        let flag = classNum[12].getElementsByTagName('a');
        let change = flag[0];
        change.innerHTML = puts[2].lesson;
        let search = classNum[12].getElementsByTagName("ul");
        let record = search[0].getElementsByTagName('a');
        record[0].innerHTML = puts[5].location;
    }
}