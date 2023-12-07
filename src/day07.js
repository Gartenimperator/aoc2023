import {readFileSync} from 'fs';

let input = readFileSync('../input/day07.txt', 'utf-8');
let textByLine = input.split("\n");

const cardValMap = new Map();

cardValMap.set('A', 14);
cardValMap.set('K', 13);
cardValMap.set('Q', 12);
cardValMap.set('J', 11);
cardValMap.set('T', 10);
/**
 *
 *  PART TWO -----------------------------------------------------------
 *
 */

function cardVal(s, jokerMode) {
    if (parseInt(s)) {
        return s;
    }

    if (jokerMode && s === 'J') {
        return 1;
    } else {
        return cardValMap.get(s);
    }

    return 0;
}

function countMatchesTwo(hand, jokerMode) {
    let matchesInline = new Array(hand.length).fill(1);
    let JCounter = 0;
    for (let i = 0; i < hand.length; i++) {
        if (jokerMode && hand[i] === 'J') {
            matchesInline[i] = 0;
            JCounter++;
        } else {
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

function getRank(hand, jokerMode) {
    let data = countMatchesTwo(hand, jokerMode);
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

function poker(jokerMode) {
    let rankings = [];
    textByLine.forEach((val, i) => {
        let lineSplit = val.split(' ');
        let hand = lineSplit[0];
        let bet = lineSplit[1];
        rankings.push({
            'rank': getRank(hand.split(''), jokerMode),
            'hand': hand,
            'bet': parseInt(bet)
        });
    });

    rankings.sort((a, b) => {
        if (a.rank === b.rank) {
            for (let i = 0; i < a.hand.length; i++) {
                let a2 = cardVal(a.hand.at(i), jokerMode);
                let b2 = cardVal(b.hand.at(i), jokerMode);

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

let timer = Date.now();
poker(false)
console.log('time: ' + (Date.now() - timer));

timer = Date.now();
poker(true)
console.log('time: ' + (Date.now() - timer));