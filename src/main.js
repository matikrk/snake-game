const svgBoard = document.getElementById('svg-board');
const svgElem = document.getElementById('snake-head');

let fi = Math.PI;

const getFi = function () {
    return fi;
};

const board = {x: 400, y: 400};

const rotationAngle = 0.07;

const rotateLeft = function () {
    fi -= rotationAngle;
};
const rotateRight = function () {
    fi += rotationAngle;
};

const calculateNextStep = function (x, y, step = 1) {
    let newX = (x + step * Math.cos(getFi())) % board.x;
    newX = newX <= 0 ? board.x - newX : newX;
    let newY = (y + step * Math.sin(getFi())) % board.y;
    newY = newY <= 0 ? board.y - newY : newY;

    return {
        x: newX,
        y: newY,
    }
};

const drawTailSVG = function () {
    const oldNode = svgElem.cloneNode(true);
    oldNode.removeAttribute('id');
    oldNode.classList.remove('snake-head');
    oldNode.classList.add('snake-tail');
    svgBoard.appendChild(oldNode);
};

const moveSVG = function (step = 1) {
    drawTailSVG();

    const oldX = svgElem.getAttribute('x');
    const oldY = svgElem.getAttribute('y');

    const {x, y} = calculateNextStep(+oldX, +oldY, step);


    svgElem.setAttribute('x', x.toString());
    svgElem.setAttribute('y', y.toString());
};

const move = function () {
    moveSVG();
};


export default {move, rotateLeft, rotateRight};
