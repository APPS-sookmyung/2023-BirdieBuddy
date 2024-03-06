import { $ } from "../src/util.js";

const leftLeaf = $("#leftLeaf");
const rightLeaf = $("#rightLeaf");
const button = $("#submitButton");
const form = $("#userinfo");
const id = $('#id');
const idBird = $('#idBird');
const email = $('#email');
const pw = $('#pw');
const submitButton = $('#submitButton');

let idVal = "";
let pwVal = "";
let emailVal = "";
let isFetchSent = false;

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(checkMailOverlap);
    checkMailOverlap.then(val=>{
        console.log(val);
        if (checkDomain && checkPw && !val){
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            emailVal = data.email;
            pwVal = data.pw;

            leftLeaf.classList.add("leftLeafAppear");
            rightLeaf.classList.add("rightLeafAppear");
            setTimeout(()=>{
                idBird.style.display = 'block';
                $('#signInForm').style.display = 'none';
            },1000)
            
            setTimeout(()=>{
                let idBirdRect = idBird.getBoundingClientRect();
                const idBirdDoc = idBird.contentDocument;
                const tags = idBirdDoc.querySelectorAll(".tag");
                console.log(idBirdDoc);
                console.log(tags);
                
                id.style.left = `${window.innerWidth * 0.5}px`;
                id.style.top = `${window.innerHeight * 0.5 + idBird.clientHeight*0.30}px`
        
                idBird.addEventListener('animationend',()=>{
                    console.log("Animation Ended");
                    tags.forEach(tag=>{
                        tag.animate([
                            {opacity:0},
                            {opacity:1}
                        ],{
                            duration:1000,
                            fill:'forwards',
                            easing: 'linear'
                        })
                    })
                    id.style.display = 'block';
                    $('#instruction').animate([
                        {opacity: 0,
                        display:'block'},
                        {opacity:1,
                        display:'block'}
                    ],{
                        duration: 3000,
                        fill: 'forwards',
                        easing: 'linear'
                    })
                    id.focus();
                    console.log(idBirdRect.left);
                    console.log(idBirdRect.width);
                    window.onresize = function idLeft(){
                        id.style.left = `${window.innerWidth * 0.5 - idBirdRect.width * 0.3}px`;
                        id.style.top = `${idBirdRect.bottom - idBird.clientHeight*0.22}px`
                    }
                })
                $('#id').addEventListener('keyup',function(e){
                    if (e.key==="Enter"){

                        idVal = $('#id').value;

                        checkMailOverlap = fetch("https://birdieserver.today:8080/allUserPage")
                        .then(response => response.json())
                        .then(json => {
                            for (let i=0; i<json['data'].length; i++){
                                if (json['data'][i].userId==$('#id').value){
                                    console.log('Existing ID!');
                                    $('#instruction').innerText = "이미 존재하는 이름입니다"
                                    $('#instruction').style.color = 'red';
                                    $('#instruction').animate(
                                        [
                                            {left: '50%', offset:0},
                                            {left: '48%', offset:0.25},
                                            {left: '50%', offset:0.5},
                                            {left: '52%', offset:0.75},
                                            {left: '50%', offset:1},
                                        ],
                                        {
                                            duration: 300,
                                            fill: 'forwards',
                                            easing: 'linear'
                                        }
                                    )
                                    setTimeout(()=>{
                                        $('#instruction').innerText = "동박새 이름을 지어주세요!"
                                        $('#instruction').style.color = 'white';
                                    },2000);
                                    return true;
                                }
                            }
                            return false;
                        })
                        .catch(e=>{console.log(e, "에러발생")})
                        .then(val => {
                            if (!val){
                                console.log('d')
                                console.log('Enter!');
                                const sendData = {
                                    "userId":idVal,
                                    "email": emailVal,
                                    "pw": pwVal,
                                    "image": ""
                                }
                                console.log(sendData);
                                fetch('https://birdieserver.today:8080/SignInPage', {
                                    method:"POST",
                                    body: JSON.stringify(sendData),
                                    headers:{
                                        "Content-type": "application/json; charset=UTF-8"
                                    },
                                    mode: 'cors',
                                }).then(response => response.json())
                                .then(json => {
                                    console.log(json);
                                    tags.forEach(tag=>{
                                        tag.animate([
                                            {opacity:1},
                                            {opacity:0}
                                        ],{
                                            duration:1000,
                                            fill:'forwards',
                                            easing: 'linear'
                                        })
                                    })
                                    $('#instruction').animate([
                                        {opacity: 1,
                                        display:'block'},
                                        {opacity:0,
                                        display:'block'}
                                    ],{
                                        duration: 1000,
                                        fill: 'forwards',
                                        easing: 'linear'
                                    })
                                    $('#id').style.color = "rgba(0,0,0,0)";
                                    document.activeElement.blur();
                                    setTimeout(()=>{
                                        $('#idBird').animate([
                                            {scale:1, left:"50%"},
                                            {scale:1.5, left:"-20%"}
                                        ],{
                                            fill:'forwards',
                                            duration: 1000,
                                            easing: 'linear'
                                        })
                                        $('#id').style.display = "none";
                                    },1000)
                                    setTimeout(()=>{
                                        window.location.href = "../index.html";
                                    },2000)
                                });
                            }
                        })
                    }
                })
            },2000)
            setTimeout(function () {
                //location.href = "../EncyclopediaPage/encyclopedia.html";
            }, 3000);
        }
    })
})

