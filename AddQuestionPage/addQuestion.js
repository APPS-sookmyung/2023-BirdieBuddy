import {$} from "../src/util.js";
import {buttonline} from "../src/buttonline.js"
buttonline();

var openFile = function(file) {
    var input = file.target;
    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      var output = document.getElementById('output');
      output.src = URL.createObjectURL(input.files[0]);
      output.style.backgroundCOlor = "red";
    };
    reader.readAsDataURL(input.files[0]);
};

$("#fileButton").addEventListener("change", (e)=>{
    openFile(e);
});