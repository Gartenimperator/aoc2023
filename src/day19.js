import {readFile} from 'fs';

// some names are already reserved
let function_names = {
    "in": "start",
    "rs": "rs0815",
}

var distinct_combinations = 0;

let functionMap = new Map();

functionMap.set('R', function R(x,m,a,s) {
    return false;
});

functionMap.set('A', function A(x,m,a,s) {
    return true;
});

let functionMap2 = new Map();

functionMap2.set('A_2', function A_2(ranges) {
    let mul = 1;
    for (let i of ["x","m","a","s"]) {
        mul *= ranges[`${i}max`] - ranges[`${i}min`] + 1;
    }
    distinct_combinations += mul;
});

functionMap2.set('R_2', function R_2(ranges) {
    return;
});

readFile( "../input/day19.txt", 'utf-8', function(err, f) {
    let [rules, parts] = f.split("\r\n\r\n");

    for (let rule of rules.split("\r\n")) {
        let [name, rs] = rule.split("{");
        let function_body = ""
        let function_body_part2 = ""

        for (let r of rs.split(",")) {
            if (r.includes(":")) {
                // mapping
                let [cond, next] = r.split(":");
                if (next in function_names) {
                    next = function_names[next];
                }

                let p2if = ""
                let p2else = ""
                if (cond.includes("<")) {
                    let [k,v] = cond.split("<");
                    p2if += `saved = r.${k}max;r.${k}max = ${v} - 1`
                    p2else += `r.${k}max = saved;r.${k}min = ${v}`
                } else {
                    let [k,v] = cond.split(">");
                    p2if += `saved = r.${k}min;r.${k}min = ${v} + 1`
                    p2else += `r.${k}min = saved;r.${k}max = ${v}`
                }

                function_body += `if (${cond}) { return functionMap.get('${next}')(x,m,a,s) }\n`
                function_body_part2 += `${p2if};functionMap2.get('${next}_2')(r);${p2else};`
            } else if (r.includes("}")) {

                // last
                let next = r.slice(0, -1);
                if (next in function_names) {
                    next = function_names[next];
                }

                function_body += `return functionMap.get('${next}')(x,m,a,s)`
                function_body_part2 += `functionMap2.get('${next}_2')(r);`
            } else {
                console.error("Should not happen!");
                process.exit(1);
            }
        }

        if (name in function_names) {
            name = function_names[name];
        }

        eval(`functionMap.set('${name}', function ${name}(x,m,a,s,ranges) {${function_body}});`);
        eval(`functionMap2.set('${name}_2', function ${name}_2(ranges) {let saved=0;let r={...ranges};${function_body_part2}});`);
    }

    let res = 0;
    let obj;
    for (let part of parts.split("\r\n")) {
        if (part.length === 0) {
            continue
        }
        eval(`obj = ${part.replaceAll("=", ":")}`)
        if (functionMap.get('start')(obj.x, obj.m, obj.a, obj.s)) {
            res += obj.x + obj.m + obj.a + obj.s;
        }
    }
    console.log(`Part One ${res}`);

    let ranges = {
        xmin: 1, xmax: 4000,
        mmin: 1, mmax: 4000,
        amin: 1, amax: 4000,
        smin: 1, smax: 4000,
    };

    functionMap2.get('start_2')(ranges);
    console.log(`Part Two ${distinct_combinations}`);
})
