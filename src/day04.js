import { readFileSync } from 'fs';

function partOne() {
    let input = readFileSync('../input/day04.txt', 'utf-8');

    let textByLine = input.split("\n");

    let sum = 0;
    for (let y = 0; y < textByLine.length; y++) {
        let numbers = textByLine[y].split(':')[1].split('|');
        let winningNumArray = numbers[0].match(/\d+/g);
        let ElfNumArray = numbers[1].match(/\d+/g);
        let points = 0.5;

        ElfNumArray.forEach((val) => {
            if (winningNumArray.includes(val)) {
                points = points * 2;
            }
        })
        sum += Math.floor(points);
    }
    console.log(sum);
}

function partTwo() {
    let input = readFileSync('../input/day04.txt', 'utf-8');

    let textByLine = input.split("\n");

    let pointsArray = Array(textByLine.length).fill(1);
    let sum = 0;
    for (let y = 0; y < textByLine.length; y++) {
        pointsArray[y] = pointsArray[y];
        sum += pointsArray[y];
        let numbers = textByLine[y].split(':')[1].split('|');
        let winningNumArray = numbers[0].match(/\d+/g);
        let ElfNumArray = numbers[1].match(/\d+/g);
        let winningCards = 0;

        ElfNumArray.forEach((val) => {
            if (winningNumArray.includes(val)) {
                winningCards++;
            }
        })

        while (winningCards > 0 && (y + winningCards < pointsArray.length)) {
            pointsArray[y + winningCards] += pointsArray[y];
            winningCards--;
        }
    }
    console.log(sum);
}
partOne()
partTwo()