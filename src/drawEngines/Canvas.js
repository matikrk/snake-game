class Layer {
    constructor(name, boardConfig, zIndex) {
        this.name = name;
        this.layer = document.createElement('canvas');
        this.layer.setAttribute('style', 'position:absolute;');
        this.setZIndex(zIndex);
        this.layer.setAttribute('width', boardConfig.x.toString());
        this.layer.setAttribute('height', boardConfig.y.toString());
    }

    setZIndex(zIndex) {
        this.layer.style.zIndex = zIndex;
    }

    drawPoint({x, y, r, color}) {
        const ctx = this.layer.getContext('2d');
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
    }

    clear() {
        const ctx = this.layer.getContext('2d');
        ctx.clearRect(0, 0, this.layer.width, this.layer.height);
    }
}

class Canvas {
    init(domNode, gameConfig) {
        this.parentNode = domNode;
        domNode.setAttribute('style',
            `width:${gameConfig.board.x}px; height: ${gameConfig.board.y}px;border:1px solid; `
        );
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

export default Canvas;