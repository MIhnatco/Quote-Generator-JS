
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");

const loader = document.querySelector('#loader');

const previewContainer = document.querySelector('#preview-container');
const previewText = document.querySelector('#preview')




/* switcher */
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.querySelector('#toggle-icon');


/* Dark mode function */
function darkMode(){
    toggleIcon.children[0].textContent = "Dark mode";
    toggleIcon.children[1].classList.remove('fa-sun');
    toggleIcon.children[1].classList.add('fa-moon');
}

/* Light mode function */
function lightMode(){
    toggleIcon.children[0].textContent = "Light mode";
    toggleIcon.children[1].classList.add('fa-sun');
    toggleIcon.children[1].classList.remove('fa-moon');
}




/* Switch theme */
function switchTheme(event){
    if(event.target.checked){
        document.documentElement.setAttribute('data-theme', 'dark')
        darkMode()
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
        lightMode()
    }
}



/* Event listener */
toggleSwitch.addEventListener('change', switchTheme)







let apiQuotes = [];

//counter to get quote and preview next quote
let counter = 0;

//show loader 
function loading(){
    loader.hidden = false,
    quoteContainer.hidden = true;
}

//Hide loader
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;

}


//update the preview window with the next quote
function updatePreview(counter){
    const nextQuote = apiQuotes[counter];

    //author check
    if (!nextQuote.author) {
        previewText.textContent = `"${nextQuote.text}" - Unknown`;
    } else {
        previewText.textContent = `"${nextQuote.text}" - ${nextQuote.author}`;
    }

    if(nextQuote.text.length > 99){
        previewText.classList.add('long-quote')
    } else {
        previewText.classList.remove('long-quote')
    }

}


//show new Quote
function newQuote(){
    loading();

    //a random quote from apiQuotes array
    const quote = apiQuotes[counter];
    counter += 1;
    
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

        //preview quote
    updatePreview(counter);

        //quote text, hide loader
    quoteText.textContent = quote.text;
    complete();
}

//get quotes from API
async function getQuotes(){
    loading();
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

    