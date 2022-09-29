function guessANumber() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let guess;
  let answer;

  let computerGuess = Math.floor(Math.random() * 100);

  let triesAmount = 10;
  let level = 1;
  let minScore = 0;
  let maxScore = 100;
  let levelGuess = `from (${minScore} to ${maxScore})`;

  let tryAgain = function () {
    readline.question(
      `Would you like to fail ... I mean try again? - (y)es or (n)o:`,
      (ans) => {
        answer = String(ans);
        if (answer === "yes" || answer === "y") {
          triesAmount = 10;
          level = 1;
          minScore = 0;
          maxScore = 100;
          levelGuess = `from (${minScore} to ${maxScore})`;
          recursiveAsyncReadLine();
        } else if (answer === "no" || answer === "n") {
          console.log("Game over!");
          return readline.close();
        } else {
          console.log(`Budy it's a yes or no question, sooooo`);
          tryAgain();
        }
      }
    );
  };

  let recursiveAsyncReadLine = function () {
    readline.question(
      `Guess the number level ${level} ${levelGuess}, you have ${triesAmount} left:`,
      (number) => {
        guess = Number(number);

        if (guess >= minScore && guess <= maxScore) {
          if (guess === computerGuess && level === 4) {
            console.log(
              "Whaaaaat ?!?!?!?!?! NOOOOOOOOO ...... IMPOSSIBLEEEEEEEEE ......"
            );
            return readline.close();
          } else if (guess === computerGuess && level === 3) {
            level++;
            triesAmount = 1;
            minScore = Number.MIN_SAFE_INTEGER;
            maxScore = Number.MAX_SAFE_INTEGER;
            levelGuess = `from (${minScore} to ${maxScore})`;
            computerGuess = Math.floor(Math.random() * maxScore);
            console.log(
              "We have a natural tallent here, go on, do the next level with just ... one ... try - MuHAhahAhaAhaAHAHAhahAhAHa"
            );
            recursiveAsyncReadLine();
          } else if (guess === computerGuess) {
            level++;
            maxScore += 50;
            levelGuess = `from (${minScore} to ${maxScore})`;
            computerGuess = Math.floor(Math.random() * maxScore);
            triesAmount = 10;
            console.log(
              "Oh, a Wise Guy eh? All right, let's see how you do when we ramp things up!"
            );
            recursiveAsyncReadLine();
          } else if (guess < computerGuess) {
            triesAmount--;
            if (triesAmount > 0) {
              console.log("Ha, ha, your guess is too Low!");
              recursiveAsyncReadLine();
            } else if (triesAmount === 0) {
              tryAgain();
            }
          } else if (guess > computerGuess) {
            triesAmount--;
            if (triesAmount > 0) {
              console.log("Ha, ha, your guess is too Hight!");
              recursiveAsyncReadLine();
            } else if (triesAmount === 0) {
              tryAgain();
            }
          }
        } else {
          console.log(
            `Oi, the game is called Guess a number between ${minScore} and ${maxScore}, not "Type what you want!".`
          );
          recursiveAsyncReadLine();
        }
      }
    );
  };
  recursiveAsyncReadLine();
}
guessANumber();
