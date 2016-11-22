const config = {
    startFi: Math.PI,
    board: {x: 400, y: 400},
    startPoint: {x: 200, y: 200},
    circleR: 3,
    rotationAngle: 0.07,
};
const step = config.circleR;

let fi = config.startFi;
let headPoint = config.startPoint;
const occupiedPoints = [headPoint];

const calculateNextStep = function (x, y) {
    let newX = (x + step * Math.cos(fi)) % config.board.x;
    newX = newX <= 0 ? config.board.x - newX : newX;
    let newY = (y + step * Math.sin(fi)) % config.board.y;
    newY = newY <= 0 ? config.board.y - newY : newY;

    return {
        x: newX,
        y: newY,
    };
};

const init = function () {
    svg.init();
    canvas.init();
};
const svg = {
    board: document.getElementById('svg-board'),
    init () {
        this.board.setAttribute('width', config.board.x.toString());
        this.board.setAttribute('height', config.board.y.toString());
        this.drawPoint();
    },
    drawPoint ()   {
        const circleElem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circleElem.setAttribute('cx', headPoint.x.toString());
        circleElem.setAttribute('cy', headPoint.y.toString());
        circleElem.setAttribute('r', config.circleR.toString());
        circleElem.setAttribute('style', 'fill:rgb(255,0,0)');
        this.board.appendChild(circleElem);
    }
    ,
    drawCollision ()    {
        const circleElem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circleElem.setAttribute('cx', headPoint.x.toString());
        circleElem.setAttribute('cy', headPoint.y.toString());
        circleElem.setAttribute('r', config.circleR.toString());
        circleElem.setAttribute('style', 'fill:rgb(0,0,0)');
        this.board.appendChild(circleElem);
    },
    clear (){
        [...this.board.childNodes].forEach(point => point.parentNode.removeChild(point))
    },
};

const canvas = {
    board: document.getElementById('canvas-board'),
    init () {
        this.board.setAttribute('width', config.board.x.toString());
        this.board.setAttribute('height', config.board.y.toString());
        this.drawPoint();
    }, drawPoint () {
        const ctx = this.board.getContext('2d');
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.arc(headPoint.x, headPoint.y, config.circleR, 0, 2 * Math.PI);
        ctx.fill();
    },
    drawCollision (){
        const ctx = this.board.getContext('2d');
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(headPoint.x, headPoint.y, config.circleR, 0, 2 * Math.PI);
        ctx.fill();
    },
    clear (){
        const ctx = this.board.getContext('2d');
        ctx.clearRect(0, 0, this.board.width, this.board.height);
    },
};

const rotateLeft = function () {
    fi -= config.rotationAngle;
};
const rotateRight = function () {
    fi += config.rotationAngle;
};


const checkCollision = function () {
    const approximationError = 0.1 * config.circleR;
    return occupiedPoints.filter((point, i, a) => i != a.length - 1).find(function (point) {
        const distance = Math.sqrt(Math.pow(point.x - headPoint.x, 2) + Math.pow(point.y - headPoint.y, 2));
        return distance + approximationError < 2 * config.circleR;
    });
};
let collisionOccurred = false;
const move = function () {
    if (!collisionOccurred) {
        headPoint = calculateNextStep(headPoint.x, headPoint.y);
        const collisionPoint = checkCollision();

        if (collisionPoint) {
            collisionOccurred=true;
            console.log(`Collision in point {${headPoint.x},${headPoint.y}`);
            drawCollision();
        } else {
            occupiedPoints.push(headPoint);
            drawNextStep();
        }
    }
};
const drawNextStep = function () {
    setTimeout(() => {
        canvas.drawPoint();
        svg.drawPoint();
    }, 0)
};

const drawCollision = function () {


    setTimeout(() => {
        canvas.drawCollision();
        svg.drawCollision();
    }, 0)

};
const reset = function(){
    collisionOccurred=false;
    occupiedPoints.length=0;

    svg.clear();
    canvas.clear();
};

init();

export default {move, rotateLeft, rotateRight, reset};
