import DrawEngine from './drawEngines/DrawEngine';
import MoveCalculator from './MoveCalculator';
import Player from './Player';


const defaultConfig = {
    board: {
        x: 400, y: 400
    },
    circleR: 2,
    rotationAngle: 0.09,
    pointDensity: 1.2, //change it to adjust speed // 3.9 max, coz with higher density rotating causes collision
    timeBase: 1000 / 60, // 1000/60 - 60FPS lower value make no sense in browser
    wallOn: false,
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
        this.drawEngine = new DrawEngine(this.domNode, this.gameConfig.board);
        this.mainBoard = this.drawEngine.addLayer('mainBoard');

        //Creating new layer for powerups feature
        // this.powerupBoard = this.drawEngine.addLayer('powerBoard', -1,'svg');
        // this.powerupBoard.drawPoint({x:100,y:200,r:20,color:'#ff0000'});

        this.startCounterLayer = this.drawEngine.addLayer('startCounterLayer', 10);
    }

    addPlayer(playerConfig) {
        const player = new Player(this, playerConfig);
        this.players.push(player);

        return player;
    }

    start() {
        const canvas = this.startCounterLayer.getDomElement();
        const ctx = canvas.getContext('2d');
        const {x, y}=this.gameConfig.board;
        const size = 80;
        ctx.font = `${size}px Georgia`;
        new Promise(
            resolve => {
                ctx.fillText('3', (x - size) / 2, (y - size) / 2);
                setTimeout(resolve, 1000);
            }
        ).then(
            () => {
                this.startCounterLayer.clear();
                ctx.fillText('2', (x - size) / 2, (y - size) / 2);

                return new Promise(res => setTimeout(res, 1000));
            }
        ).then(
            () => {
                this.startCounterLayer.clear();
                ctx.fillText('1', (x - size) / 2, (y - size) / 2);
                return new Promise(res => setTimeout(res, 1000));
            }
        ).then(
            () => {
                this.startCounterLayer.clear();
                ctx.fillText('GO', (x - 2 * size) / 2, (y - size) / 2);
                this.startNow();
                return new Promise(res => setTimeout(res, 300));
            }
        ).then(
            () => {
                this.startCounterLayer.clear();
            }
        );
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
        return this.players.find(player => player.playerConfig.name === name);
    }

    reset() {
        this.tick = 0;
        this.players.forEach(player => player.reset());

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

    startNow() {
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
