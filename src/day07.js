import {readFileSync} from 'fs';

let input = readFileSync('../input/day07.txt', 'utf-8');
let textByLine = input.split("\n");


function cardVal(s) {
    switch (s) {
        case 'A': return 14;
        case 'K': return 13;
        case 'Q': return 12;
        case 'J': return 11;
        case 'T': return 10;
        default: return s;
    }
    return 0;
}

function countMatches(hand) {
    let matchesInline = new Array(hand.length).fill(0);
    for (let i = 0; i < hand.length; i++) {
        for (let j = i + 1; j < hand.length; j++) {
            if (hand[i] === hand[j]) {
                matchesInline[i] = matchesInline[i] + 1;
                matchesInline[j] = matchesInline[j] + 1;
            }
        }
    }
    return matchesInline;
}

function getRank(hand) {
    let matchesInline = countMatches(hand);
    matchesInline.sort(function (a, b) {
        return b - a; // Ascending
    });

    switch (matchesInline[0]) {
        case 4:
            return 6; //5 matching
        case 3:
            return 5; //4 matching
        case 2:
            return parseInt(matchesInline[3]) === 1 ? 4 : 3; //FullHouse or Three Of A kind
        case 1:
            return parseInt(matchesInline[2]) === 1 ? 2 : 1; //Two Pair or Single pair;
        default:
            return 0; // no matches
    }
}

function partOne() {
    let rankings = [];
    textByLine.forEach((val, i) => {
        let lineSplit = val.split(' ');
        let hand = lineSplit[0];
        let bet = lineSplit[1];
        rankings.push({
            'rank': getRank(hand.split('')),
            'hand': hand,
            'bet': parseInt(bet)});
    });

    rankings.sort((a, b) => {
        if (a.rank === b.rank) {
            for (let i = 0; i < a.hand.length; i++) {
                let a2 = cardVal(a.hand.at(i));
                let b2 = cardVal(b.hand.at(i));
                if (a2 === b2) {
                    continue;
                }

                return a2 - b2;
            }
        } else {
            return a.rank - b.rank;
        }
    })

    let sum = 0;
    rankings.forEach((val, i) => {
        sum += val.bet * (i + 1);
    })

    console.log('part One: ' + sum);
}

/**
 *
 *  PART TWO -----------------------------------------------------------
 *
 */

function cardValTwo(s) {
    switch (s) {
        case 'A': return 14;
        case 'K': return 13;
        case 'Q': return 12;
        case 'J': return 1;
        case 'T': return 10;
        default: return s;
    }
    return 0;
}

function countMatchesTwo(hand) {
    let matchesInline = new Array(hand.length).fill(0);
    let JCounter = 0;
    for (let i = 0; i < hand.length; i++) {
        if (hand[i] === 'J') {
            JCounter++;
        } else {
            matchesInline[i] = matchesInline[i] + 1; //Not J's always ranked higher than J's

            for (let j = i + 1; j < hand.length; j++) {
                if (hand[i] === hand[j]) {
                    matchesInline[i] = matchesInline[i] + 1;
                    matchesInline[j] = matchesInline[j] + 1;
                }
            }
        }
    }
    return {'matchesInline': matchesInline, 'JCounter': JCounter};
}

function getRankTwo(hand) {
    let data = countMatchesTwo(hand);
    data.matchesInline.sort(function (a, b) {
        return b - a; // Descending
    });

    switch ((data.matchesInline[0] + data.JCounter)) {
        case 5:
            return 6; //5 matching
        case 4:
            return 5; //4 matching
        case 3:
            return parseInt(data.matchesInline[3 - data.JCounter]) === 2 ? 4 : 3; //FullHouse or Three Of A kind
        case 2:
            return parseInt(data.matchesInline[2 - data.JCounter]) === 2 ? 2 : 1; //Two Pair or Single pair;
        default:
            return 0; // no matches
    }
}

function partTwo() {
    let rankings = [];
    textByLine.forEach((val, i) => {
        let lineSplit = val.split(' ');
        let hand = lineSplit[0];
        let bet = lineSplit[1];
        rankings.push({
            'rank': getRankTwo(hand.split('')),
            'hand': hand,
            'bet': parseInt(bet)});
    });

    rankings.sort((a, b) => {
        if (a.rank === b.rank) {
            for (let i = 0; i < a.hand.length; i++) {
                let a2 = cardValTwo(a.hand.at(i));
                let b2 = cardValTwo(b.hand.at(i));
                if (a2 === b2) {
                    continue;
                }

                return a2 - b2;
            }
        }
        return a.rank - b.rank;
    })

    console.log(rankings.reduce((sum, c, i) => sum + c.bet * (i + 1), 0));
}

partOne()
partTwo()