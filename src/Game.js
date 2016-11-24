import DrawEngineFactory from './engines/DrawEngineFactory';
import MoveCalculator from './MoveCalculator';
import eventManager from './eventManager';


const snakeConfig = {
    fi: Math.PI,
    circleR: 2,
    color: '#ff0000',
    collisionColor: '#000000',
    headPoint: {x: 200, y: 150},
};

const defaultConfig = {
    domNodeId: 'game-board',
    board: {
        x: 400, y: 400
    },
    rotationAngle: 0.07,
    pointDensity: 2, // 3.9 max, coz with higher density rotating causes collision
    wallOn: false,
    players: [
        snakeConfig
    ]
};

class Game {
    constructor(config, definedDomNode) {
        this.initializeVariables();

        const gameConfig = Object.assign({}, defaultConfig, config);
        const domNode = definedDomNode || document.getElementById(gameConfig.domNodeId);

        this.moveCalculator = new MoveCalculator(gameConfig);
        this.drawEngine = new DrawEngineFactory(DrawEngineFactory.engineTypes.svg, domNode, gameConfig);

        this.move();
    }

    initializeVariables() {
        this.collisionOccurred = false;
        this.occupiedPoints = [];
    }

    reset() {
        this.collisionOccurred = false;
        this.occupiedPoints.length = 0; //clear array

        this.drawEngine.clear();
    }

    drawCollision(snakeConfig) {
        setTimeout(() => {
            this.drawEngine.drawCollision(snakeConfig);
        }, 0);

    }

    drawNextStep(snakeConfig) {
        setTimeout(() => {
            this.drawEngine.drawPoint(snakeConfig);
        }, 0);
    }

    move() {
        if (!this.collisionOccurred) {

            snakeConfig.headPoint = this.moveCalculator.calculateNextStep(snakeConfig);
            const collisionPoint = this.moveCalculator.checkCollision(this.occupiedPoints, snakeConfig);
            if (collisionPoint) {
                eventManager.fireEvent('collision');
                this.collisionOccurred = true;
                console.log(`Collision in point {${snakeConfig.headPoint.x},${snakeConfig.headPoint.y}`);
                this.drawCollision(snakeConfig);
            } else {
                this.occupiedPoints.push(snakeConfig.headPoint);
                this.drawNextStep(snakeConfig);
            }
        }
    }

    rotateLeft() {
        this.moveCalculator.rotateLeft(snakeConfig);
    }

    rotateRight() {
        this.moveCalculator.rotateRight(snakeConfig);
    }

    eventListener(...arg) {
        eventManager.eventListener(...arg);
    }
}

export default Game;
