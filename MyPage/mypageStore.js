const pageButton = document.getElementsByClassName("pageButton");
for (let i=0; i<pageButton.length;i++){
    if (pageButton[i].id != "currentButton"){
    pageButton[i].addEventListener("mouseover",function(){this.style.backgroundColor = "#DCEC97"})
    pageButton[i].addEventListener("mouseout",function(){this.style.backgroundColor = "#DAE2B6";})
    }
}

const inButtons = document.getElementsByClassName("inboxButton");
for (let i=0; i<inButtons.length;i++){
    inButtons[i].addEventListener("click",function(){
        this.style.backgroundColor = "#9DB58990"
        this.style.color = "white";
        for (let j=0; j<inButtons.length;j++){
            if (inButtons[j].style.backgroundColor="#9DB58990" && i!=j){
                inButtons[j].style.backgroundColor="#DCEC9750";
                inButtons[j].style.color="#9DB589";
            }
        }
    });
}