import {readFileSync} from 'fs';

let input = readFileSync('../input/day16.txt', 'utf-8').split("\r\n").map((val) => val.split(''));

const direction = {
    up: 'UP',
    down: 'DOWN',
    left: 'LEFT',
    right: 'RIGHT'
};

let wasHereMap = new Map();
let confusingMirrorMap = new Map();
let walkingMap = new Map();

function initMaps() {
    confusingMirrorMap.set(direction.up + '-', [direction.left, direction.right]);
    confusingMirrorMap.set(direction.up + '\\', [direction.left]);
    confusingMirrorMap.set(direction.up + '/', [direction.right]);

    confusingMirrorMap.set(direction.down + '-', [direction.left, direction.right]);
    confusingMirrorMap.set(direction.down + '\\', [direction.right]);
    confusingMirrorMap.set(direction.down + '/', [direction.left]);

    confusingMirrorMap.set(direction.left + '|', [direction.up, direction.down]);
    confusingMirrorMap.set(direction.left + '\\', [direction.up]);
    confusingMirrorMap.set(direction.left + '/', [direction.down]);

    confusingMirrorMap.set(direction.right + '|', [direction.up, direction.down]);
    confusingMirrorMap.set(direction.right + '\\', [direction.down]);
    confusingMirrorMap.set(direction.right + '/', [direction.up]);

    walkingMap.set(direction.up, {'x': 0, 'y': -1});
    walkingMap.set(direction.down, {'x': 0, 'y': 1});
    walkingMap.set(direction.left, {'x': -1, 'y': 0});
    walkingMap.set(direction.right, {'x': 1, 'y': 0});
}

let counter = 0;
let counter2 = 0;
function partOneRec(currentPos, direction) {
    if (currentPos.x < 0 || currentPos.x >= input[0].length || currentPos.y < 0 || currentPos.y >= input.length) {
        counter2++;
        //outside of Map;
        return;
    }

    //check if in a loop or add tile to map
    if (wasHereMap.has('' + currentPos.x + currentPos.y)) {
        if (wasHereMap.get('' + currentPos.x + currentPos.y).includes(direction)) {
            //inside a loop
            return;
        } else {
            wasHereMap.get('' + currentPos.x + currentPos.y).push(direction);
        }
    } else {
        counter++;
        wasHereMap.set('' + currentPos.x + currentPos.y, [direction]);
    }

    //rec call next tile
    if (confusingMirrorMap.has(direction + input[currentPos.y][currentPos.x])) {
        let newDirections = confusingMirrorMap.get(direction + input[currentPos.y][currentPos.x]);
        for (let j = 0; j < newDirections.length; j++) {
            let temp = walkingMap.get(newDirections[j]);
            let nextPos = { 'x': currentPos.x + temp.x, 'y': currentPos.y + temp.y };
            partOneRec(nextPos, newDirections[j]);
        }
    } else {
        let temp = walkingMap.get(direction);
        let nextPos = { 'x': currentPos.x + temp.x, 'y': currentPos.y + temp.y };
        partOneRec(nextPos, direction);
    }
}

function partOne() {
    let currentPos = {'x': 0, 'y': 0};
    let currentDirection = direction.right;
    partOneRec(currentPos, currentDirection);
    console.log(wasHereMap.size);
    console.log(counter);
    console.log(counter2);
}

initMaps();

partOne();