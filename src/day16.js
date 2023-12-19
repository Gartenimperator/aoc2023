
import {readFileSync} from 'fs';

let input = readFileSync('../input/day16.txt', 'utf-8').split("\r\n").map((val) => val.split(''));

let input2 = readFileSync('../input/day16.txt', 'utf-8').split("\r\n").map((val) => val.split(''));
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

function partOneRec(currentPos, direction) {
    if (currentPos.x < 0 || currentPos.x >= input[0].length || currentPos.y < 0 || currentPos.y >= input.length) {
        //outside of Map;
        return;
    }

    //check if in a loop or add tile to map
    let mapExists = wasHereMap.has(currentPos.y) && wasHereMap.get(currentPos.y).has(currentPos.x);
    if (mapExists) {
        let temp = wasHereMap.get(currentPos.y).get(currentPos.x);
        if (temp.includes(direction)) {
            //inside a loop
            return;
        } else {
            temp.push(direction);
        }
    } else {
        if (wasHereMap.has(currentPos.y)) {
            wasHereMap.get(currentPos.y).set(currentPos.x, [direction]);
        } else {
            let mapY = new Map();
            mapY.set(currentPos.x, [direction]);
            wasHereMap.set(currentPos.y, mapY);
        }
        counter++;
        /*
        if (input2[currentPos.y][currentPos.x] === '#') {
            console.log('Error');
        }
        input2[currentPos.y][currentPos.x] = '#';

         */
    }

    //rec call next tile
    if (confusingMirrorMap.has('' + direction + input[currentPos.y][currentPos.x])) {
        let newDirections = confusingMirrorMap.get('' + direction + input[currentPos.y][currentPos.x]);
        for (let j = 0; j < newDirections.length; j++) {
            let temp = walkingMap.get(newDirections[j]);
            let nextPos = { 'x': currentPos.x + temp.x, 'y': currentPos.y + temp.y };
            partOneRec(nextPos, newDirections[j]);
        }
    } else {
        let temp = walkingMap.get(direction);
        let nextPos = { 'x': (currentPos.x + temp.x), 'y': (currentPos.y + temp.y) };
        partOneRec(nextPos, direction);
    }
}

function partOne() {
    let currentPos = {'x': 0, 'y': 0};
    let currentDirection = direction.right;
    partOneRec(currentPos, currentDirection);
    let sum = 0;
    wasHereMap.forEach((val) => sum += val.size);
    console.log(counter);
    console.log(sum);
}

function partTwo() {
    let maxX = input[0].length;
    let maxY = input.length;
    let max = 0;
    counter = 0;
    for (let i = 0; i < maxX; i++) {
        let currentPos = {'x': i, 'y': 0};
        let currentDirection = direction.down;
        partOneRec(currentPos, currentDirection);
        max = max < counter ? counter : max;
        wasHereMap = new Map();
        counter = 0;
        currentPos = {'x': i, 'y': maxY - 1};
        currentDirection = direction.up;
        partOneRec(currentPos, currentDirection);
        max = max < counter ? counter : max;
        wasHereMap = new Map();
        counter = 0;
    }
    for (let i = 0; i < maxY; i++) {
        let currentPos = {'x': 0, 'y': i};
        let currentDirection = direction.right;
        partOneRec(currentPos, currentDirection);
        max = max < counter ? counter : max;
        wasHereMap = new Map();
        counter = 0;
        currentPos = {'x': maxX - 1, 'y': i};
        currentDirection = direction.left;
        partOneRec(currentPos, currentDirection);
        max = max < counter ? counter : max;
        wasHereMap = new Map();
        counter = 0;
    }
    console.log(max);
}

initMaps();
//partOne();
partTwo();

//console.log(input2.map((val) => val.join('')).join('\n\r'));