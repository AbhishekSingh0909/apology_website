const words = [ 
    "shinchan", 
    "badminton", 
    "garba", 
    "dolls", 
    "saturday", 
    "bandra wonderland", 
    "love4awalk", 
    "ramen", 
    "beanie", 
    "waterkingdom", 
    "monsoon",
    "unicorn",
    "bochi",
]; 

// Respective list of hints 
const hints = [ 
    "Our favorite cartoon", 
    "sports we play", 
    "We went to a ground on some festival", 
    "Your obsession", 
    "day on the date we started dating",
    "went here on Christmas", 
    "manhwa", 
    "Recent yum yum we had together", 
    "first yt logo you had was wearing a ?", 
    "One of the most thrilling experiences we had this year", 
    "Season you composed that iconic song about",
    "On your last birthday we won a ... ",
    "Name of your island",
]; 

// Initialize display word and answered indices
let displayWord = ""; 
let answeredIndices = [];

// Function to shuffle letters 
function shuffle(str) { 
    const strArray = Array.from(str); 
    for (let i = 0; i < strArray.length - 1; ++i) { 
        let j = Math.floor(Math.random() * strArray.length); 
        // Swap letters 
        let temp = strArray[i]; 
        strArray[i] = strArray[j]; 
        strArray[j] = temp; 
    } 
    return strArray.join(""); 
} 

// Function to check input and display result 
function check() { 
    let input = document.getElementById("input"); 
    let output = document.getElementById("output"); 
    if (input.value.toLocaleLowerCase() === displayWord.toLocaleLowerCase()) {
        output.innerHTML = "Result: Correct"; 
        answeredIndices.push(words.indexOf(displayWord)); // Add index to answered list

        // Check if all words have been answered
        if (answeredIndices.length === words.length) {
            alert("Congratulations! You've completed the level successfully.");
            window.location.href = "whack.html"; // Navigate to the next level
        } else {
            refresh(); // Call refresh to get new word
        }
    } else {
        output.innerHTML = "Result: Incorrect"; 
    } 
} 

// To refresh and show new word 
function refresh() {
    let index;
    do {
        index = Math.floor(Math.random() * words.length); // Get a new index
    } while (answeredIndices.includes(index)); // Ensure it's not previously answered

    displayWord = words[index]; 
    let displayHint = hints[index]; 
    let scrambleWord = document.getElementById("scrambleWord"); 
    scrambleWord.innerText = shuffle(displayWord).toUpperCase(); 
    let hint = document.getElementById("hint"); 
    hint.innerHTML = "<b>Hint:</b> " + displayHint; 
    document.getElementById("output").innerText = "Result:"; 
}

// Function call when page load for first time 
refresh();
