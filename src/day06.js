import {readFileSync} from 'fs';

let input = readFileSync('../input/day06.txt', 'utf-8');

let textByLine = input.split("\n");

function partOne() {
    let prod = 1;
    let time = textByLine[0].match(/\d+/g);
    let dist = textByLine[1].match(/\d+/g);
    for (let i = 0; i < time.length; i++) {
        let count = 0;
        let distc = dist[i];
        let timec = time[i];

        for (let chargeUp = 0; chargeUp <= timec; chargeUp++) {
            if (chargeUp * (timec - chargeUp) > distc) {
                count++;
            }
        }
        prod *= count;
    }
    console.log('partOne:');
    console.log(prod);
}

function partTwo() {
    let prod = 1;
    let time = textByLine[0].match(/\d+/g);
    let dist = textByLine[1].match(/\d+/g);
    let distC = parseInt(dist.reduce((p, c) => p + c));
    let timeC = parseInt(time.reduce((p, c) => p + c));

    let sol = 0;
    let lowerBound = 0;
    for (let chargeUp = 0; chargeUp <= timeC; chargeUp++) {
        if (chargeUp * (timeC - chargeUp) > distC) {
            lowerBound = chargeUp;
            break;
        }
    }

    let upperBound = 0;
    for (let chargeUp = timeC; chargeUp >= 0; chargeUp--) {
        if (chargeUp * (timeC - chargeUp) > distC) {
            upperBound = chargeUp;
            break;
        }
    }

    if (lowerBound === upperBound) {
        sol = 1;
    } else {
        sol = upperBound - lowerBound + 1;
    }

    console.log('partTwo:');
    console.log(sol);
}

partOne()
partTwo()