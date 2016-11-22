const svgBoard = document.getElementById('svg-board');
const canvas = document.getElementById('canvas-board');

const config = {
    startFi: Math.PI,
    board: {x: 400, y: 400},
    startPoint: {x: 200, y: 200},
    circleR: 1,
    rotationAngle: 0.07,
};


let fi = config.startFi;
let headPoint = config.startPoint;
const ocupatedPoints = [headPoint];

const calculateNextStep = function (x, y, step = 1) {
    let newX = (x + step * Math.cos(fi)) % config.board.x;
    newX = newX <= 0 ? config.board.x - newX : newX;
    let newY = (y + step * Math.sin(fi)) % config.board.y;
    newY = newY <= 0 ? config.board.y - newY : newY;

    return {
        x: newX,
        y: newY,
    }
};

const init = function () {
    initSVG();
    initCanvas();
};

const initSVG = function () {
    canvas.setAttribute('width', config.board.x.toString());
    canvas.setAttribute('height', config.board.y.toString());
    drawSVGPoint();
};


const initCanvas = function () {
    svgBoard.setAttribute('width', config.board.x.toString());
    svgBoard.setAttribute('height', config.board.y.toString());
    drawCanvasPoint();
};


const rotateLeft = function () {
    fi -= config.rotationAngle;
};
const rotateRight = function () {
    fi += config.rotationAngle;
};


const drawCanvasPoint = function () {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(headPoint.x, headPoint.y, config.circleR, 0, 2 * Math.PI);
    ctx.fill();
};
const drawSVGPoint = function () {
    const circleElem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circleElem.setAttribute('cx', headPoint.x.toString());
    circleElem.setAttribute('cy', headPoint.y.toString());
    circleElem.setAttribute('r', config.circleR.toString());
    circleElem.setAttribute('style', 'fill:rgb(255,0,0)');
    svgBoard.appendChild(circleElem);
};
const checkCollision = function () {
    const        approximationError = 0.00000001;
    return ocupatedPoints.find(function (point) {
        const distance = Math.sqrt(Math.pow(point.x - headPoint.x, 2) + Math.pow(point.y - headPoint.y, 2)) + approximationError;
        return distance < config.circleR;
    });
};

const move = function (step = 1) {
    headPoint = calculateNextStep(headPoint.x, headPoint.y, step);
    const collisionPoint = checkCollision();

    if (collisionPoint) {
        console.log(`Collision in point {${headPoint.x},${headPoint.y}` );
    } else {
        ocupatedPoints.push(headPoint);
        draw();
    }
};
const draw = function () {
    drawCanvasPoint();
    drawSVGPoint();
};
init();

export default {move, rotateLeft, rotateRight};
