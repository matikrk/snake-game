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
        const functions = ['init', 'addLayer', 'deleteLayer', 'getLayer'];
        functions.forEach(
            function (fncName) {
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

    addLayer(name, zIndex = 1) {
        return this.engine.addLayer(name, zIndex);
    }

    deleteLayer(name) {
        this.engine.deleteLayer(name);
    }

    getLayer(name) {
        this.engine.getLayer(name);
    }
}

DrawEngineFactory.engineTypes = {
    svg: 'svg',
    canvas: 'canvas',
    custom: 'custom'
};

export default DrawEngineFactory;