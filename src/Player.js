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
            const collision = this.gameContext.players.find(({playerConfig:{name}, occupiedPoints}) => {
                return this.gameContext.moveCalculator.checkCollision(
                    occupiedPoints, this.playerConfig, name === this.playerConfig.name);
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

module.exports = Player;