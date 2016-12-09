import Svg from './Svg';
import Canvas from './Canvas';
import drawEngineTypes from './drawEngineTypes';
import Layer from './Layer';

class DrawEngine {
    constructor(domNode, board) {
        this.parentNode = domNode;
        domNode.setAttribute('style',
            `width:${board.x}px; height: ${board.y}px;border:1px solid; `
        );
        this.boardConfig = board;
        this.layers = [];
    }

    addLayer(name, zIndex, engineType = DrawEngine.engineTypes.canvas, CustomEngine) {
        const LayerClass = chooseEngine(engineType, CustomEngine);
        const layer = new Layer(LayerClass, name, this.boardConfig, zIndex);
        this.layers.push(layer);
        this.parentNode.appendChild(layer.getDomElement());
        return layer;
    }

    deleteLayer(name) {
        const layerToDelete = this.getLayer(name);
        this.parentNode.removeChild(layerToDelete.getDomElement());
        this.layers = this.layers.filter(layer => layer !== layerToDelete);
    }

    getLayer(name) {
        return this.layers.find(layer => layer.name === name);
    }
}

DrawEngine.engineTypes = drawEngineTypes;


const chooseEngine = function (engineType, CustomEngine) {
    switch (engineType) {
        case drawEngineTypes.svg:
            return Svg;
        case drawEngineTypes.canvas:
            return Canvas;
        case drawEngineTypes.custom:
            checkCustomEngine(CustomEngine);
            return CustomEngine;
        default:
            throw `Unknown draw engine type (${engineType})`;
    }
};

const checkCustomEngine = function (CustomEngine) {
    if (CustomEngine) {
        const functions = ['drawPoint', 'clear', 'getDomElement', 'getLayerType'];
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

export default DrawEngine;
