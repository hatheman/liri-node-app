require("dotenv").config(); 

const keys=require('./keys.js') 
let inquirer = require('inquirer') 
let Spotify = require('node-spotify-api')
let Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter) 

var tweetRequest = function(){
client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response){
    if(!error) {
        Tweets = JSON.stringify(tweets) 
        for(var i=0; i<10; i++) {

        
        console.log(JSON.parse(Tweets).statuses[i].text);
    }}
})
}

var musicRequest = function() {
    inquirer.prompt({
        type: 'input', 
        name: 'Songs',
        message: "What song would you like to search?",
    }).then(answers=> {

    
    spotify.search({ type: 'track', query: answers, limit: 1 }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    Data = JSON.stringify(data)
    console.log(JSON.parse(Data).tracks.items)
});
})
}







var movieRequest = function(){
    inquirer.prompt({
        type: 'input',
        name: 'Movie',
        message: 'What movie would you like to search?',
    
    }).then(answers=>{

    
    var request = require("request");
   
        let movieName = answers.Movie
         
          
          
           var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
          
           
          
          
          request(queryUrl, function(error, response, body) {
          
          
            if (!error && response.statusCode === 200) {
          
                let Body = JSON.parse(body)
          
               console.log("Title is:", Body.Title)
               console.log("Year Released:", Body.Year)
               console.log("IMDB Rating:", Body.imdbRating)
               console.log("Country of Production:", Body.Country)
               console.log("Language:", Body.Language)
               console.log("Plot:", Body.Plot)
               console.log("Actors:", Body.Actors)
             }
           });
       
    })
}

inquirer.prompt([
    {
        type: 'list',
        name: 'choice',
        message: "What is your request?",
        choices: ['My Tweets', "Song Search", "Movie Search"]
        },
      

        

        
])
    .then(answers=> {
        var userChoice = answers.choice
       if(userChoice === "Movie Search") {
        movieRequest()
       } 
       if(userChoice === "Song Search"){
           musicRequest()
       } 
       if(userChoice === "My Tweets") {
           tweetRequest()
       }
        
        
        
    })


