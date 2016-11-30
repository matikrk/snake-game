class Canvas {
    init(domNode, gameConfig) {
        this.board = document.createElement('canvas');
        this.board.setAttribute('style', 'border:1px solid');
        this.board.setAttribute('width', gameConfig.board.x.toString());
        this.board.setAttribute('height', gameConfig.board.y.toString());
        domNode.appendChild(this.board);

    }

    drawPoint({x,y,r,color}) {
        const ctx = this.board.getContext('2d');
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
    }

    clear() {
        const ctx = this.board.getContext('2d');
        ctx.clearRect(0, 0, this.board.width, this.board.height);
    }
}

export default Canvas;