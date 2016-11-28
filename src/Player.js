class Player {
    constructor(gameContext, playerConfig) {
        this.gameContext = gameContext;
        this.playerConfig = playerConfig;
        this.collisionOccurred = false;
        this.occupiedPoints = [];
    }

    move() {
        if (!this.collisionOccurred) {
            if(this.rotateRight){
                this.gameContext.moveCalculator.rotateRight(this.playerConfig);
            }
            if(this.rotateLeft){
                this.gameContext.moveCalculator.rotateLeft(this.playerConfig);
            }

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