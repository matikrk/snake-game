class MoveCalculator {
    constructor(config) {
        this.config = config;
    }

    calculateNextStep(snakeConfig) {
        const {headPoint:{x, y}, circleR, fi} = snakeConfig;
        const {board:{x:boardX, y:boardY}, pointDensity}=this.config;

        const step = circleR / pointDensity;

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
        snakeConfig.fi -= this.config.rotationAngle;
    }

    rotateRight(snakeConfig) {
        snakeConfig.fi += this.config.rotationAngle;
    }

    checkCollision(occupiedPoints, snakeConfig) {
        const {pointDensity, board:{x:boardX, y:boardY}, wallOn}=this.config;
        const {headPoint:{x, y}, circleR}=snakeConfig;

        const stepsToOmit = Math.ceil(2 * pointDensity - 1);
        const omitFromIndex = occupiedPoints.length - stepsToOmit;

        const approximationError = 0.1 * circleR;
        const circleDiameter = 2 * circleR - approximationError;

        const hitWall = wallOn && (x < circleR || x > boardX - circleR || y < circleR || y > boardY - circleR);
        if (hitWall) {
            return snakeConfig.headPoint;
        } else {
            const {sqrt, pow}= Math;
            return occupiedPoints.filter((point, i) => i < omitFromIndex)
                .find(function (point) {
                    const distance = sqrt(pow(point.x - x, 2) + pow(point.y - y, 2));
                    return distance < circleDiameter;
                });
        }
    }
}


export default MoveCalculator;