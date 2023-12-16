import {readFileSync} from 'fs';

let starRow = [];
let starCol = [];
let input = readFileSync('../input/day13.txt', 'utf-8').split("\r\n\r\n").map((val) => val.split('\r\n'));


function getRowAsString(pattern, row) {
    return pattern.reduce((res, val) => {
        return res + val[row];
    }, '');
}

// PART TWO

function searchHorizontal2(pattern, smudges) {
    for (let i = 1; i < pattern.length; i++) {
        let mightBeMiddle = true;
        let counter = 0;
        let countSmudges = 0;

        while (mightBeMiddle) {
            if (i - 1 - counter < 0 || i + counter > pattern.length - 1) {
                if (countSmudges === smudges) {
                    return i;
                } else {
                    mightBeMiddle = false;
                    break;
                }
            }

            let temp = pattern[i - 1 - counter].split('');
            let temp1 = pattern[i + counter].split('');
            for (let j = 0; j < temp.length; j++) {
                if (temp[j] !== temp1[j]) {
                    countSmudges++;
                    if (countSmudges > smudges) {
                        mightBeMiddle = false;
                        break;
                    }
                }
            }

            counter++;
        }
    }
}

function searchVertical2(pattern, smudges) {
    for (let i = 1; i < pattern[0].length; i++) {
        let mightBeMiddle = true;
        let counter = 0;
        let countSmudges = 0;

        while (mightBeMiddle) {
            if (i - 1 - counter < 0 || i + counter > pattern[0].length - 1) {
                if (countSmudges === smudges) {
                    return i;
                } else {
                    mightBeMiddle = false;
                    break;
                }
            }

            let temp = getRowAsString(pattern,i - 1 - counter).split('');
            let temp1 = getRowAsString(pattern,i + counter).split('');
            for (let j = 0; j < temp.length; j++) {
                if (temp[j] !== temp1[j]) {
                    countSmudges++;
                    if (countSmudges > smudges) {
                        mightBeMiddle = false;
                        break;
                    }
                }
            }
            counter++;
        }
    }
}

function partTwo(smudges) {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        let pattern = input[i];

        let temp = searchHorizontal2(pattern, smudges) && true;
        let num = 0;

        if (temp) {
            num = searchHorizontal2(pattern, smudges) * 100;
        } else {
            num = searchVertical2(pattern, smudges);
        }
        sum += num;
    }
    console.log(sum);
}

partTwo(0);
partTwo(1);