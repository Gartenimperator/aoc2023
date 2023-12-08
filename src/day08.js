import {readFileSync} from 'fs';

let input = readFileSync('../input/day08.txt', 'utf-8');

let textByLine = input.split("\n");
let words = textByLine.map((val) => val.match(/\w+/g));
let instructions = words[0][0];
let bigMapper = new Map();
let startingNodes = [];

for (let i = 2; i < words.length; i++) {
    let word = words[i][0];

    let babyMapper = new Map();
    babyMapper.set('L', words[i][1]);
    babyMapper.set('R', words[i][2]);
    bigMapper.set(word, babyMapper);

    //part Two
    if (word.charAt(2) === 'A') {
        startingNodes.push(word);
    }
}

console.log(startingNodes);

function partOne() {
    let found = false;
    let cur = 'AAA';
    let counter = 0;
    while (!found) {
        let ins = instructions.charAt(counter % instructions.length);
        cur = bigMapper.get(cur).get(ins);
        counter++;

        if (cur === 'ZZZ') {
            found = true;
        }
    }

    console.log(counter);
}

function partTwo() {
    const gcd = (a, b) => a ? gcd(b % a, a) : b;

    const lcm = (a, b) => a * b / gcd(a, b);

    let loopList = new Map();
    let data = [];
    startingNodes.forEach((val, i) => {
        let cur = val;
        let counter = 0;
        let finishIndex = [];
        while (!loopList.has(cur + counter % instructions.length)) {
            loopList.set(cur + counter % instructions.length, counter);
            let insIndex = counter % instructions.length;
            let ins = instructions.charAt(insIndex);

            cur = bigMapper.get(cur).get(ins);

            if (cur.charAt(2) === 'Z') {
                finishIndex.push(counter);
            }
            counter++;
        }

        data.push(counter - loopList.get(cur + counter % instructions.length))
        loopList = new Map();
    });
    console.log(data);

    console.log(data.reduce(lcm));
}

partOne();
console.log('TWO: __________')
partTwo();