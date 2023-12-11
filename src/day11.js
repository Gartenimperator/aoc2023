import {readFileSync} from 'fs';

let starRow = [];
let starCol = [];
let input = readFileSync('../input/day11.txt', 'utf-8').split("\r\n")
let stars = [];
const grid = input.map((line) => line.split(""));

for (let i = 0; i < grid.length; i++) {
    if (grid[i].includes('#')) {
        starRow.push(i);
        let moreHashTags = true;
        let ind = 0;
        while (moreHashTags) {
            ind = grid[i].indexOf('#', ind);
            if (ind === -1) {
                moreHashTags = false;
            } else {
                starCol.push(ind);
                ind++;
            }
        }
    }
}

let emptyRowCounter = 0;
for (let i = 0; i < grid.length; i++) {
    if (starRow.includes(i)) {
        let emptyColCounter = 0;
        for (let j = 0; j < grid[i].length; j++) {
            if (!starCol.includes(j)) {
                emptyColCounter += 999999;
            } else {
                if (grid[i][j] === '#') {
                    stars.push([i + emptyRowCounter, j + emptyColCounter]);
                }
            }
        }
    } else {
        emptyRowCounter += 999999;
    }
}

function partOne() {
    let sum = 0;
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            let stepsY = Math.abs(stars[i][0] - stars[j][0]);
            let stepsX = Math.abs(stars[i][1] - stars[j][1]);
            sum += stepsX;
            sum += stepsY;
        }
    }
    console.log(sum);
}

partOne();


