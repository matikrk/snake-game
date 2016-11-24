const Game = require('./src/Game');
const game = new Game();
const timeBase = 15;

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
    left: intervalHelper(()=>game.rotateLeft(game.getPlayers()[0]), timeBase / 2),
    right: intervalHelper(()=>game.rotateRight(game.getPlayers()[0]), timeBase / 2),
};

const rotate2 = {
    left: intervalHelper(()=>game.rotateLeft(game.getPlayers()[1]), timeBase / 2),
    right: intervalHelper(()=>game.rotateRight(game.getPlayers()[1]), timeBase / 2),
};

const gameControl = Object.assign(
    intervalHelper(()=>game.moveAll(), timeBase),
    {
        reset: ()=>game.reset()
    }
);

let startTime;
window.game = Object.assign({}, gameControl, {
    start(){
        startTime = new Date();
        gameControl.start();
    }
});
game.eventListener('collision', () => console.log(new Date() - startTime));


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
            gameControl.stop();
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

