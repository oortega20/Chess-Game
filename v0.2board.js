// the different canvases
var boardCanvas = document.getElementById("board");
var ctx = boardCanvas.getContext("2d");

var scoreBoardCanvas = document.getElementById("scoreBoard");
var sctx = scoreBoardCanvas.getContext("2d");

// pawn constructor that requires pawn color (white or black) and its coordinates
function pawnObj (color, xPos, yPos) {
    this.color = color;
    this.outline;
        if (this.color === "white") {
            this.outline = "black";
        } else {
            this.outline = "grey";
        }
    this.xPos = xPos;
    this.yPos = yPos;
}

// timer constructor requires the amount of starting time and the current turn
function timerObj (wMin, wSec, wMSec, bMin, bSec, bMsec, turn){
    this.wMin = wMin;
    this.wSec = wSec;
    this.wMsec = wMSec
    this.bMin = bMin;
    this.bSec = bSec;
    this.bMsec = bMsec;
    this.turn = turn;
}

// renders the pawn when given a pawn object
function renderPawns (pawnObj) {
    var tRadius = 6;
    var bRadius = 16;
    var bodyW = 4;
    var bodyH = 15;
    var xPos = pawnObj.xPos;
    var yPos = pawnObj.yPos;
    var lineWidth = ctx.lineWidth;
    
    lineWidth = 2;
    
    ctx.strokeStyle = pawnObj.outline;
    ctx.fillStyle = pawnObj.color;
   
    ctx.beginPath();
    ctx.arc(xPos, yPos, tRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    
    ctx.beginPath();
    ctx.strokeRect(xPos - (bodyW / 2), yPos +  tRadius + lineWidth, bodyW, bodyH);
    ctx.stroke();
    
    ctx.fillRect(xPos - (bodyW / 2), yPos + tRadius, bodyW, bodyH);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(xPos, yPos + tRadius + bodyH + bRadius, bRadius, (120 / 100) * Math.PI, (180 / 100) * Math.PI);
    ctx.stroke();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(xPos - bRadius, yPos + tRadius + bodyH + ((24 / 50) * bRadius));
    ctx.lineTo(xPos + bRadius, yPos + tRadius + bodyH + ((24 / 50) * bRadius));
    ctx.stroke();
    
}

// renders the board
function renderBoard (){
    var square = 60;
    var board = 8 * square;
    var topBorder = 150;
    var leftBorder = 425;
    var letterSpace = 10;
    var coordinates = ["A", "B", "C", "D", "E", "F", "G", "H", "8", "7", "6", "5", "4", "3", "2", "1"];

    for (i = 0; i < 8; i++){
        for (j = 0; j < 8; j++){
            if ((i + j) % 2 == 0) {
                ctx.fillStyle = "silver";
                ctx.fillRect( (i * square) + leftBorder, (j * square) + topBorder, square, square);
            } else {
                ctx.fillStyle = "grey";
                ctx.fillRect( (i * square) + leftBorder, (j * square) + topBorder, square, square);
            }
        }
    }
            
    ctx.fillStyle = "black";
    
    for (i = 0; i < 16; i++) {
        if (i < 8) {
            ctx.fillText (coordinates [i], leftBorder + (square * i) + (square / 2), topBorder + letterSpace);
            ctx.fillText (coordinates [i], leftBorder + (square * i) + (square / 2), topBorder + board - 5);
        } else {
            ctx.fillText (coordinates [i], leftBorder + 3, topBorder + (square * (i - 8)) + (square / 2));
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
        pawnArray [0] = new pawnObj ("white", 450, 75);
        pawnArray [1] = new pawnObj ("black", 500, 75);
        pawnArray [2] = new pawnObj ("white", 550, 75);
        pawnArray [3] = new pawnObj ("black", 880, 75);
        pawnArray [4] = new pawnObj ("white", 830, 75);
        pawnArray [5] = new pawnObj ("black", 780, 75);
    
    ctx.strokeStyle = "black";
    // for the arc on the top    
    
    ctx.beginPath();
    ctx.arc(leftBorder + ((1 / 2) * board), topBorder, (1 / 2) * board, (130 / 100) * Math.PI, (170 / 100) * Math.PI);
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
        renderPawns(pawnArray[i]);
    }
}

// renders the images for the game
function render(){
    renderBoard();
    renderTitle();

}

// creates the different timers
function oneMinGame(){
    timer = new timerObj(1, 0, 0, 1, 0, 0, 'white');
    return timer
}

function fiveMinGame(){
    timer = new timerObj(5, 0, 0, 5, 0, 0, 'white');
    return timer
}

function tenMinGame(){
    timer = new timerObj(10, 0, 0, 10, 0, 0, 'white');
    return timer
}

function thirtyMinGame(){
    timer = new timerObj(30, 0, 0, 30, 0, 0, 'white');
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
        var clearTimer = setTimeout(sctx.clearRect (260, 70, 130, 300), 5);
        
        if (timer.wMin == 0 & timer.wSec == 0 & timer.wMsec == 0 ||
            timer.bMin == 0 & timer.bSec == 0 & timer.bMsec == 0) {
            clearTimeout(clearTimer);
            sctx.font = "40px monospace";
            if (timer.wMin == 0 & timer.wSec == 0 & timer.wMsec == 0){
                sctx.fillStyle = "gray";
                sctx.fillText('You lose.', 25, 100);
                
                sctx.fillStyle = "black";
                sctx.fillText('You Win!', 25, 350);
            } else {
                sctx.fillStyle = "gray";
                sctx.fillText('You Win!', 25, 100);
                
                sctx.fillStyle = "black";
                sctx.fillText('You lose.', 25, 350);
            }
            clearInterval(displayB);
        }

        sctx.font = "40px monospace";
        sctx.fillStyle = "gray";
    
        if(timer.wSec < 10){
            sctx.fillText(timer.wMin + ':' + '0' + timer.wSec, 300, 100);
        } else {
            sctx.fillText (timer.wMin + ':' + timer.wSec , 300, 100);
        }
    
        sctx.fillStyle = "black";
        if(timer.bSec < 10) {
            sctx.fillText(timer.bMin + ':' + '0' + timer.bSec, 300, 350);
        } else {
            sctx.fillText(timer.bMin + ':' + timer.bSec, 300, 350);
        }
    }
    
    // displays the milliseconds
    function displayTinyTimer() {

        var clearTimer = setTimeout(sctx.clearRect(390, 70, 50, 300), 5);
        sctx.font = '14px monospace';
        if (timer.wMin == 0 & timer.wSec < 20) {
            sctx.fillStyle = 'grey';
            if (timer.wMsec < 10) {
                sctx.fillText('0' + timer.wMsec, 390, 100);
            } else {
                sctx.fillText(timer.wMsec, 390, 100);
            }
        }
        if (timer.bMin == 0 & timer.bSec < 20) {
            sctx.fillStyle = 'black';
            if (timer.bMsec < 10) {
                sctx.fillText('0' + timer.bMsec, 390, 350);
            } else {
                sctx.fillText(timer.bMsec, 390, 350);
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

  
