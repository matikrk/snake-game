class Layer {
    constructor(LayerClass, name, boardConfig, zIndex = 'initial') {
        this.name = name;
        this.layer = new LayerClass(boardConfig);

        this.setInitialStyles(zIndex);
    }

    setInitialStyles(zIndex) {
        this.getDomElement().setAttribute('style', 'position:absolute;');
        this.setZIndex(zIndex);
        this.getDomElement().setAttribute('data-layerName', this.name);
    }

    setZIndex(zIndex) {
        this.getDomElement().style.zIndex = zIndex;
    }

    getLayerType() {
        return this.layer.getEngineType();
    }

    getDomElement() {
        return this.layer.getDomElement();
    }

    drawPoint(point) {
        this.layer.drawPoint(point);
    }

    clear() {
        this.layer.clear();
    }
}


export default Layer;