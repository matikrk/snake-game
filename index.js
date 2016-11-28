const Game = require('./src/Game');
const game = new Game();

const players = [
    {
        name: 'red',
        fi: 2 * Math.PI,
        circleR: 2,
        color: '#ff0000',
        collisionColor: '#000000',
        headPoint: {x: 10, y: 10},
    },
    {
        name: 'green',
        fi: 2 * Math.PI,
        circleR: 2,
        color: '#00ff00',
        collisionColor: '#000000',
        headPoint: {x: 10, y: 20},
    },
    {
        name: 'blue',
        fi: 2 * Math.PI,
        circleR: 2,
        color: '#0000ff',
        collisionColor: '#000000',
        headPoint: {x: 10, y: 100},
    },
];
players.forEach(playerConfig => game.addPlayer(playerConfig));
game.deletePlayer('red');

const timeBase = 10;

const intervalHelper = function (fnc, time) {
    let started = false;
    let interval;
    const start = function () {
        if (!started) {
            interval = setInterval(fnc, time);
            started = true;
        }
    };
    const stop = function () {
        clearInterval(interval);
        started = false;
    };
    const toggle = function () {
        if (started) {
            stop();
        } else {
            start();
        }
    };
    return {start, stop, toggle};
};

const rotate = {
    left: intervalHelper(() => game.getPlayers()[0].rotateLeft(), timeBase / 2),
    right: intervalHelper(() => game.getPlayers()[0].rotateRight(), timeBase / 2),
};

const rotate2 = {
    left: intervalHelper(() => game.getPlayers()[1].rotateLeft(), timeBase / 2),
    right: intervalHelper(() => game.getPlayers()[1].rotateRight(), timeBase / 2),
};

let startTime;
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
            rotate.left.start();
            break;
        case keyRight:
            e.preventDefault();
            rotate.right.start();
            break;
        case esc:
            game.reset();
            break;
        case keyX:
            rotate2.right.start();
            break;
        case keyZ:
            rotate2.left.start();
            break;
        default:

    }
};
const onKeyUp = function (e) {
    switch (e.keyCode) {
        case keyLeft:
            rotate.left.stop();
            break;
        case keyRight:
            rotate.right.stop();
            break;

        case keyX:
            rotate2.right.stop();
            break;
        case keyZ:
            rotate2.left.stop();
            break;
        default:

    }
};
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

