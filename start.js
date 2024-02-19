import { $ } from "./src/util.js";

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
setTimeout(()=>{
    setInterval(nextPic, 1*1000*10);
},100);


nextpic.animate(
    [
        {transform:'translateX(-100vw)', offset:0},
        {transform:'translateX(-100vw)', offset:0.85},
        {transform: 'translateX(0%)', offset:1}
    ],
    {
        duration: 10000,
        easing: 'ease-in',
        iterations: Infinity
    }
)

const startPage = document.getElementById("startPage");
function openPage(){
    //location.href = "../test/testing.html";
}
startPage.addEventListener("submit", openPage);

//시작페이지로 다시 돌아올 경우 자동으로 로그아웃 시키기
window.onload = ()=>{
    document.cookie= "userId=" + "" + "; expires=" + "" + "; path=/";
    document.cookie = "email=" + "" + "; expires=" + "" + "; path=/";
}


$('#submitButton').addEventListener('click',(e)=>{
    e.preventDefault();

    const data = {
        "email": $('#email').value,
        "pw": $('#pw').value,
    }
    console.log(data);
    fetch("https://birdieserver.today:8080/StartPage",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        console.log(response.status);
        if (response.status==200){
            console.log("status 200 ok");
            createCookie($("#email").value);
        } else{
            $('#startNew').insertAdjacentHTML('beforebegin',`<p class="warning">아메일/비번이 일치하지 않습니다.</p>`);
        }
    }) 
})

function createCookie(email){
    fetch("https://birdieserver.today:8080/allUserPage")
    .then(val => val.json())
    .then(result => {
        console.log("쿠키 시도!")
        let returnVal = false;
        result.data.forEach(account=>{
            console.log(account);
            if (account.email == email){
                var date = new Date();
                date.setTime(date.getTime()+(3*60*60*1000));
                document.cookie = "userId=" + account.userId + "; expires=" + date.toGMTString() + "; path=/";
                document.cookie = "email=" + account.email + "; expires=" + date.toGMTString() + "; path=/";
                returnVal = true;
            }
        })
        return returnVal;
    })
    .then(result => {
        console.log(result);
        if (result){
            location.href = "./EncyclopediaPage/encyclopedia.html";
        } else{
            console.log("쿠키 실패");
        }
    })

}
