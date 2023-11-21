let apiQuotes = [];


//show new Quote
function newQuote(){
    //a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote)
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

getQuotes();

    