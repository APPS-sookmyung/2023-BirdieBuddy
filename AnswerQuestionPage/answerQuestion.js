import {$} from "../src/util.js";
import {buttonline} from "../src/buttonline.js"
buttonline();

document.querySelectorAll(".questioner").forEach(q=>{
    q.innerHTML = q.innerText + "(글쓴이)";
})