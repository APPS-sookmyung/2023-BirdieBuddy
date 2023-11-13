//약식 구축하기
const $ = (selector) => document.querySelector(selector);

const pageButton = document.getElementsByClassName("pageButton");
for (let i=0; i<pageButton.length;i++){
    if (pageButton[i].id != "currentButton"){
    pageButton[i].addEventListener("mouseover",function(){this.style.backgroundColor = "#DCEC97"})
    pageButton[i].addEventListener("mouseout",function(){this.style.backgroundColor = "#DAE2B6";})
    }
}


//탐조 위치: 쓰는 글에 따라 배경 흰색 부분이 같이 커지는 코드
function resizeInput() {
    this.style.width = (this.value.length+8) + "ch";
}
const place = $("#place");
place.addEventListener("input",resizeInput);


//+ 버튼을 누르면 새로운 로그가 나타나는 코드 (로그 생성과 동시에 json object 추가)
//json을 부르는 코드. assert, {type:'json'}이 없으면 에러가 뜬다. 아 참, html에도 type="module"을 넣어줘야한다.
import data from './record.json' assert { type: 'json' };

//⭐outerHTML
const addedRecord = $(".birdFrame").outerHTML;
$("#addButton")
    .addEventListener("click",()=>{
        $(".add").insertAdjacentHTML("beforeend",addedRecord)
        data[1].Birds.push({"Birdname":"", "Explanation":"", "Photos":[], "Id":""});
})



//input type file을 누를때 쓸 함수이다. (대표 사진이 바뀌고, file에서 받은 사진들을 json에 저장하는 코드)
function changePhoto(target){
    target.addEventListener("change",()=>{
        const files = target.files;
        //FileReader이란걸 쓴다. 
        const allFiles = document.querySelectorAll(".file");
        const allInitPhotos = document.querySelectorAll(".photo");
        const allNumbers = document.querySelectorAll(".number");
        const allTotals = document.querySelectorAll(".total");

        //내가 클릭한 file이 몇번째 file 버튼일까 구하는 코드
        const index = Array.prototype.indexOf.call(allFiles,target);

        /*
        const reader = new FileReader();
        reader.addEventListener("load",()=>{
            //처음에 allInitPhotos[index]말고 그냥 $(".photos")했더니만 첫번째 file 대표사진만 바뀌더라. 이런 실수.
            allInitPhotos[index].src = reader.result;
            allInitPhotos[index].style.width = "8vw";
            allInitPhotos[index].style.height = "auto";
        })
        if (file){
            reader.readAsDataURL(file);
        }
        */
        if (files.length){
            allNumbers[index].innerText = 1;
            allTotals[index].innerText = target.files.length;
            data[1].Birds[index].Photos.length = 0;
        }
        for (let i=0; i<files.length; i++){
            let reader = new FileReader();
            reader.onload = ()=>{
                data[1].Birds[index].Photos.push(reader.result);
                if (i==0){
                    allInitPhotos[index].src = reader.result;
                    allInitPhotos[index].style.width = "15vw";
                    allInitPhotos[index].style.height = "auto";
                }
            }
            reader.readAsDataURL(files[i]);
        }
        console.log(data[1].Birds[index].Photos)
        target.value = '';
    })
}

//부모에 위임해서 JS로 새로 생긴 HTML에게도 eventListen 할수 있게 해주는 코드
$(".add")
    .addEventListener("click",(e)=>{
        //- 버튼을 누르면 로그가 삭제되는 코드
        if (e.target.className == "deletebutton" && document.querySelectorAll(".birdFrame").length>1){
            e.target.closest(".birdFrame").remove();
        }
        if (e.target.className == "file"){    
            //파일 버튼 누르면 인풋 파일이 작동하는 코드
            changePhoto(e.target);
            //왼쪽 쉬프트 누르고 파일 버튼 누르면 전체 화면 뜨는 코드
            if (e.shiftKey){
                e.target.disabled = true;
                const imgFullScreen = $("#imgFullScreen")
                imgFullScreen.style.display = "flex";
                $("#fsImg").src = e.target.parentElement.querySelector(".photo").src;
                imgFullScreen.addEventListener("click",()=>{
                    imgFullScreen.style.display = "none";
                    e.target.disabled = false;
                })
            }
        }

        //왼쪽 오른쪽 버튼 누르면 다른 사진으로 넘어가는 코드
        if (e.target.className == "prevImg"){
            const allPrevImg = document.querySelectorAll(".prevImg");
            const index = Array.prototype.indexOf.call(allPrevImg,e.target);
            const allNumbers = document.querySelectorAll(".number");
            const total = document.querySelectorAll(".total")[index].innerText;
            const allInitPhotos = document.querySelectorAll(".photo");
            if (allNumbers[index].innerText==1){
                allNumbers[index].innerText = total;
            }
            else{
                allNumbers[index].innerText--;
            }

            //사진바꾸기 술
            //data[1].Birds[allNumbers[index].innerText -1]
            let currentImg = allNumbers[index].innerText -1
            allInitPhotos[index].src = data[1].Birds[index].Photos[currentImg];
            //allInitPhotos[index].src = data[1].Birds[allNumbers[index].innerText -1];
        }
        if (e.target.className=="nextImg"){
            const allNextImg = document.querySelectorAll(".nextImg");
            const index = Array.prototype.indexOf.call(allNextImg,e.target);
            const allNumbers = document.querySelectorAll(".number");
            const total = document.querySelectorAll(".total")[index].innerText;
            const allInitPhotos = document.querySelectorAll(".photo");
            if (allNumbers[index].innerText==total){
                allNumbers[index].innerText = 1;
            }
            else{
                allNumbers[index].innerText++;
            }
            let currentImg = allNumbers[index].innerText -1
            allInitPhotos[index].src = data[1].Birds[index].Photos[currentImg];
        }
    })



//Submit 누르면 날짜와 장소를 json파일로 옮기기
$("#addRecordBirdButton")
    .addEventListener("click",()=>{
        data[0].Date = $("#date").value;
        data[0].Place = $("#place").value;
        const birdNames = document.querySelectorAll(".birdName")
        const writings = document.querySelectorAll(".write")
        for (let i=0; i<birdNames.length; i++){
            data[1].Birds[i].Birdname = birdNames[i].value;
            data[1].Birds[i].Explanation = writings[i].value;
            data[1].Birds[i].Id = i+1;
            //"Birdname":"","Explanation":"","Photos":[],"Id":1
        }
            
        setTimeout(()=>{location.href = "../ViewRecordPage/viewRecord.html";},2000);
        
})
