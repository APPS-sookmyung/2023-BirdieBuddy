import { $ } from "../src/util.js";

const leftLeaf = $("#leftLeaf");
const rightLeaf = $("#rightLeaf");
const button = $("#submitButton");
const form = $("#userinfo");



/*async function sendData(){
    try{
        const response = await fetch('https://birdieserver.today:8080/allUserPage',{
            method: "POST",
            body: formData,
        });
    } catch(e){
        console.error(e);
    }
}
*/
form.addEventListener('submit', (e)=>{
    console.log('Hello!');
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data["email"] = formData.get('userId');
    data["image"] = "";
    console.log(JSON.stringify(data));
    fetch('https://birdieserver.today:8080/allUserPage', {
        method:"POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        },
        mode: 'cors',
    }).then(response => response.json())
    .then(json => console.log(json));
})


/*button.addEventListener("click",()=>{
    leftLeaf.classList.add("leftLeafAppear");
    rightLeaf.classList.add("rightLeafAppear");
    setTimeout(function () {
        location.href = "../EncyclopediaPage/encyclopedia.html";
    }, 3000);
})*/