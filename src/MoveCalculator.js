class MoveCalculator {
    constructor(config) {
        this.gameConfig = config;
    }

    calculateNextStep(snakeConfig) {
        const {headPoint:{x, y}, fi, sizeMultiplier, speedMultiplier} = snakeConfig;
        const {board:{x:boardX, y:boardY}, pointDensity, circleR} = this.gameConfig;
        const r = circleR * sizeMultiplier;
        const step = speedMultiplier * r / pointDensity;
        let newX = (x + step * Math.cos(fi)) % boardX;
        newX = newX <= 0 ? boardX - newX : newX;

        let newY = (y + step * Math.sin(fi)) % boardY;
        newY = newY <= 0 ? boardY - newY : newY;

        return {
            x: newX,
            y: newY,
        };
    }

    rotateLeft(snakeConfig) {
        snakeConfig.fi -= this.gameConfig.rotationAngle;
    }

    rotateRight(snakeConfig) {
        snakeConfig.fi += this.gameConfig.rotationAngle;
    }

    checkCollision(occupiedPoints, playerConfig, ownSnake) {
        const {pointDensity, board:{x:boardX, y:boardY}, wallOn, circleR} = this.gameConfig;
        const {headPoint:{x, y}, sizeMultiplier} = playerConfig;

        const r = sizeMultiplier * circleR;
        const approximationError = 0.01 * r;

        const stepsToOmit = ownSnake ? Math.ceil(2 * pointDensity * sizeMultiplier - 1) : 0;
        const omitFromIndex = occupiedPoints.length - stepsToOmit;

        const hitWall = wallOn && (x < r || x > boardX - r || y < r || y > boardY - r);

        if (hitWall) {
            return true;
        } else {
            const {sqrt, pow} = Math;
            const collisionPoint = occupiedPoints.filter((point, i) => i < omitFromIndex)
                .find(function (point) {
                    const minDistance = r + point.r - approximationError;
                    const distance = sqrt(pow(point.x - x, 2) + pow(point.y - y, 2));
                    return distance < minDistance;
                });
            return !!collisionPoint;
        }
    }
}

export default MoveCalculator;
