const moveCalculator = {
    calculateNextStep: function (snakeConfig, gameConfig) {
        const {headPoint:{x, y}, circleR, fi}=snakeConfig;
        const step = circleR / gameConfig.pointDensity;
        let newX = (x + step * Math.cos(fi)) % gameConfig.board.x;
        newX = newX <= 0 ? gameConfig.board.x - newX : newX;
        let newY = (y + step * Math.sin(fi)) % gameConfig.board.y;
        newY = newY <= 0 ? gameConfig.board.y - newY : newY;

        return {
            x: newX,
            y: newY,
        };
    }, rotateLeft: function (snakeConfig) {
        snakeConfig.fi -= snakeConfig.rotationAngle;
    }, rotateRight: function (snakeConfig) {
        snakeConfig.fi += snakeConfig.rotationAngle;
    },
    checkCollision: function (occupiedPoints, snakeConfig, gameConfig) {
        const stepsToOmit = Math.ceil(2 * gameConfig.pointDensity - 1);
        const omitFromIndex = occupiedPoints.length - stepsToOmit;

        const approximationError = 0.1 * snakeConfig.circleR;
        const circleDiameter = 2 * snakeConfig.circleR - approximationError;

        const hitWall = gameConfig.wallOn && (snakeConfig.headPoint.x < snakeConfig.circleR || snakeConfig.headPoint.x > gameConfig.board.x - snakeConfig.circleR ||
            snakeConfig.headPoint.y < snakeConfig.circleR || snakeConfig.headPoint.y > gameConfig.board.y - snakeConfig.circleR);

        return hitWall ? snakeConfig.headPoint : occupiedPoints
            .filter((point, i) => i < omitFromIndex)
            .find(function (point) {

                const distance = Math.sqrt(Math.pow(point.x - snakeConfig.headPoint.x, 2) + Math.pow(point.y - snakeConfig.headPoint.y, 2));
                return distance < circleDiameter;
            });
    },
};

module.exports = moveCalculator;