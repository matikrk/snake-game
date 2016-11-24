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
    left: intervalHelper(()=>game.rotateLeft(), timeBase / 2),
    right: intervalHelper(()=>game.rotateRight(), timeBase / 2),
};


const gameControl = Object.assign(
    intervalHelper(()=>game.move(), timeBase),
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
            gameControl.reset();
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
        default:

    }
};
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

