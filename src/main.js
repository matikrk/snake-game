const config = {
    startFi: Math.PI,
    board: {x: 400, y: 400},
    startPoint: {x: 200, y: 200},
    circleR: 5,
    rotationAngle: 0.07,
    pointDensity:   2, // 3.9 max, coz with higher density rotating causes collision,
    color: '#ff0000',
    collisionColor: '#000000',
};

let fi = config.startFi;
let headPoint = config.startPoint;
const occupiedPoints = [headPoint];

const calculateNextStep = function (x, y) {
    const step = config.circleR / config.pointDensity;
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
    drawPoint (color = config.color)   {
        const circleElem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circleElem.setAttribute('cx', headPoint.x.toString());
        circleElem.setAttribute('cy', headPoint.y.toString());
        circleElem.setAttribute('r', config.circleR.toString());
        circleElem.setAttribute('style', `fill:${color}`);
        this.board.appendChild(circleElem);
    }
    ,
    drawCollision ()    {
        this.drawPoint(config.collisionColor);
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
    }, drawPoint (color = config.color) {
        const ctx = this.board.getContext('2d');
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(headPoint.x, headPoint.y, config.circleR, 0, 2 * Math.PI);
        ctx.fill();
    },
    drawCollision (){
        this.drawPoint(config.collisionColor);
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
    const stepsToOmit = Math.ceil(2 * config.pointDensity - 1);
    const omitFromIndex = occupiedPoints.length - stepsToOmit;

    const approximationError = 0.1 * config.circleR;
    const circleDiameter = 2 * config.circleR - approximationError;

    return occupiedPoints
        .filter((point, i) => i < omitFromIndex)
        .find(function (point) {
            const distance = Math.sqrt(Math.pow(point.x - headPoint.x, 2) + Math.pow(point.y - headPoint.y, 2));
            return distance < circleDiameter;
        });
};
let collisionOccurred = false;
const move = function () {
    if (!collisionOccurred) {
        headPoint = calculateNextStep(headPoint.x, headPoint.y);
        const collisionPoint = checkCollision();
        if (collisionPoint) {
            fireEvent('collision');
            collisionOccurred = true;
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
const reset = function () {
    collisionOccurred = false;
    occupiedPoints.length = 0;

    svg.clear();
    canvas.clear();
};
const fireEvent=function(eventName,data){
    listeners.forEach(listener=>listener.event===eventName?listener.func(data):null);
};

const listeners=[];
const eventListener= function(eventName,callback){
listeners.push({event:eventName,func:callback});
};

init();

export default {move, rotateLeft, rotateRight, reset, eventListener};
