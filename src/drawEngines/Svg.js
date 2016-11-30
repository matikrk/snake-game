class Svg {
    init(domNode, gameConfig) {
        domNode.setAttribute('style',`width:${gameConfig.board.x}px; height: ${gameConfig.board.y}px;`);
        this.board = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.board.setAttribute('style', 'border:1px solid; position:absolute;');
        this.board.setAttribute('width', gameConfig.board.x.toString());
        this.board.setAttribute('height', gameConfig.board.y.toString());
        domNode.appendChild(this.board);

    }

    drawPoint({x,y,r,color}) {
        const circleElem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circleElem.setAttribute('cx', x.toString());
        circleElem.setAttribute('cy', y.toString());
        circleElem.setAttribute('r', r.toString());
        circleElem.setAttribute('style', `fill:${color}`);
        this.board.appendChild(circleElem);
    }

    clear() {
        [...this.board.childNodes].forEach(point => point.parentNode.removeChild(point));
    }
}

export default Svg;