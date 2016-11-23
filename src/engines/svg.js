const svg = {
    board: null,
    gameConfig: null,
    init (domNode, gameConfig) {
        this.board = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.board.setAttribute('style', 'border:1px solid');
        this.board.setAttribute('width', gameConfig.board.x.toString());
        this.board.setAttribute('height', gameConfig.board.y.toString());
        domNode.appendChild(this.board);

    },
    drawPoint (snakeConfig, color = snakeConfig.color)   {
        const circleElem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circleElem.setAttribute('cx', snakeConfig.headPoint.x.toString());
        circleElem.setAttribute('cy', snakeConfig.headPoint.y.toString());
        circleElem.setAttribute('r', snakeConfig.circleR.toString());
        circleElem.setAttribute('style', `fill:${color}`);
        this.board.appendChild(circleElem);
    }
    ,
    drawCollision (snakeConfig)    {
        this.drawPoint(snakeConfig, snakeConfig.collisionColor);
    },
    clear (){
        [...this.board.childNodes].forEach(point => point.parentNode.removeChild(point));
    },
};

module.exports = svg;