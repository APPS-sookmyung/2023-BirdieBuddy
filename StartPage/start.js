import { $ } from "../src/util.js";

const pic = $("#startingpageImage");
const nextpic = $("#nextImage");

let num = 0;
let num2 = 1;
const piclst = ["괭이갈매기.jpg","긴꼬리딱새.jpg","꼬까참새.jpg","흰눈썹황금새.jpg"];
function changePic(){
    console.log("changed!");
    pic.src = piclst[num];
    num++;
    if (num==4){num = 0;}
}
function nextPic(){
    nextpic.src = piclst[num2];
    num2++;
    if (num2==4){num2 = 0;}
}
setInterval(changePic,1*1000*10);
setInterval(nextPic, 1*1000*10);

const startPage = document.getElementById("startPage");
function openPage(){
    location.href = "../test/testing.html";
}
startPage.addEventListener("submit", openPage);