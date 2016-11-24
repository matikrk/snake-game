import svg from './svg';
import canvas from './canvas';


const checkCustomEngine = function (customEngine) {
    if (customEngine) {
        const functions = ['init', 'drawPoint', 'clear'];
        functions.forEach(function (fncName) {
                if (typeof customEngine[fncName] !== 'function') {
                    throw 'Incorrect custom engine';
                }
            }
        );
    } else {
        throw 'Not defined custom engine';
    }
};

const chooseEngine = function (engineType, customEngine) {
    switch (engineType) {
        case EngineFactory.engineTypes.svg:
            return svg;
        case EngineFactory.engineTypes.canvas:
            return canvas;
        case EngineFactory.engineTypes.custom:
            checkCustomEngine(customEngine);
            return customEngine;
        default:
            throw `Unknown engine type (${engineType})`;
    }
};

class EngineFactory {
    constructor(engineType, domNode, gameConfig, customEngine) {
        this.engine = chooseEngine(engineType, customEngine);
        this.engine.init(domNode, gameConfig);
    }

    drawPoint(snakeConfig, color = snakeConfig.color) {
        this.engine.drawPoint(snakeConfig, color);

    }

    drawCollision(snakeConfig) {
        this.engine.drawPoint(snakeConfig, snakeConfig.collisionColor);
    }

    clear() {
        this.engine.clear();
    }
}

EngineFactory.engineTypes = {
    svg: 'svg',
    canvas: 'canvas',
    custom: 'custom'
};

export default EngineFactory;