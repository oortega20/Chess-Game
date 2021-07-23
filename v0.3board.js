// the different canvases
var boardCanvas = document.getElementById("board");
var ctx = boardCanvas.getContext("2d");

var piecesCanvas = document.getElementById("pieces");
var pctx = piecesCanvas.getContext("2d");

var timerCanvas = document.getElementById("timer");
var tctx = timerCanvas.getContext("2d");

// piece constructor that requires  color (white or black) and its coordinates
class Piece {
    constructor (color, xPos, yPos, type) {
        this.color = color;
        this.outline;
        if (this.color === "white") {
            this.outline = "black";
        } else {
            this.outline = "grey";
        }
        this.xPos = xPos;
        this.yPos = yPos;
        this.type = type;
    }
}

// subclasses for different pieces
class Pawn extends Piece {
    render() {
        var tRadius = 6;
        var bRadius = 16;
        var bodyW = 4;
        var bodyH = 15;
        var lineWidth = 3;
        var xPos = this.xPos;
        var yPos = this.yPos;
        var canvas = this.type;
        canvas.lineWidth = lineWidth;
        canvas.strokeStyle = this.outline;
        canvas.fillStyle = this.color;

        canvas.beginPath();
        canvas.arc(xPos, yPos - (1 / 3), tRadius, 0, 2 * Math.PI);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();

        canvas.beginPath();
        canvas.strokeRect(xPos - (bodyW / 2), yPos +  tRadius + lineWidth, bodyW, bodyH);
        canvas.stroke();

        canvas.fillRect(xPos - (bodyW / 2), yPos + tRadius, bodyW, bodyH);
        canvas.fill();
        canvas.closePath();

        canvas.beginPath();
        canvas.arc(xPos, yPos + tRadius + bodyH + bRadius, bRadius, (120 / 100) * Math.PI,
                (180 / 100) * Math.PI);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.lineWidth = 2;
        canvas.beginPath();
        canvas.moveTo(xPos - bRadius, yPos + tRadius + bodyH + ((24 / 50) * bRadius));
        canvas.lineTo(xPos + bRadius, yPos + tRadius + bodyH + ((24 / 50) * bRadius));
        canvas.stroke();
        canvas.closePath();
    } 
}

class Knight extends Piece {
    render() {

        var xPos = this.xPos;
        var yPos = this.yPos;

        var lineWidth = 3;
        var shrinkingFactor = 6;
        var canvas = this.type;
        
        canvas.lineWidth = lineWidth;
        canvas.strokeStyle = this.outline;
        canvas.fillStyle = this.color;

        canvas.beginPath();
        canvas.moveTo(xPos - 5, yPos);
        canvas.lineTo(xPos - 5, yPos - (70 / shrinkingFactor));
        canvas.lineTo(xPos + (100 / shrinkingFactor), yPos - (70 / shrinkingFactor));
        canvas.lineTo(xPos + (110 / shrinkingFactor), yPos - (70 / shrinkingFactor));
        canvas.lineTo(xPos + (130 / shrinkingFactor), yPos - (105 /  shrinkingFactor));
        canvas.lineTo(xPos + (130 / shrinkingFactor), yPos + (125 / shrinkingFactor));
        canvas.lineTo(xPos + (10 / shrinkingFactor), yPos + (125 / shrinkingFactor));
        canvas.lineTo(xPos + (50 / shrinkingFactor), yPos);
        canvas.lineTo(xPos - 5, yPos);
        canvas.closePath();
        canvas.stroke()
        canvas.fill();
       
        
        canvas.beginPath();
        canvas.arc(xPos + 12, yPos + 38, 19, (12 / 10) * Math.PI, (18 / 10) * Math.PI);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.lineWidth = 2;
        canvas.beginPath();
        canvas.moveTo(xPos - 6, yPos + 27);
        canvas.lineTo(xPos + 30, yPos + 27);
        canvas.stroke();
        console.log('fix this ugly cow dog thing');
    }
}

