const Game = require('./src/Game');

const htmlNode = document.getElementById('game-board');
const game = new Game(htmlNode, {
    drawEngine: {type: 'canvas'},
    board: {
        x: 800, y: 500
    },});

const players = [
    {
        name: 'red',
        fi: 2 * Math.PI,
        color: '#ff0000',
        collisionColor: '#000000',
        headPoint: {x: 10, y: 10},
    },
    {
        name: 'green',
        fi: 2 * Math.PI,
        color: '#00ff00',
        collisionColor: '#000000',
        headPoint: {x: 10, y: 20},
    },
    {
        name: 'blue',
        fi: 2 * Math.PI,
        color: '#0000ff',
        collisionColor: '#000000',
        headPoint: {x: 10, y: 100},
    },
];
players.forEach(playerConfig => game.addPlayer(playerConfig));
game.deletePlayer('red');

window.gameControll = game;


const keyLeft = 37;
const keyRight = 39;
const esc = 27;
const keyX = 88;
const keyZ = 90;
const onKeyDown = function (e) {
    switch (e.keyCode) {
        case keyLeft:
            e.preventDefault();
            game.getPlayer('green').rotateLeft = true;
            break;
        case keyRight:
            e.preventDefault();
            game.getPlayer('green').rotateRight = true;
            break;
        case keyZ:
            game.getPlayer('blue').rotateLeft = true;
            break;
        case keyX:
            game.getPlayer('blue').rotateRight = true;
            break;
        case esc:
            game.reset();
            break;
        default:

    }
};
const onKeyUp = function (e) {
    switch (e.keyCode) {
        case keyLeft:
            game.getPlayer('green').rotateLeft = false;
            break;
        case keyRight:
            game.getPlayer('green').rotateRight = false;
            break;
        case keyZ:
            game.getPlayer('blue').rotateLeft = false;
            break;
        case keyX:
            game.getPlayer('blue').rotateRight = false;
            break;
        default:

    }
};

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

