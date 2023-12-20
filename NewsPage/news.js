import { buttonline } from "../src/buttonline.js";
import { $ } from "../src/util.js";
buttonline();

const articles = document.querySelectorAll(".articleType1");
const mainClientUpY = $("#main").getBoundingClientRect().top;
const mainClientDownY = mainClientUpY + $("#main").offsetHeight;
let lastScroll = $("#main").scrollTop || 0
let scrollDown = false;

$("#main").addEventListener("scroll", (e)=>{
    /*
    })*/
    
    let scrollTop = $("#main").scrollTop;
    if(scrollTop > lastScroll) {
      scrollDown = true;
    } else {
      scrollDown = false;
    }
    lastScroll = scrollTop

    /*articles.forEach(article=>{
        let articleUpY = article.getBoundingClientRect().top;
        let articleUpMidY = articleUpY + (article.offsetHeight/4);
        let articleDownY = articleUpY + article.offsetHeight;
        let articleDownMidY = articleDownY - (article.offsetHeight/4);
        if ((articleUpY>=mainClientUpY && articleDownY<=mainClientDownY)||(articleUpY<mainClientUpY && articleDownY<=mainClientUpY)||(articleUpY>=mainClientDownY && articleDownY>mainClientDownY)){
            article.classList.remove("appearTop");
            article.classList.remove("appearBottom");
        } else {
            if (scrollDown){
                //appearBottom
                if (articleUpY<mainClientDownY && articleUpMidY>mainClientUpY && articleDownY>mainClientDownY && !article.classList.contains("appearBottom")){
                    article.classList.add("appearBottom");
                }
                article.classList.remove("appearTop");
            }else{
                //appearTop
                if (articleDownY>mainClientUpY && articleDownMidY<mainClientUpY && !article.classList.contains("appearTop")){
                    article.classList.add("appearTop");
                }
                article.classList.remove("appearBottom");
            }
            if ((articleUpY>=mainClientUpY && articleDownY<=mainClientDownY)||(articleUpY<mainClientUpY && articleDownY<=mainClientUpY)||(articleUpY>=mainClientDownY && articleDownY>mainClientDownY)){
                article.classList.remove("appearTop");
                article.classList.remove("appearBottom");
            }
        }
        //console.log(scrollDown);
        
    })*/
    
})
