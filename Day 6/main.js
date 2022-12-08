const fs = require("fs");

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("error");
  }

  // data is a massive string of characters

  // need to go step by step to determine the first 4 unique character sequence, and the character position at which it starts
  let buffer = "";
  for (let i = 0; i < data.length; i++) {
    if (buffer.length < 14) {
      buffer = buffer + data.charAt(i);
    } else {
      //buffer is 4 or longer
      let charMap = {};
      // console.log(buffer);
      let match = false;
      for (let j = 0; j < buffer.length; j++) {
        if (charMap[buffer.charAt(j)]) {
          // We have a match, print current character index
          charMap[buffer.charAt(j)] = charMap[buffer.charAt(j)] + 1;
          match = true;
        } else {
          charMap[buffer.charAt(j)] = 1;
        }
      }
      if (!match) {
        console.log(i);
        break;
      }
      // reset map
      charMap = {};
      // update buffer with new char for next go around
      buffer = buffer.slice(1, 14) + data.charAt(i);
    }

    // Buffer is a 4 character string in which we need to calculate if it is all unqiue
  }
});
