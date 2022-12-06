import { readFile } from 'node:fs/promises';
import { cwd } from 'node:process';

let rucksacks = await readFile(`${cwd()}/input.txt`)
    .then(content => content.toString())
    .then(content => content.split('\n'));

const prioritization = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const half = (string) => string.length / 2;
const toArray = (string) => {
    const result = [];
    for (const char of string) {
        result.push(char);
    }
    return result;
}

const prioritizer = ([ compartment1, ...compartments ]) => {
    const repeatedItems = toArray(compartment1)
        .filter(item => compartments.every(compartment => compartment.includes(item)));

    return [...new Set(repeatedItems)]
        .map(item => prioritization.indexOf(item) + 1)
        .reduce((total, priority) => total + priority, 0)
}

const total = rucksacks
    .map((rucksack) => [
        rucksack.substring(0, half(rucksack)),
        rucksack.substring(half(rucksack)),
    ])
    .map(prioritizer)
    .reduce((total, priority) => total + priority, 0);

console.log('First half result', total);

// Second half
const chunks = (elements, groups = []) => {
    const groupElements = elements.splice(0, 3);
    if (groupElements.length > 0) {
        groups.push(groupElements);
        return chunks(elements, groups);
    }

    return groups;
}

const total2 = chunks(rucksacks)
    .map(prioritizer)
    .reduce((total, priority) => total + priority, 0);

console.log('Second half result', total2);