function eraseWarning(){
    document.querySelectorAll('.warning').forEach(warning=>{
        warning.remove();
    })
}
let checkAt = 0;
let checkDomain = false;
let checkPw = false;
let checkMailOverlap = false;

email.addEventListener('focusout',()=>{
    eraseWarning();
    for (let i=0; i<email.value.length; i++){
        
        if (email.value[i]=='@' && i>0){
            checkAt=i;
        }
        if (checkAt){
            if (email.value[i]=='.' && i<email.value.length-1 && i!=checkAt+1){
                checkDomain=true;
            }
        }
    }
    if ((!checkDomain) && (email.value.length>0)){
        submitButton.parentElement.insertAdjacentHTML('beforebegin',`<p class="warning">메일 포멧 확인 바랍니다.</p>`)
    }
})
email.addEventListener('focus',()=>{
    if (email.value.length && $('.warning')){
        eraseWarning();
    }
})

pw.addEventListener('focusout',()=>{
    eraseWarning();
    checkPw = true;
    const specialChar = ['"', '!','#','$','%','&',"'",'(',')','*','+',',','-','.','/',':',';','<','=','>','?','@','[','\\',']','^','_','{','|','}','~'];
    let noSpecialChar = specialChar.every(char=>{
        if (pw.value.includes(char)){
            return false
        }else{
            return true
        }
    })
    if (noSpecialChar && pw.value.length<10 && pw.value.length){
        checkPw = false;
        submitButton.parentElement.insertAdjacentHTML('beforebegin',`<p class="warning">특수문자 포함 10글자 비밀번호를 요합니다.</p>`)
    } else if (noSpecialChar && pw.value.length){
        checkPw = false;
        submitButton.parentElement.insertAdjacentHTML('beforebegin',`<p class="warning">특수문자가 없습니다.</p>`)
    }else if (pw.value.length<10 && pw.value.length){
        checkPw = false;
        submitButton.parentElement.insertAdjacentHTML('beforebegin',`<p class="warning">10글자가 아닙니다.</p>`)
    } else if (pw.value.length==0){
        checkPw = false;
    }
})
pw.addEventListener('focus',()=>{
    if (pw.value.length && $('.warning')){
        eraseWarning();
    }
})


button.addEventListener("click",()=>{
    checkMailOverlap = fetch("https://birdieserver.today:8080/allUserPage")
    .then(response => response.json())
    .then(json => {
        for (let i=0; i<json['data'].length; i++){
            if (json['data'][i].email==email.value){
                eraseWarning();
                submitButton.parentElement.insertAdjacentHTML('beforebegin',`<p class="warning">Existing Email.</p>`)
                checkMailOverlap = true;
                return true;
            }
        }
        checkMailOverlap = false;
        return false;
    })
})