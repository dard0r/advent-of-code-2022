import { readFile } from 'node:fs/promises';
import { cwd } from 'node:process';

let rounds = await readFile(`${cwd()}/input.txt`)
    .then(content => content.toString())
    .then(content => content.split('\n'));

const shapes = {
    ROCK: {
        name: 'ROCK',
        points: 1,
        aliases: [ 'A', 'X'],
        winsAgainst: 'SCISSOR',
    },
    PAPER: {
        name: 'PAPER',
        points: 2,
        aliases: [ 'B', 'Y' ],
        winsAgainst: 'ROCK',
    },
    SCISSOR: {
        name: 'SCISSOR',
        points: 3,
        aliases: [ 'C', 'Z' ],
        winsAgainst: 'PAPER',
    }
}

const findByAlias = (alias) => {
    return Object
        .values(shapes)
        .find((shape) => shape.aliases.includes(alias));
};

const points = (shape) => shapes[shape].points;
const wins = (me, opponent) => shapes[me].winsAgainst === opponent;

const evaluate = ([ me, opponent ]) => {
    let score = points(me);

    const draw = opponent === me;
    if (!draw) {
        if (wins(me, opponent)) {
            score += 6;
        }
    } else {
        score += 3;
    }
    return score;
};

const moves = rounds.map(round => round.split(' '));

const total = moves.map(([ opponent, me ]) => [
        findByAlias(me).name,
        findByAlias(opponent).name,
    ])
    .map(round => evaluate(round))
    .reduce((total, score) => total + score, 0);

console.log('First half result', total);

// Second half

const winnerShape = (opponent) => Object
    .values(shapes)
    .find(shape => shape.winsAgainst === opponent);

const whatToPlay = (opponent, me) => {
    const opponentShape = findByAlias(opponent);
    
    switch (me) {
        case 'Y':
            return opponentShape.name;
        case 'X':
            return opponentShape.winsAgainst;
        default:
            return winnerShape(opponentShape.name).name;
    }
} 

const total2 = moves
    .map(([opponent, me]) => [
        whatToPlay(opponent, me),
        findByAlias(opponent).name,
    ])
    .map(round => evaluate(round))
    .reduce((total, score) => total + score, 0);

console.log('Second half result', total2);