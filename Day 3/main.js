const fs = require("fs");

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("error");
  }
  // Split data into line by line array
  splitData = data.split(/\r?\n/);

  // each rucksack has 2 parts,

  // Need to build groups
  let groups = [];

  for (let i = 0; i < splitData.length; i = i + 3) {
    // Build group
    let group = [splitData[i], splitData[i + 1], splitData[i + 2]];
    groups.push(group);
  }

  let totalScore = 0;

  // groups = [[1,2,3],[4,5,6]]

  groups.forEach((group) => {
    // Loop over first compartment and build hashmap of items
    let first = group[0];
    let second = group[1];
    let third = group[2];
    console.log(first, second, third);
    let map = {};
    let secondaryMap = {};
    let item = null;
    for (let i = 0; i < first.length; i++) {
      map[first.charAt(i)] = 1;
    }

    for (let i = 0; i < second.length; i++) {
      if (map[second.charAt(i)]) {
        // Found our matching item
        secondaryMap[second.charAt(i)] = 1;
      }
    }

    for (let i = 0; i < third.length; i++) {
      if (secondaryMap[third.charAt(i)]) {
        // Found our matching third item
        console.log(third.charAt(i));
        item = third.charCodeAt(i);
        break;
      }
    }

    // A = 65
    // Z = 90
    // a = 97 = 1
    // z = 122 = 26
    let score = 0;
    if (item > 96) {
      // Determine lowercase score
      score = item - 96;
    } else {
      score = item - 38;
    }
    console.log(score);
    totalScore = totalScore + score;
    // Determine score
  });
  console.log(totalScore);
});
