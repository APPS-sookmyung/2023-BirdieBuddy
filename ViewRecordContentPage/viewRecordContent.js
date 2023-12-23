const $ = selector => document.querySelectorAll(selector);
import { buttonline } from '../src/buttonline.js';

function makeEditable(){
    $(".birdName").forEach(name => {
        name.readOnly = false;
        name.classList.add("hoverCursorText");
    })
    $(".birdNum").forEach(num => {
        num.readOnly = false;
        num.classList.add("hoverCursorText");
    })
    $(".write").forEach(write => {
        write.readOnly = false;
        write.classList.add("hoverCursorText");
    })
    $(".file").forEach(file => {
        file.removeAttribute('disabled');
    })
    $(".fileLabel").forEach(label => {
        label.classList.add("hoverCursorPointer")
    })
    $(".deletebutton").forEach(button => {
        button.style.display = "block";
    })
}
function makeUneditable(){
    $(".birdName").forEach(name => {
        name.readOnly = true;
        name.classList.remove("hoverCursorText");
    })
    $(".birdNum").forEach(num => {
        num.readOnly = true;
        num.classList.remove("hoverCursorText");
    })
    $(".write").forEach(write => {
        write.readOnly = true;
        write.classList.remove("hoverCursorText");
    })
    $(".file").forEach(file => {
        file.setAttribute('disabled', "");
    })
    $(".fileLabel").forEach(label => {
        label.classList.remove("hoverCursorPointer")
    })
    $(".deletebutton").forEach(button => {
        button.style.display = "none";
    })
}

buttonline();
document.querySelector("#edit").addEventListener("click",()=>{
    makeEditable();
    document.querySelector("#buttons").style.display = "block";
})

const addedRecord = document.querySelector(".birdFrame").outerHTML;
document.querySelector("#addButton").addEventListener("click",()=>{
        document.querySelector(".add").insertAdjacentHTML("beforeend",addedRecord);
        makeEditable();
})

document.querySelector(".add").addEventListener("click",(e)=>{
    if (e.target.className == "deletebutton" && document.querySelectorAll(".birdFrame").length>1){
        e.target.closest(".birdFrame").classList.add("swipeLeft");
        setTimeout(function () {
            e.target.closest(".birdFrame").remove();
        }, 350);
    }
})

document.querySelector("#addRecordBirdButton").addEventListener("click",(e)=>{
    makeUneditable();
    e.target.closest("#buttons").style.display = "none";
    console.log(e.target);
})