const fs = require("fs");

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("error");
  }
  // Split data into line by line array
  splitData = data.split(/\r?\n/);

  let stackOne = ["Q", "S", "W", "C", "Z", "V", "F", "T"];
  let stackTwo = ["Q", "R", "B"];
  let stackThree = ["B", "Z", "T", "Q", "P", "M", "S"];
  let stackFour = ["D", "V", "F", "R", "Q", "H"];
  let stackFive = ["J", "G", "L", "D", "B", "S", "T", "P"];
  let stackSix = ["W", "R", "T", "Z"];
  let stackSeven = ["H", "Q", "M", "N", "S", "F", "R", "J"];
  let stackEight = ["R", "N", "F", "H", "W"];
  let stackNine = ["J", "Z", "T", "Q", "P", "R", "B"];

  let stack = [
    stackOne,
    stackTwo,
    stackThree,
    stackFour,
    stackFive,
    stackSix,
    stackSeven,
    stackEight,
    stackNine,
  ];

  // splitData contains a list of actions

  // move 3 from 6 to 2
  // first number is the amount to move
  // second number is the stack we are moving from
  // third number is the stack we are moving to
  splitData.forEach((action) => {
    let tokens = action.split(" ");
    let moveAmount = Number(tokens[1]);
    let stackToMoveFrom = Number(tokens[3]) - 1;
    let stackToMoveTo = Number(tokens[5]) - 1;
    // console.log(moveAmount, stackToMoveFrom, stackToMoveTo);

    // We then want to take action on our stack
    let boxesToMove = [];
    for (let i = 0; i < moveAmount; i++) {
      // We loop the amount of times we are moving a box

      // We want to pop an element from the stack we are moving from
      let box = stack[stackToMoveFrom].pop();
      // We want to push that box onto the stack we are moving to
      boxesToMove.unshift(box);
      //   stack[stackToMoveTo].push(box);
    }
    console.log(boxesToMove);
    stack[stackToMoveTo] = stack[stackToMoveTo].concat(boxesToMove);
  });

  // After all the actions have taken place, we want only the top most boxes from each stack
  stack.forEach((innerStack, index) => {
    console.log(index + 1, innerStack.pop());
  });
});
