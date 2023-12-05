import {readFileSync} from 'fs';

let input = readFileSync('../input/day05.txt', 'utf-8');

let maps = input.split("map");
let seeds = maps[0].match(/\d+/g);

function seedToLoc(seed) {
    for (let i = 1; i < maps.length; i++) {
        console.log(seed);
        let map = maps[i].match(/\d+/g);
        if (map.length % 3 !== 0) {
            console.log('Error! Wrong map dimensions. Map: ' + i);
            console.log(map);
            break;
        }

        for (let j = 0; j < map.length; j = j + 3) {
            //check if seedToLoc in range of map entry
            let start = parseInt(map[j + 1]);
            let range = parseInt(map[j + 2]);
            let newStart = parseInt(map[j]);
            if ((start <= seed) && ((start + range) > seed)) {
                seed = newStart + seed - start;
                break;
            }
        }
    }
    return seed;
}

function partOne() {
    let min = Number.MAX_SAFE_INTEGER;
    for (let c = 0; c < seeds.length; c++) {
        let loc = seedToLoc(parseInt(seeds[c]))

        if (min > loc) {
            min = loc;
        }
    }
    console.log(min);
}

function parseRanges() {
    let seedEndPoints = [0];
    for (let i = maps.length - 1; i > 0; i--) {
        let map = maps[i].match(/\d+/g);
        let temp = [];

        seedEndPoints.forEach((val, i) => {
            temp = [];
            for (let j = 0; j < map.length; j = j + 3) {
                let start = parseInt(map[j + 1]);
                let range = parseInt(map[j + 2]);
                let newStart = parseInt(map[j]);

                if (val >= newStart && val < (newStart + range)) {
                    seedEndPoints[i] = start + val - newStart;
                }
                temp.push(start);
            }
        })
        seedEndPoints.push(...temp);
    }
    seedEndPoints.sort(function (a, b) {
        return a - b; // Ascending
    });
    seedEndPoints.push(Number.MAX_SAFE_INTEGER);

    return seedEndPoints;
}

function partTwo() {
    let ranges = parseRanges();
    let min = Number.MAX_SAFE_INTEGER;
    for (let c = 0; c < seeds.length; c = c + 2) {
        let seedStart = parseInt(seeds[c]);
        let seedEnd = seedStart + parseInt(seeds[c + 1]);

        for (let r = 0; r < ranges.length; r++) {

            if (seedStart < ranges[r] && seedEnd > ranges[r]) {
                //seedRange includes range r, r+1

                let temp = seedToLoc(ranges[r]);
                if (temp < min) {
                    min = temp;
                }

            } else if (seedStart > ranges[r] && seedStart < ranges[r + 1]) {
                //seedStart inside r, r+1

                let temp = seedToLoc(seedStart);
                if (temp < min) {
                    min = temp;
                }

            } else if (seedEnd < ranges[r]) {
                //outOfRange

                break;
            }
            //Looping to get into range
        }
    }
    console.log('min: ' + min);
}

//partOne();
console.log('Part 2:');
partTwo();
//partTwo();
