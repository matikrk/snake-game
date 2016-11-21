const svgBoard = document.getElementById('svg-board');
const svgElem = document.getElementById('snake-head');

let fi = Math.PI;

const getFi = function () {
    return fi;
};

const board = {x: 400, y: 400};

const rotationAngle= 0.07;
const rotateLeft = function () {
    fi -= rotationAngle;
};
const rotateRight = function () {
    fi += rotationAngle;
};

const move = function (step = 1) {
    const oldNode = svgElem.cloneNode(true);
    oldNode.removeAttribute('id');
    oldNode.classList.remove('snake-head');
    oldNode.classList.add('snake-tail');
    svgBoard.appendChild(oldNode);

    const x = svgElem.getAttribute('x');
    const y = svgElem.getAttribute('y');

    let newX = (+x + step * Math.cos(getFi())) % board.x;
    newX = newX <= 0 ? board.x - newX : newX;
    let newY = (+y + step * Math.sin(getFi())) % board.y;
    newY = newY <= 0 ? board.y - newY : newY;

    svgElem.setAttribute('x', newX.toString());
    svgElem.setAttribute('y', newY.toString());
};

export default {move, rotateLeft, rotateRight};
