import {readFileSync} from 'fs';

let visited = [];
let startingPos;
let input = readFileSync('../input/day10.txt', 'utf-8').split("\n").map((val, index) => {
    val = val.trim()
    visited.push(Array(val.length).fill(0));
    let temp = val.indexOf('S');
    if (temp > -1) {
        startingPos = {
            'x': temp,
            'y': index
        };
    }
    return val.split('');
});

function replaceStartAndGetNextTile(pos) { // pos = (x,y)
    const toFindDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) !== index);
    let map = new Map();
    map.set('L', '7');
    map.set('7', 'L');
    map.set('J', 'F');
    map.set('F', 'J');
    let next;

    let neighbours = [];
    if (pos.y - 1 >= 0 && ['|', '7', 'F'].includes(input[pos.y - 1][pos.x])) {
        neighbours.push(...['|', '7', 'F']);
        next = {
            'x': pos.x,
            'y': pos.y - 1
        };
    }

    if (pos.y + 1 < input.length && ['|', 'J', 'L'].includes(input[pos.y + 1][pos.x])) {
        neighbours.push(...['|', 'J', 'L']);
        next = {
            'x': pos.x,
            'y': pos.y + 1
        };
    }

    if (pos.x + 1 < input[pos.y].length && ['7', 'J', '-'].includes(input[pos.y][pos.x + 1])) {
        console.log(2);
        neighbours.push(...['7', 'J', '-']);
        next = {
            'x': pos.x + 1,
            'y': pos.y
        };
    }

    if (pos.x - 1 >= 0 && ['L', 'F', '-'].includes(input[pos.y][pos.x - 1])) {
        neighbours.push(...['L', 'F', '-']);
        next = {
            'x': pos.x -1,
            'y': pos.y
        };
    }

    input[pos.y][pos.x] = map.get(toFindDuplicates(neighbours)[0]);
    return next;
}

function partOne() {
    let curr = replaceStartAndGetNextTile(startingPos);
    let lastPos = startingPos;
    let counter = 0;
    let looped = false;
    visited[startingPos.y][startingPos.x] = 1;

    let illegalFastMap = new Map();
    illegalFastMap.set('| -1', { 'x': 0, 'y': 1});
    illegalFastMap.set('| 1', { 'x': 0, 'y': -1});
    illegalFastMap.set('- -1', { 'x': 1, 'y': 0});
    illegalFastMap.set('- 1', { 'x': -1, 'y': 0});
    illegalFastMap.set('J -1', { 'x': -1, 'y': 0});
    illegalFastMap.set('J 0', { 'x': 0, 'y': -1});
    illegalFastMap.set('L -1', { 'x': 1, 'y': 0});
    illegalFastMap.set('L 0', { 'x': 0, 'y': -1});
    illegalFastMap.set('F 1', { 'x': 1, 'y': 0});
    illegalFastMap.set('F 0', { 'x': 0, 'y': 1});
    illegalFastMap.set('7 1', { 'x': -1, 'y': 0});
    illegalFastMap.set('7 0', { 'x': 0, 'y': 1});

    while (!looped) {

        if (visited[curr.y][curr.x] !== 0) {
            console.log("Mapped Path.");
            looped = true;
        } else {
            visited[curr.y][curr.x] = visited[lastPos.y][lastPos.x] + 1;
        }

        let next;

        if (input[curr.y][curr.x] === '-') {
            next = illegalFastMap.get(input[curr.y][curr.x] + ' ' + (lastPos.x - curr.x));
        } else {
            next = illegalFastMap.get(input[curr.y][curr.x] + ' ' + (lastPos.y - curr.y));
        }

        lastPos = curr;
        curr = {
            'x': next.x + lastPos.x,
            'y': next.y + lastPos.y
        }
        counter++;
    }
    console.log('Part One: ' + (counter / 2));
}

function partTwo() {
    let tilesInsideLoop = 0;
    visited.forEach((row, y) => {
        let insideLoop = false;
        let pipeFormation = '';
        row.forEach((posVisited, x) => {
            let onEdge = posVisited !== 0;
            if (onEdge) {
                if (!(input[y][x] === '-')) {
                    pipeFormation += input[y][x];
                    switch (pipeFormation) {
                        case '|':
                            insideLoop = !insideLoop;
                            pipeFormation = '';
                            break;
                        case 'L7':
                            insideLoop = !insideLoop;
                            pipeFormation = '';
                            break;
                        case 'FJ':
                            insideLoop = !insideLoop;
                            pipeFormation = '';
                            break;
                        default:
                            if (pipeFormation.length === 2) {
                                pipeFormation = '';
                            }
                    }

                }
            } else {
                if (insideLoop) {
                    tilesInsideLoop++;
                }
            }
        })
    });
    console.log('PartTwo: ' + tilesInsideLoop);
}

let timer = Date.now();
partOne();
console.log('time: ' + (Date.now() - timer));

timer = Date.now();
partTwo();
console.log('time: ' + (Date.now() - timer));