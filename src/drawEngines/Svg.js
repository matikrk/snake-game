import drawEngineTypes from './drawEngineTypes';

class Svg {
    constructor(boardConfig) {
        this.domElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.domElement.setAttribute('width', boardConfig.x.toString());
        this.domElement.setAttribute('height', boardConfig.y.toString());
    }

    drawPoint({x, y, r, color}) {
        const circleElem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circleElem.setAttribute('cx', x.toString());
        circleElem.setAttribute('cy', y.toString());
        circleElem.setAttribute('r', r.toString());
        circleElem.setAttribute('style', `fill:${color}`);
        this.domElement.appendChild(circleElem);
    }

    clear() {
        [...this.domElement.childNodes].forEach(point => point.parentNode.removeChild(point));
    }

    static getEngineType() {
        return drawEngineTypes.svg;
    }

    getDomElement() {
        return this.domElement;
    }
}

export default Svg;