
window.onload = function () {
    var plus = document.getElementsByClassName("latter");
    var minus = document.getElementsByClassName("pre");
    plus[0].addEventListener("click",function(){
        s2++;
        let Week = document.getElementById("week");
        Week.innerHTML = s2;
        Show();
        ReMove();
    })
    minus[0].addEventListener("click",function(){
        s2--; 
        let Week = document.getElementById("week");
        Week.innerHTML = s2;
        Show();
        ReMove();
    })
}
