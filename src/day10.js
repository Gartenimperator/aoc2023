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

function replaceStartTile(pos) { // pos = (x,y)
    const toFindDuplicates = (arry) => arry.filter((item, index) => arry.indexOf(item) !== index);
    let map = new Map();
    map.set('L', '7');
    map.set('7', 'L');
    map.set('J', 'F');
    map.set('F', 'J');

    let neighbours = [];
    if (pos.y - 1 >= 0 && ['|', '7', 'F'].includes(input[pos.y - 1][pos.x])) {
        neighbours.push(...['|', '7', 'F']);
    }

    if (pos.y + 1 < input.length && ['|', 'J', 'L'].includes(input[pos.y + 1][pos.x])) {
        neighbours.push(...['|', 'J', 'L']);
    }

    if (pos.x + 1 < input[pos.y].length && ['7', 'J', '-'].includes(input[pos.y][pos.x + 1])) {
        console.log(2);
        neighbours.push(...['7', 'J', '-']);
    }

    if (pos.x - 1 >= 0 && ['L', 'F', '-'].includes(input[pos.y][pos.x - 1])) {
        neighbours.push(...['L', 'F', '-']);
    }

    input[pos.y][pos.x] = map.get(toFindDuplicates(neighbours)[0]);
}

function findFirstN(pos) {
    if (pos.y - 1 >= 0 && ['|', '7', 'F'].includes(input[pos.y - 1][pos.x])) {
        return {
            'x': pos.x,
            'y': pos.y - 1
        };
    }
    if (pos.y + 1 < input.length && ['|', 'J', 'L'].includes(input[pos.y + 1][pos.x])) {
        return {
            'x': pos.x,
            'y': pos.y + 1
        };
    }
    if (pos.x + 1 < input[pos.y].length && ['7', 'J', '-'].includes(input[pos.y][pos.x + 1])) {
        return {
            'x': pos.x + 1,
            'y': pos.y
        };
    }
    if (pos.x - 1 >= 0 && ['L', 'F', '-'].includes(input[pos.y][pos.x - 1])) {
        return {
            'x': pos.x - 1,
            'y': pos.y
        };
    }

    console.log('Error. No adjacent tile found');
}

function partOne() {
    let curr = findFirstN(startingPos);
    let lastPos = startingPos;
    let counter = 0;
    let next = [];
    let looped = false;
    visited[startingPos.y][startingPos.x] = 1;
    while (!looped) {

        if (visited[curr.y][curr.x] !== 0) {
            console.log("Already visited this node: " + input[curr.y][curr.x]);
            looped = true;
        } else {
            visited[curr.y][curr.x] = visited[lastPos.y][lastPos.x] + 1;
        }

        switch (input[curr.y][curr.x]) {
            case '|':
                if (lastPos.y < curr.y) {
                    next = [curr.x, curr.y + 1];
                } else {
                    next = [curr.x, curr.y - 1];
                }
                break;
            case '-':
                if (lastPos.x < curr.x) {
                    next = [curr.x + 1, curr.y];
                } else {
                    next = [curr.x - 1, curr.y];
                }
                break;
            case 'J':
                if (lastPos.y < curr.y) {
                    next = [curr.x - 1, curr.y];
                } else {
                    next = [curr.x, curr.y - 1];
                }
                break;
            case 'L':
                if (lastPos.y < curr.y) {
                    next = [curr.x + 1, curr.y];
                } else {
                    next = [curr.x, curr.y - 1];
                }
                break;
            case 'F':
                if (lastPos.y > curr.y) {
                    next = [curr.x + 1, curr.y];
                } else {
                    next = [curr.x, curr.y + 1];
                }
                break;
            case '7':
                if (lastPos.y > curr.y) {
                    next = [curr.x - 1, curr.y];
                } else {
                    next = [curr.x, curr.y + 1];
                }
                break;
            case 'S':
                looped = true;
        }

        lastPos = curr;
        curr = {'x': next[0], 'y': next[1]};
        counter++;
    }
    console.log('Part One: ' + (counter / 2));
}

function partTwo() {
    replaceStartTile(startingPos);
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

partOne();
partTwo();