class Bishop extends Piece {
    render() {
       
        
        var xPos = this.xPos;
        var yPos = this.yPos;
        var canvas = this.type;
        var topR = 1;
        var headR = 8;
        var lineWidth = 3;
        
        canvas.lineWidth = lineWidth;
        canvas.strokeStyle = this.outline;
        canvas.fillStyle = this.color;
        
        canvas.beginPath();
        canvas.arc(xPos, yPos, topR, 0, 2 * Math.PI);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.beginPath();
        canvas.arc(xPos, yPos + headR + topR + lineWidth / 2, headR, 0, 2 * Math.PI); 
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.lineWidth = 2;
        canvas.beginPath();
        canvas.moveTo(xPos, yPos + (3 * headR / 2) + topR);
        canvas.lineTo(xPos + (headR * (Math.sqrt(2 - Math.sqrt(3)) / 2) ) + lineWidth,
                      yPos + headR + topR + lineWidth - 
                      (headR * ((Math.sqrt(6) + Math.sqrt(2)) / 4)));
        canvas.stroke();
        
        canvas.beginPath();
        canvas.moveTo(xPos - 5, yPos + 2 * headR + 2 * topR);
        canvas.lineTo(xPos + 5, yPos + 2 * headR + 2 * topR);
        canvas.lineTo(xPos + 5, yPos + 2 * headR + 2 * topR + 2);
        canvas.lineTo(xPos - 5, yPos + 2 * headR + 2 * topR + 2);
        canvas.lineTo(xPos - 5, yPos + 2 * headR + 2 * topR);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.beginPath();
        canvas.moveTo(xPos - 2, yPos + 2 * headR + 2 * topR + 3);
        canvas.lineTo(xPos + 2, yPos + 2 * headR + 2 * topR + 3);
        canvas.lineTo(xPos + 2, yPos + 2 * headR + 2 * topR + 10);
        canvas.lineTo(xPos - 2, yPos + 2 * headR + 2 * topR + 10);
        canvas.lineTo(xPos - 2, yPos + 2 * headR + 2 * topR + 2);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
         
        canvas.beginPath();
        canvas.arc(xPos , yPos + 2 * headR + 2 * topR + 28, 17, (12 / 10) * Math.PI, (18 / 10) * Math.PI);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.lineWidth = 2;
        canvas.beginPath();
        canvas.moveTo(xPos - 15, yPos + 35);
        canvas.lineTo(xPos + 15, yPos + 35);
        canvas.stroke();
    }
}

class Rook extends Piece {
    render() {
        console.log('hi im a rook');
    }
}

class Queen extends Piece {
    render() {
        console.log('hi im a queen');
    }
}

class King extends Piece {
    render() {
        console.log('hi im a king');
    }
}

// timer constructor requires the amount of starting time and the current turn
class Timer {
    constructor(wMin, wSec, wMSec, bMin, bSec, bMsec, turn) {
        this.wMin = wMin;
        this.wSec = wSec;
        this.wMsec = wMSec
        this.bMin = bMin;
        this.bSec = bSec;
        this.bMsec = bMsec;
        this.turn = turn;
    }
}

// renders the board
function renderBoard (){
    var square = 60;
    var board = 8 * square;
    var topBorder = 150;
    var leftBorder = 425;
    var letterSpace = 10;
    var coordinates = ["A", "B", "C", "D", "E", "F", "G", "H",
                       "8", "7", "6", "5", "4", "3", "2", "1"];

    for (i = 0; i < 8; i++){
        for (j = 0; j < 8; j++){
            if ((i + j) % 2 == 0) {
                ctx.fillStyle = "white";
                ctx.fillRect( (i * square) + leftBorder, (j * square) + topBorder,
                             square, square);
            } else {
                ctx.fillStyle = "silver";
                ctx.fillRect( (i * square) + leftBorder, (j * square) + topBorder,
                             square, square);
            }
        }
    }

    ctx.fillStyle = "black";

    for (i = 0; i < 16; i++) {
        if (i < 8) {
            ctx.fillText (coordinates [i], leftBorder + (square * i) + (square / 2),
                          topBorder + letterSpace);
            ctx.fillText (coordinates [i], leftBorder + (square * i) + (square / 2),
                          topBorder + board - 5);
        } else {
            ctx.fillText (coordinates [i], leftBorder + 3,
                          topBorder + (square * (i - 8)) + (square / 2));
            ctx.fillText (coordinates [i], leftBorder + board - letterSpace,
                          topBorder + (square * (i - 8)) + (square / 2));
        }
    }

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(leftBorder, topBorder, board, board);

}

