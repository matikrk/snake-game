// const playerConfig = {
//     name: 'red',
//     fi: 2 * Math.PI,
//     sizeMultiplier: 2,
//     color: '#ff0000',
//     collisionColor: '#000000',
//     headPoint: {x: 10, y: 10},
// }

const gapParameters = {
    gapMin: 12,
    gapMax: 32,
    fillMin: 12,
    fillMax: 200,
};

class Player {
    constructor(gameContext, playerConfig) {
        this.gameContext = gameContext;
        this.playerConfig = playerConfig;
        this.playerConfig.sizeMultiplier = 1;
        this.playerConfig.speedMultiplier = 1;
        this.collisionOccurred = false;
        this.occupiedPoints = [];
        this.playerConfig.headPoint = {};
        this.headPointDrawEngine = this.gameContext.drawEngine.addLayer('player_' + this.playerConfig.name);
        this.nextMoves = [];
        this.prepareNextMovesForNextGame();

        this.reset();// put player on random point at board
    }

    drawHead(point) {
        requestAnimationFrame(() => {
            this.headPointDrawEngine.clear();
            this.headPointDrawEngine.drawPoint(point);
        });
    }

    fillNextMoves() {
        const {gapMin, gapMax, fillMax, fillMin}= gapParameters;
        const fill = ~~(Math.random() * (fillMax - fillMin)) + fillMin;
        const fillArray = new Array(fill).fill(true);
        const gap = ~~(Math.random() * (gapMax - gapMin)) + gapMin;
        const gapArray = new Array(gap).fill(false);
        this.nextMoves.push(...fillArray, ...gapArray);
    }

    move() {
        if (!this.collisionOccurred) {
            if (this.rotateRight) {
                this.gameContext.moveCalculator.rotateRight(this.playerConfig);
            }
            if (this.rotateLeft) {
                this.gameContext.moveCalculator.rotateLeft(this.playerConfig);
            }
            this.playerConfig.headPoint = this.gameContext.moveCalculator.calculateNextStep(this.playerConfig);

            const visibleStep = this.nextMoves.shift();
            if (this.nextMoves.length === 0) {
                this.fillNextMoves();
            }

            const point = {
                r: this.playerConfig.sizeMultiplier * this.gameContext.gameConfig.circleR,
                x: this.playerConfig.headPoint.x,
                y: this.playerConfig.headPoint.y,
                color: this.playerConfig.color,
            };

            if (visibleStep) {
                const collision = this.gameContext.players.find(({playerConfig:{name}, occupiedPoints}) => {
                    return this.gameContext.moveCalculator.checkCollision(
                        occupiedPoints, this.playerConfig, name === this.playerConfig.name);
                });

                if (collision) {
                    point.color = this.playerConfig.collisionColor;
                    this.onCollision();
                } else {
                    this.occupiedPoints.push(point);
                }

                this.gameContext.drawNextStep(point);
            }

            this.drawHead(point);
        }
    }

    prepareNextMovesForNextGame() {
        const timesRepeat = 20;
        new Array(timesRepeat).fill(true).forEach(() => this.fillNextMoves());
    }

    onCollision() {
        this.collisionOccurred = true;
        this.gameContext.onCollision(this.playerConfig);
        setTimeout(() => this.prepareNextMovesForNextGame(), 0);
    }

    reset() {
        this.collisionOccurred = false;
        this.occupiedPoints.length = 0;

        this.playerConfig.headPoint.x = this.gameContext.gameConfig.board.x * Math.random();
        this.playerConfig.headPoint.y = this.gameContext.gameConfig.board.y * Math.random();
        this.playerConfig.fi = 2 * Math.PI * Math.random();
    }
}

module.exports = Player;
