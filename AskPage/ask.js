import {$} from "../src/util.js";
import {buttonline} from "../src/buttonline.js"
buttonline();

$("#add").addEventListener("mouseover",()=>{
    $("#topLeftCorner").style.border = "0px";
    $("#topRightCorner").style.border = "0px";
    $("#bottomLeftCorner").style.border = "0px";
    $("#bottomRightCorner").style.border = "0px";
})
$("#add").addEventListener("mouseout",()=>{
    $("#topLeftCorner").style.borderTop = "#FCB001 2px solid";
    $("#topLeftCorner").style.borderLeft = "#FCB001 2px solid";
    $("#topRightCorner").style.borderTop = "#FCB001 2px solid";
    $("#topRightCorner").style.borderRight = "#FCB001 2px solid";
    $("#bottomLeftCorner").style.borderBottom = "#FCB001 2px solid";
    $("#bottomLeftCorner").style.borderLeft = "#FCB001 2px solid";
    $("#bottomRightCorner").style.borderBottom = "#FCB001 2px solid";
    $("#bottomRightCorner").style.borderRight = "#FCB001 2px solid";
})

const questions = document.querySelectorAll(".question");
questions.forEach(question =>{
    question.addEventListener("click",()=>{
        window.location.href = "../AnswerQuestionPage/answerQuestion.html";
    })
})

$("#add").addEventListener("click",()=>{
    window.location.href = "../AddQuestionPage/addQuestion.html";
})