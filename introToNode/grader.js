"use strict"

const average = (scores) => {
    return Math.round(scores.reduce((acc,x) => acc+x, 0)/scores.length)
}

let scores = [90,98,89,100,100,86,94];
console.log(average(scores))