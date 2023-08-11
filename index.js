/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/
// Step 1: Create a for loop within the addGamesToPage function
// ...

// Step 1: Create a for loop within the addGamesToPage function
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
      
        // Step 2: Create a new div element with the class "game-card"
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        // Step 3: Use template literal to set the inner HTML of the div
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img">
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <p>Price: $${game.pledged}</p>
        `;

        // Step 4: Append the div to the correct element in the DOM
        const gamesContainer = document.getElementById('games-container');
        gamesContainer.appendChild(gameCard);
    }
}

// Step 5: Call the addGamesToPage function with the correct variable
addGamesToPage(GAMES_JSON); // Assuming GAMES_JSON is the array of game objects


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// Calculate the total amount of money pledged across all games
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// Set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/
// Step 1: Complete the filterUnfundedOnly function
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

    // Secret key component 1: How many games are in the array returned by filterUnfundedOnly?
    console.log("Number of unfunded games:", unfundedGames.length);
}

// Step 2: Complete the filterFundedOnly function
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Use the function we previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);

    // Secret key component 2: How many games are in the array returned by filterFundedOnly?
    console.log("Number of funded games:", fundedGames.length);
}

// Step 3: Finish the showAllGames function
function showAllGames() {
    deleteChildElements(gamesContainer);

    // Use the function we previously created to add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

document.addEventListener("DOMContentLoaded", function() {
    // Your code here, including event listener setup
    const unfundedBtn = document.getElementById("unfunded-btn");
    const fundedBtn = document.getElementById("funded-btn");
    const allBtn = document.getElementById("all-btn");

    unfundedBtn.addEventListener("click", filterUnfundedOnly);
    fundedBtn.addEventListener("click", filterFundedOnly);
    allBtn.addEventListener("click", showAllGames);

    // ... (rest of the code)
});




/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games


// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item