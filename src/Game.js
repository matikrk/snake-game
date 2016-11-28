import DrawEngineFactory from './engines/DrawEngineFactory';
import MoveCalculator from './MoveCalculator';
import Player from './Player';


const defaultConfig = {
    board: {
        x: 400, y: 400
    },
    rotationAngle: 0.07,
    pointDensity: 2, // 3.9 max, coz with higher density rotating causes collision
    wallOn: false,
    timeBase: 10,
};

class Game {
    constructor(definedDomNode,config) {
        this.players = [];
        this.gameConfig = Object.assign({}, defaultConfig, config);
        const domNode = definedDomNode;

        this.moveCalculator = new MoveCalculator(this.gameConfig);
        this.drawEngine = new DrawEngineFactory(DrawEngineFactory.engineTypes.canvas, domNode, this.gameConfig);

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

    start(){
        this.mainInterval= setInterval(()=>{
            this.moveAll();

        }, this.gameConfig.timeBase);

    }
    stop(){
        clearInterval(this.mainInterval);
    }
}

export default Game;
