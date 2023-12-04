import { readFileSync } from 'fs';

let input = readFileSync('../input/day03.txt', 'utf-8');

let textByLine = input.split("\n");
let text = input.toString();
const map = new Map();

function isSpecial(char) {
    return char && char !== '' && !(/[0-9]/.test(char)) && char !== '.';
}

function isSpecialPartTwo(char) {
    return char && char === '*';
}
/*
function checkForSpecialCharFirst(currentPos, currentLine, textByLine) {
    return isSpecial(textByLine[currentLine - 1]?.charAt(currentPos - 1))
        || isSpecial(textByLine[currentLine - 1]?.charAt(currentPos))
        || isSpecial(textByLine[currentLine].charAt(currentPos - 1))
        || isSpecial(textByLine[currentLine + 1]?.charAt(currentPos - 1))
        || isSpecial(textByLine[currentLine + 1]?.charAt(currentPos));
}

function checkForSpecialCharMiddle(currentPos, currentLine, textByLine) {
    return isSpecial(textByLine[currentLine - 1]?.charAt(currentPos))
        || isSpecial(textByLine[currentLine + 1]?.charAt(currentPos));
}

function checkForSpecialCharLast(currentPos, currentLine, textByLine) {
    return isSpecial(textByLine[currentLine - 1]?.charAt(currentPos))
        || isSpecial(textByLine[currentLine + 1]?.charAt(currentPos))
        || isSpecial(textByLine[currentLine]?.charAt(currentPos));
}

 */

function checkForSpecialChar(currentPos, currentLine, textByLine) {
    let ret = false;
    for (let x = Math.max(0, currentPos-1); x <= currentPos+1; x++) {
        for (let y = Math.max(0, currentLine-1); y <= currentLine+1; y++) {
            if (x !== currentPos || y !== currentLine) {
                ret = ret || isSpecial(textByLine[y]?.charAt(x));
            }
        }
    }
    return ret;
}

function checkForSpecialCharPartTwo(currentPos, currentLine, textByLine) {
    for (let x = Math.max(0, currentPos-1); x <= currentPos+1; x++) {
        for (let y = Math.max(0, currentLine-1); y <= currentLine+1; y++) {
            if (x !== currentPos || y !== currentLine) {
                console.log(x);
                if (isSpecialPartTwo(textByLine[y]?.charAt(x))) {
                    return y + '_' + x;
                }
            }
        }
    }
    return null;
}

function partOneDetMachine() {
    let foundNum = false;
    let foundSpecialChar = false;
    let sum = 0;
    let numStr = '';

    for (let currentLine = 0; currentLine < textByLine.length; currentLine++) {
        for (let currentPos = 0; currentPos < textByLine[currentLine].length; currentPos++) {
            let currentChar = textByLine[currentLine].charAt(currentPos);
            if (!foundNum) {
                //looking for number
                if (/[0-9]/.test(currentChar)) {
                    foundNum = true;
                    foundSpecialChar = checkForSpecialChar(currentPos, currentLine, textByLine);
                    numStr += currentChar;
                }
                continue;
            }

            if (!(/[0-9]/.test(currentChar))) {
                //end of number
                if (foundSpecialChar) {
                    sum += parseInt(numStr);
                }

                numStr = '';
                foundSpecialChar = false;
                foundNum = false;
                continue;
            }

            if (!foundSpecialChar) {
                //inside number but not yet a special Char
                foundSpecialChar = checkForSpecialChar(currentPos, currentLine, textByLine);
            }

            numStr += currentChar;
        }
    }

    if (foundNum && foundSpecialChar) {
        sum += parseInt(numStr);
    }

    console.log(sum);
}


function partTwoDetMachine() {
    let foundNum = false;
    let sum = 0;
    let numStr = '';
    let pos;

    for (let currentLine = 0; currentLine < textByLine.length; currentLine++) {
        for (let currentPos = 0; currentPos < textByLine[currentLine].length; currentPos++) {
            let currentChar = textByLine[currentLine].charAt(currentPos);
            if (!foundNum) {
                //looking for number
                if (/[0-9]/.test(currentChar)) {
                    foundNum = true;
                    pos = checkForSpecialCharPartTwo(currentPos, currentLine, textByLine);
                    numStr += currentChar;
                }
                continue;
            }

            if (!(/[0-9]/.test(currentChar))) {
                //end of number
                if (pos) {
                    if (map.has(pos)) {
                        map.get(pos).push(parseInt(numStr));
                    } else {
                        map.set(pos, [parseInt(numStr)]);
                    }
                }

                numStr = '';
                pos = null;
                foundNum = false;
                continue;
            }

            if (!pos) {
                //inside number but not yet a special Char
                pos = checkForSpecialCharPartTwo(currentPos, currentLine, textByLine);
            }

            numStr += currentChar;
        }
    }

    console.log(map);
    map.forEach((value, key,map) => {
        if (value.length === 2) {
            sum += value[0] * value[1];
        }
    })
    console.log(sum);
}

partTwoDetMachine();


//let sum2 = text.match(/(\d*(?<=[^\d.\n\r].{140,142})\d+)|(\d+(?=.{140,142}[^\d.\n\r])\d*)|((?<=[^\d.\n\r])\d+)|(\d+(?=[^\d.\n\r]))/gs)?.reduce((p,c) => p+ +c, 0);
//console.log(sum2);