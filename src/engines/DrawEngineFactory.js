import Svg from './Svg';
import Canvas from './Canvas';


const chooseEngine = function (engineType, CustomEngine) {
    switch (engineType) {
        case DrawEngineFactory.engineTypes.svg:
            return new Svg();
        case DrawEngineFactory.engineTypes.canvas:
            return new Canvas();
        case DrawEngineFactory.engineTypes.custom:
            checkCustomEngine(CustomEngine);
            return new CustomEngine();
        default:
            throw `Unknown draw engine type (${engineType})`;
    }
};

const checkCustomEngine = function (CustomEngine) {
    if (CustomEngine) {
        const functions = ['init', 'drawPoint', 'clear'];
        functions.forEach(function (fncName) {
                if (typeof CustomEngine.prototype[fncName] !== 'function') {
                    throw 'Incorrect custom draw engine';
                }
            }
        );
    } else {
        throw 'Not defined custom draw engine';
    }
};

class DrawEngineFactory {
    constructor(engineType, domNode, gameConfig, CustomEngine) {
        this.engine = chooseEngine(engineType, CustomEngine);
        this.engine.init(domNode, gameConfig);
    }

    drawPoint(snakeConfig, color) {
        const point={
            x:snakeConfig.headPoint.x,
            y:snakeConfig.headPoint.y,
            r:snakeConfig.circleR,
            color: color || snakeConfig.color
        };

        this.engine.drawPoint(point);
    }

    drawCollision(snakeConfig) {
        this.drawPoint(snakeConfig, snakeConfig.collisionColor);
    }

    clear() {
        this.engine.clear();
    }
}

DrawEngineFactory.engineTypes = {
    svg: 'svg',
    canvas: 'canvas',
    custom: 'custom'
};

export default DrawEngineFactory;