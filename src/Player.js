// const playerConfig = {
//     name: 'red',
//     fi: 2 * Math.PI,
//     sizeMultiplier: 2,
//     color: '#ff0000',
//     collisionColor: '#000000',
//     headPoint: {x: 10, y: 10},
// }

class Player {
    constructor(gameContext, playerConfig) {
        this.gameContext = gameContext;
        this.playerConfig = playerConfig;
        this.playerConfig.sizeMultiplier=1;
        this.playerConfig.speedMultiplier=1;
        this.collisionOccurred = false;
        this.occupiedPoints = [];
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

            const collision = this.gameContext.players.find(({playerConfig:{name}, occupiedPoints}) => {
                return this.gameContext.moveCalculator.checkCollision(
                    occupiedPoints, this.playerConfig, name === this.playerConfig.name);
            });

            const point = {
                r: this.playerConfig.sizeMultiplier * this.gameContext.gameConfig.circleR,
                x: this.playerConfig.headPoint.x,
                y: this.playerConfig.headPoint.y
            };

            if (collision) {
                point.color = this.playerConfig.collisionColor;

                this.collisionOccurred = true;
                this.gameContext.onCollision(this.playerConfig);
            }else {
                point.color = this.playerConfig.color;
                this.occupiedPoints.push(point);
            }

            this.gameContext.drawNextStep(point);
        }
    }
}

module.exports = Player;