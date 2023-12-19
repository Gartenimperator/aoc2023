import {readFileSync} from 'fs';

let input = readFileSync('../input/day18.txt', 'utf-8').split("\r\n").map((val) => val.split(' '));

function partOne(isPartTwo) {

    let directionMap = new Map();
    directionMap.set('R', {x: 1, y: 0});
    directionMap.set('L', {x: -1, y: 0});
    directionMap.set('U', {x: 0, y: -1});
    directionMap.set('D', {x: 0, y: 1});

    let dirMapPartTwo = new Map();
    dirMapPartTwo.set('0', 'R');
    dirMapPartTwo.set('2', 'L');
    dirMapPartTwo.set('3', 'U');
    dirMapPartTwo.set('1', 'D');

    let positionBigBossRemeberance = [];

    let currentPos = {x: 0, y: 0};
    let counter = 0;
    for (let i = 0; i < input.length; i++) {
        let dir = directionMap.get(input[i][0]);
        let steps = input[i][1];
        let dirStr = input[i][0];
        if (isPartTwo) {
            //calc dir and steps from colorCode
            let colorCode = input[i][2];
            steps = parseInt(colorCode.slice(2, 7), 16);
            dirStr = dirMapPartTwo.get(colorCode.charAt(7));
            dir = directionMap.get(dirStr);
        }

        currentPos = {
            x: currentPos.x + (dir.x * steps),
            y: currentPos.y + (dir.y * steps)
        }

        positionBigBossRemeberance.push(currentPos);
        counter += parseInt(steps);
    }

    positionBigBossRemeberance.push(positionBigBossRemeberance[0]);
    let area = 0;

    for (let ii = 0; ii < positionBigBossRemeberance.length - 1; ii++) {
        area += ((positionBigBossRemeberance[ii].x * positionBigBossRemeberance[ii + 1].y) - (positionBigBossRemeberance[ii].y * positionBigBossRemeberance[ii + 1].x));
    }

    area = Math.abs(area / 2);
    console.log(area + counter/2 + 1);
}


partOne(true);
