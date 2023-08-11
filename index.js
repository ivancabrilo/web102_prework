
const gamesContainer = document.getElementById('games-container');
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


function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
      
        // Create a new div element with the class "game-card"
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        // Use template literal to set the inner HTML of the div
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img">
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
        `;

        // Append the div to the correct element in the DOM
        //const gamesContainer = document.getElementById('games-container');
        gamesContainer.appendChild(gameCard);
    }
}
addGamesToPage(GAMES_JSON); 




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

function filterUnfundedOnly() {
    console.log("filterUnfundedOnly function is being called.");
    deleteChildElements(gamesContainer);

    const unfundedGames = GAMES_JSON.filter(game => parseInt(game.pledged) < parseInt(game.goal));

    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    console.log("filterFundedOnly function is being called.");
    deleteChildElements(gamesContainer);

    const fundedGames = GAMES_JSON.filter(game => parseInt(game.pledged) >= parseInt(game.goal));

    addGamesToPage(fundedGames);
}





// show all games
function showAllGames() {
    console.log("showAllGames function is being called.");
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON);
}




// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/
// grab the description container
const descriptionContainer = document.getElementById("description-container");

// Step 1: Use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => parseInt(game.pledged) < parseInt(game.goal)).length;

// Step 2: Create a template string to display the company information
const displayStr = `
    A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games.
    Currently, ${unfundedGamesCount} game${unfundedGamesCount !== 1 ? 's' : ''} remains unfunded.
    We need your help to fund these amazing games!
`;

// Step 3: Create a new paragraph element and add the template string to it
const companyInfoParagraph = document.createElement('p');
companyInfoParagraph.textContent = displayStr;

// Step 4: Append the paragraph element to the description container
descriptionContainer.appendChild(companyInfoParagraph);



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
const [topGame, runnerUpGame] = sortedGames;

// update the text content of the top game container
firstGameContainer.querySelector('h3').textContent = `🥇 Top Funded Game: ${topGame.name}`;

// update the text content of the runner-up game container
secondGameContainer.querySelector('h3').textContent = `🥈 Runner Up: ${runnerUpGame.name}`;
