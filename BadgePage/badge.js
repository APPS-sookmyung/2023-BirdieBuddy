import {buttonline} from "../src/buttonline.js"
import {$} from "../src/util.js"

function achieveBadge(clicked){
    clicked.src = "./badgeImg/coin.png";
}

function main(){
    const coinSlots = document.getElementsByClassName("coinSlot");
    console.log(coinSlots);
    for (let element of coinSlots){
        element.addEventListener("click", (e)=>{
            achieveBadge(e.target);
        })
    }
}

buttonline();
main();