const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const telegramBtn = document.getElementById("telegram");
const newQuoteBtn = document.getElementById("new-quote");
const bouncer =  document.getElementById("bouncer");

let quotesApi = [];

// loading function
function loading(){
    bouncer.hidden = false;
    quoteContainer.hidden = true;
}

// complete function
function complete(){
    if(!bouncer.hidden){
        quoteContainer.hidden = false;
        bouncer.hidden = true;
        bouncer.style.display = 'none';
    }
    
}

function newQuotes(){
    loading();
    const quote = quotesApi[Math.floor(Math.random()*quotesApi.length)];
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }
    else{
        authorText.textContent = quote.author;
    }

    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}
// Get Quotes From API
async function getQuotes(){
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        quotesApi = await response.json();
        newQuotes();
    } catch (error) {

    }
}

function telegramQuote() {
    const telegramUrl = `https://t.me/share/url?url=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(telegramUrl, '_blank');
}

newQuoteBtn.addEventListener('click',newQuotes);
telegramBtn.addEventListener('click', telegramQuote);

getQuotes();
