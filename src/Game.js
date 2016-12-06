import DrawEngineFactory from './drawEngines/DrawEngineFactory';
import MoveCalculator from './MoveCalculator';
import Player from './Player';


const defaultConfig = {
    board: {
        x: 400, y: 400
    },
    drawEngine: {
        type: DrawEngineFactory.engineTypes.canvas,
        CustomDrawEngine: null
    },
    circleR: 2,
    rotationAngle: 0.09,
    pointDensity: 1.2, //change it to adjust speed // 3.9 max, coz with higher density rotating causes collision
    wallOn: false,
    timeBase: 1000 / 60, // 1000/60 - 60FPS lower value make no sense in browser
};

const shuffleArray = function (array) {
    const newMap = array.map(b => {
        return {x: b, r: ~~(Math.random() * 100)};
    });
    newMap.sort((c, d) => c.r > d.r);
    return newMap.map(c => c.x);
};

class Game {
    constructor(definedDomNode, config) {
        this.players = [];
        this.tick = 0;

        this.gameConfig = Object.assign({}, defaultConfig, config);
        this.domNode = definedDomNode;

        this.moveCalculator = new MoveCalculator(this.gameConfig);
        this.drawEngine = new DrawEngineFactory(this.gameConfig.drawEngine.type, this.domNode, this.gameConfig, this.gameConfig.drawEngine.CustomDrawEngine);
        this.mainBoard = this.drawEngine.addLayer('mainBoard', 5);
        //  this.powerupBoard = this.drawEngine.addLayer('mainBoard');
        //  this.powerupBoard.drawPoint({x:100,y:200,r:20,color:'#ff0000'});
    }

    addPlayer(playerConfig) {
        const player =new Player(this, playerConfig);
        this.players.push(player);
        return player;
    }

    deletePlayer(playerName) {
        this.players = this.players.filter(player => player.playerConfig.name !== playerName);
    }

    onCollision(playerConfig) {
        /* eslint-disable no-console */
        console.log(`Snake ${playerConfig.name} loose game, points ${this.tick}`);
        /* eslint-enable no-alert, no-console */

        const someonePlay = !!this.players.find(player => player.collisionOccurred === false);
        if (!someonePlay) {
            this.stop();
            this.tick = 0;
        }
    }

    getPlayers() {
        return this.players;
    }
    getPlayer(name) {
        return this.players.find(player=>player.playerConfig.name===name);
    }

    reset() {

        this.tick = 0;
        this.players.forEach(
            player => {
                player.collisionOccurred = false;
                player.occupiedPoints.length = 0;

                player.playerConfig.headPoint.x = this.gameConfig.board.x * Math.random();
                player.playerConfig.headPoint.y = this.gameConfig.board.y * Math.random();
                player.playerConfig.fi = 2 * Math.PI * Math.random();
            }
        );

        this.mainBoard.clear();
        setTimeout(() => {
            this.mainBoard.clear();
            this.moveAll();
        }, 0);
    }

    drawNextStep(point) {
        requestAnimationFrame(() => {
            this.mainBoard.drawPoint(point);
        });
    }

    moveAll() {
        //we need shuffle Array to avoid head-head collision win to 1st player on array player
        shuffleArray(this.players).forEach(player => player.move());
    }

    start() {
        if (!this.mainInterval) {

            this.mainInterval = setInterval(() => {
                this.moveAll();
                this.tick++;
            }, this.gameConfig.timeBase);
        }
    }

    stop() {
        clearInterval(this.mainInterval);
        this.mainInterval = false;
    }
}

export default Game;
