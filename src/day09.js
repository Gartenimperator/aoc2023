import {readFileSync} from 'fs';

let input = readFileSync('../input/day09.txt', 'utf-8');

let textByLine = input.split("\n");

function recursive(m) {
    if (m.length === 0) {
        return 0;
    }

    let isNotZero = false;
    let newLayer = m.map((a,b) => {
        if (b + 1 < m.length) {
            let temp = parseInt(m[b + 1]) - parseInt(a);

            if (temp !== 0) {
                isNotZero = true;
            }
            return temp;
        }
    })

    newLayer.pop();

    if (!isNotZero) {
        return parseInt(m[m.length - 1]);
    }

    return parseInt(m[m.length - 1]) + recursive(newLayer);

}

function partOne() {
    let sum = 0
    for (let i = 0; i < textByLine.length; i++) {
        sum += recursive(textByLine[i].match(/-?\d+/g));
    }
    console.log('Part One: ' + sum);
}

function partTwo() {
    let sum = 0
    for (let i = 0; i < textByLine.length; i++) {
        sum += recursive(textByLine[i].match(/-?\d+/g).reverse());
    }
    console.log('Part Two: ' + sum);
}

partOne();
partTwo();