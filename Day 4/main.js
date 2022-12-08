const fs = require("fs");

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("error");
  }
  // Split data into line by line array
  splitData = data.split(/\r?\n/);

  let elfAssignments = {};
  let inclusivePairCount = 0;
  let elfId = 0;
  splitData.forEach((pair, pairIndex) => {
    // we have 22-77,14-96
    let pairSections = pair.split(",");
    //elfsections = ["22-77", "14-96"]

    // Need to parse string into two numbers, min/max
    pairSections.forEach((assignment, assignmentIndex) => {
      // assignment = 22-77
      let rowMinMax = assignment.split("-");
      elfAssignments[elfId] = {
        min: Number(rowMinMax[0]),
        max: Number(rowMinMax[1]),
      };
      elfId++;
    });
  });

  // Once we have all of the elf assignments, we can start checking for instances in which a pair has an overlap
  for (let i = 0; i < Object.keys(elfAssignments).length; i = i + 2) {
    // We can compare both elves and see if either are inclusive of the other

    let elfOne = elfAssignments[i];
    let elfTwo = elfAssignments[i + 1];

    // if (elfOne.min >= elfTwo.min || elfOne.max <= elfTwo.max) {
    //   // elf one is inside elf two
    //   inclusivePairCount = inclusivePairCount + 1;
    //   console.log("elf one is inside elf two");
    //   console.log(elfOne.min, elfOne.max);
    //   console.log(elfTwo.min, elfTwo.max);
    // } else if (elfTwo.min >= elfOne.min || elfTwo.max <= elfOne.max) {
    //   // elf two is inside elf one
    //   inclusivePairCount = inclusivePairCount + 1;
    //   console.log("elf two is inside elf one");
    //   console.log(elfOne.min, elfOne.max);
    //   console.log(elfTwo.min, elfTwo.max);
    // }

    if (elfOne.min > elfTwo.max || elfOne.max < elfTwo.min) {
      console.log(elfOne.min, elfOne.max);
      console.log(elfTwo.min, elfTwo.max);
    } else {
      inclusivePairCount = inclusivePairCount + 1;
    }
    // Any other scenario doesn't work
  }

  console.log(inclusivePairCount);
});
