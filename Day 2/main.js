const fs = require("fs");
// Read file for input
fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("error");
  }

  let splitData = data.split(/\r?\n/);

  // A Rock
  // B Paper
  // C Scissors

  // X Rock
  // Y Paper
  // Z Scissors

  let determineChoice = (opp, condition) => {
    let choice = "";
    if (condition === "X") {
      // I need to lose
      if (opp === "A") {
        return "Z";
      } else if (opp === "B") {
        return "X";
      } else {
        return "Y";
      }
    } else if (condition === "Y") {
      //draw
      if (opp === "A") {
        return "X";
      } else if (opp === "B") {
        return "Y";
      } else {
        return "Z";
      }
    } else {
      // win
      if (opp === "A") {
        return "Y";
      } else if (opp === "B") {
        return "Z";
      } else {
        return "X";
      }
    }
  };

  let determineScore = (opp, me) => {
    // console.log(opp, me)
    // determine my choice score
    me = determineChoice(opp, me);

    let score = 0;

    switch (me) {
      case "X":
        score = score + 1;
        break;
      case "Y":
        score = score + 2;
        break;
      case "Z":
        score = score + 3;
        break;
      default:
        console.log("err");
        break;
    }
    // console.log(score)

    // Determine if I won or not

    if (opp === "A") {
      if (me === "Y") {
        // I win
        score = score + 6;
        return score;
      } else if (me === "X") {
        score = score + 3;
        return score;
      } else {
        // i lost
        return score;
      }
    }

    if (opp === "B") {
      if (me === "Z") {
        // I win
        score = score + 6;
        return score;
      } else if (me === "Y") {
        score = score + 3;
        return score;
      } else {
        // i lost
        return score;
      }
    }

    if (opp === "C") {
      if (me === "X") {
        // I win
        score = score + 6;
        return score;
      } else if (me === "Z") {
        score = score + 3;
        return score;
      } else {
        // i lost
        return score;
      }
    }

    // console.log(opp, me);
    return score;
  };

  let total = 0;
  splitData.forEach((round) => {
    // "C S"

    let playerPicks = round.split(" ");
    // console.log(playerPicks)
    let op = playerPicks[0];
    let me = playerPicks[1];
    console.log(op, me);
    let score = determineScore(op, me);
    console.log(score);
    total = total + score;
  });

  console.log(total);
});
