class Layer {
    constructor(name, boardConfig, zIndex) {
        this.name = name;
        this.layer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.layer.setAttribute('style', 'border:1px solid; position:absolute;');
        this.setZIndex(zIndex);
        this.layer.setAttribute('width', boardConfig.x.toString());
        this.layer.setAttribute('height', boardConfig.y.toString());
    }

    setZIndex(zIndex) {
        this.layer.style.zIndex = zIndex;
    }

    drawPoint({x, y, r, color}) {
        const circleElem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circleElem.setAttribute('cx', x.toString());
        circleElem.setAttribute('cy', y.toString());
        circleElem.setAttribute('r', r.toString());
        circleElem.setAttribute('style', `fill:${color}`);
        this.layer.appendChild(circleElem);
    }

    clear() {
        [...this.layer.childNodes].forEach(point => point.parentNode.removeChild(point));
    }
}

class Svg {
    init(domNode, gameConfig) {
        this.parentNode = domNode;
        domNode.setAttribute('style', `width:${gameConfig.board.x}px; height: ${gameConfig.board.y}px;`);
        this.boardConfig = gameConfig.board;
        this.layers = [];
    }

    addLayer(name, zIndex) {
        const layer = new Layer(name, this.boardConfig, zIndex);
        this.layers.push(layer);
        this.parentNode.appendChild(layer.layer);
        return layer;
    }

    deleteLayer(name) {
        const layerToDelete = this.getLayer(name);
        this.parentNode.removeChild(layerToDelete);
        this.layers = this.layers.filter(layer => layer !== layerToDelete);
    }

    getLayer(name) {
        return this.layers.find(layer => layer.name === name);

    }

}

export default Svg;