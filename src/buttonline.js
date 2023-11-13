export function buttonline(){
    const pageButton = document.getElementsByClassName("pageButton");
    for (let i=0; i<pageButton.length;i++){
        if (pageButton[i].id != "currentButton"){
            pageButton[i].addEventListener("mouseover",function(){this.style.backgroundColor = "#DCEC97"})
            pageButton[i].addEventListener("mouseout",function(){this.style.backgroundColor = "#DAE2B6";})
        }
    }
    console.log("Psyche!")
}
