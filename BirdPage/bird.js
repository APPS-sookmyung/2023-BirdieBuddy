import {buttonline} from "../src/buttonline.js"
import {$} from "../src/util.js"

//메뉴 버튼들 하이라이트 되는 코드
buttonline();

const initWindowSize = window.innerWidth;

function concernExplain(){
    let isExplain = false;
    const concernCoords = $("#concern").getBoundingClientRect();
    const birdnameCoords = $("#birdName").getBoundingClientRect();
    console.log(concernCoords.left,concernCoords.right);
    $("#concern").addEventListener("mouseover",()=>{
        let scale = window.innerWidth/initWindowSize;
        if (!isExplain){
            $("#concern").insertAdjacentHTML("afterend", `
            <div id="concernSideNote" style="top:${concernCoords.top-birdnameCoords.top+40}px; transform:translateX(${(concernCoords.left-birdnameCoords.left)*scale - 135}px);">
                <p><span style="color:navy">EX</span>: 절멸</p>
                <p><span style="color:purple">EW</span>: 야생 절멸</p>
                <p><span style="color:red">CR</span>: 위급</p>
                <p><span style="color:#C04E01">EN</span>: 위기</p>
                <p><span style="color:orange">VU</span>: 취약</p>
                <p><span style="color:yellow">NT</span>: 준위협</p>
                <p><span style="color:yellowgreen">LC</span>: 최소관심</p>
            </div>
            `)
            isExplain = true;
        }
    })
    $("#concern").addEventListener("mouseout",()=>{
        $("#concernSideNote").remove();
        isExplain = false;
    })
}
concernExplain();
