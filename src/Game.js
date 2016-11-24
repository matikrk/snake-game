import DrawEngineFactory from './engines/DrawEngineFactory';
import MoveCalculator from './MoveCalculator';
import eventManager from './eventManager';


const defaultSnakeConfig = {
    name:'red',
    fi: 2 * Math.PI,
    circleR: 2,
    color: '#ff0000',
    collisionColor: '#000000',
    headPoint: {x: 10, y: 10},
};
const snake2 = {
    name:'blue',
    fi: 2 *Math.PI,
    circleR: 2,
    color: '#0000ff',
    collisionColor: '#000000',
    headPoint: {x: 10, y: 100},
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
        defaultSnakeConfig,
        snake2
    ]
};

class Game {
    constructor(config, definedDomNode) {
        this.initializeVariables();
        const gameConfig = Object.assign({}, defaultConfig, config);
        const domNode = definedDomNode || document.getElementById(gameConfig.domNodeId);

        this.moveCalculator = new MoveCalculator(gameConfig);
        this.drawEngine = new DrawEngineFactory(DrawEngineFactory.engineTypes.svg, domNode, gameConfig);

        this.players = gameConfig.players;

        this.moveAll();
    }

    initializeVariables() {
        this.collisionOccurred = false;
        this.occupiedPoints = [];
    }

    getPlayers() {
        return this.players;
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

    moveAll() {
        this.players.forEach(snakeConfig => this.move(snakeConfig));
    }

    move(snakeConfig) {
        if (!this.collisionOccurred) {

            snakeConfig.headPoint = this.moveCalculator.calculateNextStep(snakeConfig);
            const collision = this.moveCalculator.checkCollision(this.occupiedPoints, snakeConfig, this.players.length);
            if (collision) {
                eventManager.fireEvent('collision');
                this.collisionOccurred = true;
                console.log(`Snake ${snakeConfig.name} loose game`);
                this.drawCollision(snakeConfig);
            } else {
                this.occupiedPoints.push(snakeConfig.headPoint);
                this.drawNextStep(snakeConfig);
            }
        }
    }

    rotateLeft(snakeConfig) {
        this.moveCalculator.rotateLeft(snakeConfig);
    }

    rotateRight(snakeConfig) {
        this.moveCalculator.rotateRight(snakeConfig);
    }

    eventListener(...arg) {
        eventManager.eventListener(...arg);
    }
}

export default Game;
