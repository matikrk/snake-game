import DrawEngineFactory from './engines/DrawEngineFactory';
import MoveCalculator from './MoveCalculator';
import eventManager from './eventManager';
import Player from './Player';


const defaultConfig = {
    domNodeId: 'game-board',
    board: {
        x: 400, y: 400
    },
    rotationAngle: 0.07,
    pointDensity: 2, // 3.9 max, coz with higher density rotating causes collision
    wallOn: false,
};

class Game {
    constructor(config, definedDomNode) {
        this.players = [];
        const gameConfig = Object.assign({}, defaultConfig, config);
        const domNode = definedDomNode || document.getElementById(gameConfig.domNodeId);

        this.moveCalculator = new MoveCalculator(gameConfig);
        this.drawEngine = new DrawEngineFactory(DrawEngineFactory.engineTypes.canvas, domNode, gameConfig);

        this.moveAll();
    }

    addPlayer(playerConfig) {
        this.players.push(new Player(this, playerConfig));
    }

    deletePlayer(playerName) {
        this.players = this.players.filter(player => player.playerConfig.name !== playerName);
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
        this.players.forEach(player => {
                player.collisionOccurred = false;
                player.occupiedPoints.length = 0;
            }
        );

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
