import {readFileSync} from 'fs';

let input = readFileSync('../input/day17.txt', 'utf-8').split("\r\n").map((val) => val.split(''));

//helper class for PriorityQueue
class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }

    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }

    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }

    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

/*
    Creates Graph where directed edge is weighted after cost of goal node.
*/

function partOne() {
    let min = 4;
    let max = 10;
    let finish = [input.length - 1, input[0].length - 1];

    let mirrorMap = new Map();
    mirrorMap.set('N', 'S');
    mirrorMap.set('S', 'N');
    mirrorMap.set('W', 'O');
    mirrorMap.set('O', 'W');

    const nodes = new PriorityQueue();
    let seen = new Set();
    let smallest;
    let start = {heat: 0, node: [0, 0], dirVert: '-', steps: 0};
    nodes.enqueue(start, 0);
    // as long as there is something to visit


    while (nodes.values.length) {
        smallest = nodes.dequeue().val;
        if (smallest.node[0] === finish[0] && smallest.node[1] === finish[1]) {
            console.log('done: ' + (smallest.heat));
            return smallest.heat;
            //WE ARE DONE
            //BUILD UP PATH TO RETURN AT END
        }

        function structEquals(o, u) {
            return o.node[0] === u.node[0] && o.node[1] === u.node[1] && o.dir === u.dir && o.steps === u.steps;
        }

        let wasSeen = false;
        seen.forEach((val) => {
            if (structEquals(val, smallest)) {
                wasSeen = true;
            }
        })

        if (wasSeen) {
            continue;
        }
        seen.add(smallest);
        let y = smallest.node[0];
        let x = smallest.node[1];
        let heat = smallest.heat;

        let t1 = 0;
        let t2 = 0;
        let t3 = 0;
        let t4 = 0;
        //look in all 4 directions
        for (let i = 1; i <= max; i++) {
            if (y - i >= 0 && (!smallest.dirVert || smallest.dirVert === '-')) {
                t1 += parseInt(input[y - i][x]);
                if (i >= min) {
                    let node = {heat: heat + t1, node: [y - i, x], dirVert: true, steps: i};
                    nodes.enqueue(node, node.heat);
                }
            }

            if (y + i < input.length && (!smallest.dirVert || smallest.dirVert === '-')) {
                t2 += parseInt(input[y + i][x]);
                if (i >= min) {
                    let node = {heat: heat + t2, node: [y + i, x], dirVert: true, steps: i};
                    nodes.enqueue(node, node.heat);
                }
            }

            if (x - i >= 0 && (smallest.dirVert || smallest.dirVert === '-')) {
                t3 += parseInt(input[y][x - i]);
                if (i >= min) {
                    let node = {heat: heat + t3, node: [y, x - i], dirVert: false, steps: i};
                    nodes.enqueue(node, node.heat);
                }
            }

            if (x + i >= 0 && x + i < input[0].length && (smallest.dirVert || smallest.dirVert === '-')) {
                t4 = t4 + parseInt(input[y][x + i]);
                if (i >= min) {
                    let node = {heat: heat + t4, node: [y, x + i], dirVert: false, steps: i};
                    nodes.enqueue(node, node.heat);
                }
            }
        }
    }
}

partOne();