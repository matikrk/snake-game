import canvas from './engines/canvas';
import svg from './engines/svg';
import moveCalculator from './moveCalculator';
import eventManager from './eventManager';

const {calculateNextStep, rotateLeft, rotateRight, checkCollision} = moveCalculator;

const snakeConfig = {
    fi: Math.PI,
    circleR: 5,
    rotationAngle: 0.07,
    color: '#ff0000',
    collisionColor: '#000000',
    headPoint: {x: 200, y: 150},
};

const gameConfig = {
    board: {
        x: 300, y: 200
    },
    pointDensity: 2, // 3.9 max, coz with higher density rotating causes collision
    wallOn: false,
};

const occupiedPoints = [snakeConfig.headPoint];


const init = function () {
    svg.init(document.getElementById('svg-board'), gameConfig);
    canvas.init(document.getElementById('canvas-board'), gameConfig);
    drawNextStep();
};


let collisionOccurred = false;

const move = function () {
    if (!collisionOccurred) {
        snakeConfig.headPoint = calculateNextStep(snakeConfig, gameConfig);
        const collisionPoint = checkCollision(occupiedPoints, snakeConfig, gameConfig);
        if (collisionPoint) {
            eventManager.fireEvent('collision');
            collisionOccurred = true;
            console.log(`Collision in point {${snakeConfig.headPoint.x},${snakeConfig.headPoint.y}`);
            drawCollision();
        } else {
            occupiedPoints.push(snakeConfig.headPoint);
            drawNextStep();
        }
    }
};

const drawNextStep = function () {
    setTimeout(() => {
        canvas.drawPoint(snakeConfig);
        svg.drawPoint(snakeConfig);
    }, 0);
};

const drawCollision = function () {
    setTimeout(() => {
        canvas.drawCollision(snakeConfig);
        svg.drawCollision(snakeConfig);
    }, 0);

};

const reset = function () {
    collisionOccurred = false;
    occupiedPoints.length = 0; //clear array

    svg.clear();
    canvas.clear();
};

init();

export default {
    move,
    rotateLeft: () => rotateLeft(snakeConfig),
    rotateRight: () => rotateRight(snakeConfig),
    reset,
    eventListener: eventManager.eventListener,
};
