const pageButton = document.getElementsByClassName("pageButton");
for (let i=0; i<pageButton.length;i++){
    if (pageButton[i].id != "currentButton"){
    pageButton[i].addEventListener("mouseover",function(){this.style.backgroundColor = "#DCEC97"})
    pageButton[i].addEventListener("mouseout",function(){this.style.backgroundColor = "#DAE2B6";})
    }
}

const editButton1 = document.getElementById("editButton1");
const editButton2 = document.getElementById("editButton2");
const nickname = document.getElementById("nickname");
const introduce = document.getElementById("introduce");

editButton1.addEventListener("click",function(){
    nickname.focus();
    nickname.style.pointerEvents = "auto";
    nickname.removeAttribute("readonly");
})
editButton2.addEventListener("click",function(){
    introduce.focus();
    introduce.style.pointerEvents = "auto";
    introduce.removeAttribute("readonly");
})
nickname.addEventListener("blur",function(){
    this.style.pointerEvents = "none";
    this.setAttribute("readonly","readonly");
})
introduce.addEventListener("blur",function(){
    this.style.pointerEvents = "none";
    this.setAttribute("readonly","readonly");
})