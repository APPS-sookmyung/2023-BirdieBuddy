const pageButton = document.getElementsByClassName("pageButton");
for (let i=0; i<pageButton.length;i++){
    if (pageButton[i].id != "currentButton"){
    pageButton[i].addEventListener("mouseover",function(){this.style.backgroundColor = "#DCEC97"})
    pageButton[i].addEventListener("mouseout",function(){this.style.backgroundColor = "#DAE2B6";})
    }
}

const photo = document.getElementById("photo");
const file = document.getElementById("file");
const addImg = document.getElementById("addImg");
photo.addEventListener("click",function(){
    file.click()
})
file.addEventListener("change",function(){
    photo.style.display = "none";
    addImg.style.backgroundImage = `url(${this.value[0]})`;
})

const place = document.getElementById("place");
place.addEventListener("input",resizeInput);
resizeInput.call(input);
function resizeInput() {
    this.style.width = (this.value.length+8) + "ch";
}

