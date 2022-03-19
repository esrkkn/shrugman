//MOVIE TITLE
let book = [
  "I CAN MAKE YOU HOT",
  "BOSSYPANTS",
  "THE BEDWETTER",
  "ARE YOU THERE VODKA",
  "EVERYTHING WAS FINE UNTIL WHATEVER",
  "DONT PEE ON MY LEG",
  "BEAUTY FADES",
  "BOOGERS ARE MY BEAT",
  "I AM AMERICA",
  "FIRST STEP TWO FOREVER",
  "SEX DRUGS AND COCOA PUFFS",
  "GO THE FUCK TO SLEEP",
  "ITALIAN WITHOUT WORDS",
  "THE ZEN OF FARTING",
  "THE SALMON OF DOUBT",
  "TEACH YOUR WIFE TO BE A WIDOW",
  "LOVE SEX AND TRACTORS",
  "IS EVERYONE HANGING OUT WITH ME",
  "LIVE FAST DIE HOT",
  "THE BIG BOOK OF LESBIAN HORSE STORIES",
];

//FIND A RANDOM TITLE
let chosenTitle = book[Math.floor(Math.random() * book.length)];
let guessedLetters = [];
let updatedStatus = null;
let playedGamesWon = [];
let playedGamesLost = [];
let shrugman = "¯\\_(:/)_/¯";
let errorsLeft = shrugman.length;

//UPDATED STATUS SHOWS THE LETTERS YOU FOUND(AND BLANKS) AND UNDERSCORES
updatedStatus = chosenTitle
  .split("")
  .map((letter) =>
    guessedLetters.indexOf(letter) !== -1 || letter == " " ? letter : "_"
  )
  .join("");
document.getElementById("wordSpotlight").innerHTML = updatedStatus;
document.getElementById("mistakes").innerHTML = errorsLeft;
document.getElementById("games").innerHTML = playedGamesWon;
document.getElementById("status").innerHTML = playedGamesLost;
document.getElementById("letters").innerHTML = guessedLetters;

// RESET BUTTON--PLAY AGAIN--
document.querySelector(".btn-primary").addEventListener("click", function () {
  errorsLeft = 10;
  guessedLetters = [];
  chosenTitle = book[Math.floor(Math.random() * book.length)];
  document.getElementById("shrugman").innerText = "";
  let input = document.getElementById("guessLetter");
  input.removeAttribute("disabled");
  let inputButton = document.getElementById("guessButton");
  inputButton.removeAttribute("disabled");
  updatedStatus = chosenTitle
    .split("")
    .map((letter) =>
      guessedLetters.indexOf(letter) !== -1 || letter == " " ? letter : "_"
    )
    .join("");
  document.getElementById("wordSpotlight").innerHTML = updatedStatus;
  document.getElementById("mistakes").innerHTML = errorsLeft;
  document.getElementById("letters").innerHTML = guessedLetters;
  document.getElementById("keyboard").innerHTML = "";
});

//CHECK IF ENTER ONLY ALPHABETS
function isAlfa(evt) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (
    charCode > 31 &&
    (charCode < 65 || charCode > 90) &&
    (charCode < 97 || charCode > 122)
  ) {
    alert("Invalid Characters");
    return false;
  }
  return true;
}

//------GUESSING PART----
const getLetter = (letter) => {
  letter = letter.toUpperCase();

  //if you havent guessed before --->
  if (guessedLetters.indexOf(letter) === -1) {
    guessedLetters.push(letter);
    //And if the letter in the chosen title -->
    if (chosenTitle.indexOf(letter) !== -1) {
      updatedStatus = chosenTitle
        .split("")
        .map((letter) =>
          guessedLetters.indexOf(letter) !== -1 || letter == " " ? letter : "_"
        )
        .join("");
      document.getElementById("wordSpotlight").innerHTML = updatedStatus;
      document.getElementById("letters").innerHTML = guessedLetters;

      //EVERYTIME UPDATE THE GAME
      updateGameStatus();

      // IF ITS NOT IN THE TITLE, BUILT THE SHRUGMAN AND UPDATE THE ERRORS--->
    } else if (chosenTitle.indexOf(letter) === -1) {
      const characters = shrugman[shrugman.length - errorsLeft];
      const shrugElement = document.getElementById("shrugman");
      shrugElement.innerText = shrugElement.innerText
        ? shrugElement.innerText + characters
        : "" + characters;

      errorsLeft--;
      document.getElementById("mistakes").innerHTML = errorsLeft;
      document.getElementById("letters").innerHTML = guessedLetters;

      //EVERYTIME UPDATE THE GAME
      updateGameStatus();
    }
    //IF YOU GUESSED THE LETTER BEFORE
  } else {
    alert("You tried this letter, pick another one");
  }
};

//GAME STATUS
const updateGameStatus = () => {
  //IF YOU WIN
  if (updatedStatus === chosenTitle) {
    document.getElementById("keyboard").innerHTML = "YOU WON BOOKWORM!";
    playedGamesWon.push(chosenTitle);
    document.getElementById("games").innerText = playedGamesWon;

    //NO MORE GUESSING AFTER WINNING
    let input = document.getElementById("guessLetter");
    input.setAttribute("disabled", true);
    let inputButton = document.getElementById("guessButton");
    inputButton.setAttribute("disabled", true);

    //IF YOU LOSE
  } else if (errorsLeft === 0) {
    document.getElementById("wordSpotlight").innerHTML =
      "The answer was: " + chosenTitle;
    document.getElementById("keyboard").innerHTML = "GAME OVER! READ MORE YOU LIL LAZY!";
    playedGamesLost.push(chosenTitle);
    document.getElementById("status").innerText = playedGamesLost;

    //NO MORE GUESSING AFTER LOSING
    let input = document.getElementById("guessLetter");
    input.setAttribute("disabled", true);
    let inputButton = document.getElementById("guessButton");
    inputButton.setAttribute("disabled", true);
  }
};
//EVERYTIME REFRESH THE INPUT BOX-DELETE THE PREVIOUS LETTER
const guessLetter = document.getElementById("guessLetter");
const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getLetter(guessLetter.value);
  guessLetter.value = "";
});
