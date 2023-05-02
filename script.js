const quoteContainer = document.querySelector("#quote-container");
const quotetext = document.querySelector("#quote");
const authortext = document.querySelector("#author");
const twitterbutton = document.querySelector("#twitter");
const newquotebutton = document.querySelector(".new-quote");
const loader = document.querySelector("#loader")

let apiquotes =[];


//show the lodding
function loading(){
    loader.hidden=false;
    quoteContainer.hidden = true;    
}
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}

function newquote(){
    //pick the ramdom jock
    loading();

    const quote = apiquotes[Math.trunc(Math.random()*apiquotes.length)]
    console.log(quote);

    if(!quote.author){
        authortext.textContent ="Unkhown";
    }else{
        authortext.textContent = quote.author;
    }


    if(quote.text.length > 120){
        quotetext.classList.add('long-quote');
    }
    else{
        quotetext.classList.remove('long-quote');
    }

    //loader complete
    
    quotetext.textContent = quote.text;
    complete();
}

async function getquotes(){
    loading();
    const apiurl='https://type.fit/api/quotes';
    
    //first method to fetch api
    // fetch(apiurl)
    // .then(response => response.json())
    // .then(data => console.log(data))

    //second method to fetch api
    try{
        const response = await fetch(apiurl);
        apiquotes = await response.json();
          console.log(apiquotes)
        newquote();
    }catch(error){
    
    
    }
}

function tweetquote (){
    const tweetURl = `https://twitter.com/intent/tweet?text=${quotetext.textContent} - ${authortext.textContent}`;
    window.open(tweetURl,'_blanck')
}


getquotes();
newquotebutton.addEventListener("click",newquote);
twitterbutton.addEventListener("click",tweetquote)