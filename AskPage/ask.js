import {$} from '../src/util.js';
import {buttonline} from '../src/buttonline.js';
buttonline();

setTimeout(()=>{
    $(".tearImg").style.display = "block";
    document.querySelectorAll(".sorry").forEach(s => s.style.display="block");
},1500)
setTimeout(()=>{
    document.querySelectorAll(".sorry").forEach(s => s.remove());
    $("#hidePage").style.display = "block";
    $(".tearImg").remove();
    $(".angryImg").src = "./img/angry2.png";
    $(".sorryImg").src = "./img/sorry2.png";
    $("#imgBundle").style.margin = "65px auto";
    $("#imgBundle").querySelectorAll("div").forEach(d => {
        d.style.width = "200px";
    })
    $(".angryImg").style.width = "200px";
    $(".angryImg").style.marginLeft = "50px";
    $(".angryImg").style.height = "350px";
    $(".sorryImg").style.marginTop = "20px";
    $(".sorryImg").style.width = "200px";

    $("#countDown").style.display = "block";
},4000)

var dday = new Date(2024,3,1);
setInterval(()=>{
    var today = new Date();
    var seconds = Math.floor((dday - (today))/1000);
    var minutes = Math.floor(seconds/60);
    var hours = Math.floor(minutes/60);
    var days = Math.floor(hours/24);

    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
    
    $(".day").innerText = days;
    $(".hour").innerText = hours;
    $(".minute").innerText = minutes;
    $(".second").innerText = seconds;

    if ($("#hidePage").getBoundingClientRect().bottom>$("#countDown").getBoundingClientRect().top){
        $("#countDown").style.color = "white";
    } else{
        $("#countDown").style.color = "black";
    }
}, 100)