// renders the title
function renderTitle () {
    var leftBorder = 425;
    var topBorder = 245;
    var board = 480;
    var xPos = 580;
    var yPos = 110;
    var pawnArray = [];
        pawnArray [0] = new Pawn ("white", 450, 75, ctx);
        pawnArray [1] = new Pawn ("black", 500, 75, ctx);
        pawnArray [2] = new Pawn ("white", 550, 75, ctx);
        pawnArray [3] = new Pawn ("black", 880, 75, ctx);
        pawnArray [4] = new Pawn ("white", 830, 75, ctx);
        pawnArray [5] = new Pawn ("black", 780, 75, ctx);


    ctx.strokeStyle = "black";
    // for the arc on the top

    ctx.beginPath();
    ctx.arc(leftBorder + ((1 / 2) * board), topBorder, (1 / 2) * board,
            (130 / 100) * Math.PI, (170 / 100) * Math.PI);
    ctx.stroke();
    
    // for the edges

    ctx.beginPath();
    ctx.moveTo(leftBorder, 150);
    ctx.lineTo(leftBorder, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(leftBorder, 50);
    ctx.lineTo(leftBorder + 100, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(board + leftBorder, 150);
    ctx.lineTo(board + leftBorder, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(board + leftBorder, 50);
    ctx.lineTo((board + leftBorder) - 100, 50);
    ctx.stroke();
    // for the title

    ctx.font = "60px monospace";
    ctx.fillStyle = "black";
    ctx.fillText("CHESS", xPos, yPos);
    // for the pawns
    for (i = 0; i < pawnArray.length; i++){
        pawnArray[i].render();
    }
}

// renders the images for the game
function render(){
    renderBoard();
    renderTitle();

}

// creates the different timers
function oneMinGame(){
    timer = new Timer(1, 0, 0, 1, 0, 0, 'white');
    return timer
}

function fiveMinGame(){
    timer = new Timer(5, 0, 0, 5, 0, 0, 'white');
    return timer
}

function tenMinGame(){
    timer = new Timer(10, 0, 0, 10, 0, 0, 'white');
    return timer
}

function thirtyMinGame(){
    timer = new Timer(30, 0, 0, 30, 0, 0, 'white');
    return timer
}

function untimed(){
    console.log('an unlimited amount of time: no timer');
}

// starts the countdown
function startTimer(){
    var counter = setInterval(countdown, 10);
    var displayB = setInterval(displayBigTimer, 10);
    var displayT = setInterval(displayTinyTimer, 10);

    // displays the time in minutes and seconds
    function displayBigTimer(){
//        clears the timer
        var clearTimer = setTimeout(tctx.clearRect (255, 70, 135, 300), 5);

        if (timer.wMin == 0 & timer.wSec == 0 & timer.wMsec == 0 ||
            timer.bMin == 0 & timer.bSec == 0 & timer.bMsec == 0) {
            clearTimeout(clearTimer);
            tctx.font = "40px monospace";
            if (timer.wMin == 0 & timer.wSec == 0 & timer.wMsec == 0){
                tctx.fillStyle = "gray";
                tctx.fillText('You lose.', 25, 100);

                tctx.fillStyle = "black";
                tctx.fillText('You Win!', 25, 350);
            } else {
                tctx.fillStyle = "gray";
                tctx.fillText('You Win!', 25, 100);

                tctx.fillStyle = "black";
                tctx.fillText('You lose.', 25, 350);
            }
            clearInterval(displayB);
        }

        tctx.font = "40px monospace";
        tctx.fillStyle = "gray";

        if(timer.wSec < 10){
            tctx.fillText(timer.wMin + ':' + '0' + timer.wSec, 295, 100);
        } else {
            tctx.fillText (timer.wMin + ':' + timer.wSec , 295, 100);
        }

        tctx.fillStyle = "black";
        if(timer.bSec < 10) {
            tctx.fillText(timer.bMin + ':' + '0' + timer.bSec, 295, 350);
        } else {
            tctx.fillText(timer.bMin + ':' + timer.bSec, 295, 350);
        }
    }

    // displays the milliseconds
    function displayTinyTimer() {

        var clearTimer = setTimeout(tctx.clearRect(390, 70, 50, 300), 5);
        tctx.font = '14px monospace';
        if (timer.wMin == 0 & timer.wSec < 20) {
            tctx.fillStyle = 'grey';
            if (timer.wMsec < 10) {
                tctx.fillText('0' + timer.wMsec, 390, 100);
            } else {
                tctx.fillText(timer.wMsec, 390, 100);
            }
        }
        if (timer.bMin == 0 & timer.bSec < 20) {
            tctx.fillStyle = 'black';
            if (timer.bMsec < 10) {
                tctx.fillText('0' + timer.bMsec, 390, 350);
            } else {
                tctx.fillText(timer.bMsec, 390, 350);
            }
        }

    }

    // logic for the timer
    function countdown(){
        if (timer.wMin == 0 & timer.wSec == 0 & timer.wMsec == 0 ||
            timer.bMin == 0 & timer.bSec == 0 & timer.bMsec == 0) {
            clearInterval(counter);
        } else {
//            console.log(timer.wMin + ':' + timer.wSec + ':' + timer.wMsec, 'white',
//                        timer.bMin + ':' + timer.bSec + ':' + timer.bMsec, 'black');

            if (timer.turn === 'white'){
                if (timer.wMin != 0 & timer.wSec == 0 & timer.wMsec == 0) {
                    timer.wMin -= 1;
                    timer.wSec += 59;
                    timer.wMsec += 99;
                } else if (timer.wMsec == 0) {
                    timer.wSec -= 1;
                    timer.wMsec += 99;
                } else {
                    timer.wMsec -= 1;
                }
            } else {
                if (timer.bMin != 0 & timer.bSec == 0 & timer.bMsec == 0) {
                    timer.bMin -= 1;
                    timer.bSec += 59;
                    timer.bMsec += 99;
                } else if (timer.bMsec == 0) {
                    timer.bSec -= 1;
                    timer.bMsec += 99;
                } else {
                    timer.bMsec -= 1;
                }

            }

        }
    }
}

// switches whose turn it is
function switchTurn(){
    if (timer.turn === 'white'){
        timer.turn = 'black';
    } else{
        timer.turn = 'white';
    }
}

render();
var izzy = new Knight('black', 510, 180, ctx);
izzy.render();
var oscar = new Knight('white', 570, 180, ctx);
oscar.render();
var jelly = new Pawn('white', 520, 230, pctx);
jelly.render();
var bishop = new Bishop('white', 600, 230, pctx);
bishop.render();
var b = new Bishop('black', 650, 280, pctx);
b.render();

var c1 = new Rook('white', 700, 300, pctx);
var c2 = new Rook('black', 700, 300, pctx);
c1.render();