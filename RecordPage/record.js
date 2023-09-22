const $ = (selector) => document.querySelector(selector);

const pageButton = document.getElementsByClassName("pageButton");
for (let i=0; i<pageButton.length;i++){
    if (pageButton[i].id != "currentButton"){
    pageButton[i].addEventListener("mouseover",function(){this.style.backgroundColor = "#DCEC97"})
    pageButton[i].addEventListener("mouseout",function(){this.style.backgroundColor = "#DAE2B6";})
    }
}

const photo = $(".photo");
const file = $(".file");
const addImg = $(".addImg");
photo.addEventListener("click",function(){
    file.click()
})
file.addEventListener("change",function(){
    photo.style.display = "none";
    addImg.style.backgroundImage = `url(${this.value[0]})`;
})

//탐조 위치: 쓰는 글에 따라 배경 흰색 부분이 같이 커지는 방힉
function resizeInput() {
    this.style.width = (this.value.length+8) + "ch";
}
const place = $(".place");
place.addEventListener("input",resizeInput);


//+ 버튼을 누르면 새로운 로그가 나타나는 코드
const addedRecord = $(".birdFrame").outerHTML;
$("#addButton")
    .addEventListener("click",()=>{
        $(".add")
            .insertAdjacentHTML("beforeend",addedRecord)
    })

//- 버튼을 누르면 로그가 삭제되는 코드
$(".add")
    .addEventListener("click",(e)=>{
        if (e.target.className == "deletebutton"){
            console.log("Hey!");
            e.target.closest(".birdFrame").remove();
        }
    })