import EngineFactory from './engines/DrawEngineFactory';

import MoveCalculator from './MoveCalculator';
import eventManager from './eventManager';

let moveCalculator ;
let drawEngine;


const snakeConfig = {
    fi: Math.PI,
    circleR: 2,
    color: '#ff0000',
    collisionColor: '#000000',
    headPoint: {x: 200, y: 150},
};

const defaultConfig={
    board: {
        x: 400, y: 400
    },
    rotationAngle: 0.07,
    pointDensity: 2, // 3.9 max, coz with higher density rotating causes collision
    wallOn: false,
};

const occupiedPoints = [snakeConfig.headPoint];


const init = function (config) {
    const gameConfig = Object.assign({},defaultConfig,config);
    moveCalculator = new MoveCalculator(gameConfig);
    drawEngine = new EngineFactory(EngineFactory.engineTypes.svg, document.getElementById('custom-board'), gameConfig);
    drawNextStep();
};


let collisionOccurred = false;

const move = function () {
    if (!collisionOccurred) {
        snakeConfig.headPoint = moveCalculator.calculateNextStep(snakeConfig);
        const collisionPoint = moveCalculator.checkCollision(occupiedPoints, snakeConfig);
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
        drawEngine.drawPoint(snakeConfig);
    }, 0);
};

const drawCollision = function () {
    setTimeout(() => {
        drawEngine.drawCollision(snakeConfig);
    }, 0);

};

const reset = function () {
    collisionOccurred = false;
    occupiedPoints.length = 0; //clear array

    drawEngine.clear();
};

init();

export default {
    move,
    rotateLeft: () => moveCalculator.rotateLeft(snakeConfig),
    rotateRight: () => moveCalculator.rotateRight(snakeConfig),
    reset,
    eventListener: eventManager.eventListener,
};
