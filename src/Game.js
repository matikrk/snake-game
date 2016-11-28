import DrawEngineFactory from './engines/DrawEngineFactory';
import MoveCalculator from './MoveCalculator';
import eventManager from './eventManager';


const defaultSnakeConfig = {
    name: 'red',
    fi: 2 * Math.PI,
    circleR: 2,
    color: '#ff0000',
    collisionColor: '#000000',
    headPoint: {x: 10, y: 10},
};
const snake2 = {
    name: 'blue',
    fi: 2 * Math.PI,
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
class Player {
    constructor(gameContext, playerConfig) {
        this.gameContext = gameContext;
        this.playerConfig = playerConfig;
        this.collisionOccurred = false;
        this.occupiedPoints = [];
    }

    rotateLeft() {
        this.gameContext.moveCalculator.rotateLeft(this.playerConfig);
    }

    rotateRight() {
        this.gameContext.moveCalculator.rotateRight(this.playerConfig);
    }

    move() {
        if (!this.collisionOccurred) {
            this.playerConfig.headPoint = this.gameContext.moveCalculator.calculateNextStep(this.playerConfig);
            const collision = this.gameContext.players.find(({playerConfig:{name},occupiedPoints})=>{
                return this.gameContext.moveCalculator.checkCollision(
                    occupiedPoints, this.playerConfig, name===this.playerConfig.name);
            });
            if (collision) {

                this.collisionOccurred = true;
                this.gameContext.onCollision(this.playerConfig);

                this.gameContext.drawCollision(this.playerConfig);
            } else {
                this.occupiedPoints.push(this.playerConfig.headPoint);
                this.gameContext.drawNextStep(this.playerConfig);
            }
        }
    }
}

class Game {
    constructor(config, definedDomNode) {
        this.initializeVariables();
        const gameConfig = Object.assign({}, defaultConfig, config);
        const domNode = definedDomNode || document.getElementById(gameConfig.domNodeId);

        this.moveCalculator = new MoveCalculator(gameConfig);
        this.drawEngine = new DrawEngineFactory(DrawEngineFactory.engineTypes.canvas, domNode, gameConfig);

        gameConfig.players.forEach(playerConfig => this.addPlayer(playerConfig));

        this.moveAll();
    }

    addPlayer(playerConfig) {
        this.players.push(new Player(this, playerConfig));
    }

    deletePlayer(playerName) {
        this.players = this.players.filter(player => player.name !== playerName);
    }

    initializeVariables() {
        this.players = [];
        this.collisionOccurred = false;
    }

    onCollision(playerConfig) {
        console.log(`Snake ${playerConfig.name} loose game`);

        eventManager.fireEvent('collision');
        this.collisionOccurred = true;

    }

    getPlayers() {
        return this.players;
    }

    reset() {
        this.players.forEach(player => player.collisionOccurred = false);
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
        this.players.forEach(player => player.move());
    }


    eventListener(...arg) {
        eventManager.eventListener(...arg);
    }
}

export default Game;
