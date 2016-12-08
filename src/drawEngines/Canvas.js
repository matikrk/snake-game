import drawEngineTypes from './drawEngineTypes';
class Canvas {
    constructor(boardConfig) {
        this.domElement = document.createElement('canvas');
        this.domElement.setAttribute('width', boardConfig.x.toString());
        this.domElement.setAttribute('height', boardConfig.y.toString());
    }

    drawPoint({x, y, r, color}) {
        const ctx = this.domElement.getContext('2d');
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
    }

    clear() {
        const ctx = this.domElement.getContext('2d');
        ctx.clearRect(0, 0, this.domElement.width, this.domElement.height);
    }

    static getEngineType() {
        return drawEngineTypes.canvas;
    }

    getDomElement() {
        return this.domElement;
    }

}

export default Canvas;