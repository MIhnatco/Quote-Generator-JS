
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter")
const newQuoteBtn = document.querySelector("#new-quote")


let apiQuotes = [];


//show new Quote
function newQuote(){
    //a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //check if Author field is blank and replace it with "Unknown"
    if(!quote.author){
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    
    
    //check quote length to determine styling
    if(quote.text.length > 99){
        quoteText.classList.add("long-quote");
        authorText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote');
        authorText.classList.remove('long-quote')
    
    }

    quoteText.textContent = quote.text;
}

//get quotes from API
async function getQuotes(){
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
        try {
            const response = await fetch(apiUrl);
            apiQuotes = await response.json();
            newQuote()

        } catch(e){

        }
}


//tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote )


// on load
getQuotes();

    