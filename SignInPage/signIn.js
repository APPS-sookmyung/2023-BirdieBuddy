import { $ } from "../src/util.js";

const leftLeaf = $("#leftLeaf");
const rightLeaf = $("#rightLeaf");
const button = $("#submitButton");


button.addEventListener("click",()=>{
    leftLeaf.classList.add("leftLeafAppear");
    rightLeaf.classList.add("rightLeafAppear");
    setTimeout(function () {
        location.href = "../EncyclopediaPage/encyclopedia.html";
    }, 3000);
})