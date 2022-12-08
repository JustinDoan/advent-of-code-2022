const fs = require('fs')



fs.readFile('./input.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log('error')
    }

    splitData = data.split(/\r?\n/)
    // console.log(data.split(/\r?\n/))


    let elves = {}
    let counter = 0
    splitData.forEach((weight) => {
        if(weight) {
            if (elves[counter]) {
                elves[counter] = elves[counter] + Number(weight);
            } else {
                elves[counter] = Number(weight)
            }
        } else {
            counter++
        }
    })
    let total = 0;
    let largest = 0;
    let largestKey = null;
    for (let index = 0; index < 3; index++) {
        Object.keys(elves).forEach((key) => {
            if (elves[key] > largest) {
                largest = elves[key]
                largestKey = key;
            }
        })
        // console.log(largest)
        total = total + largest
        largest = 0;
        console.log(largestKey)
        elves[largestKey] = 0;
    }
    console.log(total)

})