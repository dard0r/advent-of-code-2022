import { readFile } from 'node:fs/promises';
import { cwd } from 'node:process';

let elves = await readFile(`${cwd()}/input.txt`)
    .then(content => content.toString())
    .then(content => content.split('\n'))
    .then(content => content.join('-'))
    .then(content => content.split('--'));

console.log(elves);

elves = elves.map(elf => {
    const calories = elf.split('-');
    return calories
        .map(calorie => +calorie)
        .reduce((total, calorie) => total + calorie, 0);
})
.sort((prev, curr) => curr - prev);

console.log('Elf with most calories is carrying', elves.at(0));

const topThreeCalories = elves
    .slice(0, 3)
    .reduce((total, calorie) => total + calorie, 0);

console.log('Top three are carrying', topThreeCalories);