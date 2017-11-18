
var c = document.getElementById("board");
var ctx = c.getContext("2d");
// my decorative pawns
var dPawns = [];
    dPawns [0] = new pawnObj ("white", 450, 75);
    dPawns [1] = new pawnObj ("black", 500, 75);
    dPawns [2] = new pawnObj ("white", 550, 75);
    dPawns [3] = new pawnObj ("black", 880, 75);
    dPawns [4] = new pawnObj ("white", 830, 75);
    dPawns [5] = new pawnObj ("black", 780, 75);
// letter number array

var gridLN = ["A", "B", "C", "D", "E", "F", "G", "H", "8", "7", "6", "5", "4", "3", "2", "1"];

// renders board
function board (){
    var square = 60;
    var board = 8 * square;
    var topBorder = 150;
    var leftBorder = 425;
    var letterSpace = 8;
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
                ctx.fillText (gridLN [i], leftBorder + (square * i) + (square / 2), topBorder + letterSpace);
                ctx.fillText (gridLN [i], leftBorder + (square * i) + (square / 2), topBorder + board);
            } else {
                ctx.fillText (gridLN [i], leftBorder, topBorder + (square * (i - 8)) + (square / 2));
                ctx.fillText (gridLN [i], leftBorder + board - letterSpace, topBorder + (square * (i - 8)) + (square / 2));
            }
        }
}
// creates my title
function title () {
    var leftBorder = 425;
    var topBorder = 245;
    var board = 480;
    var xPos = 580;
    var yPos = 110;
    
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
    for (i = 0; i < 6; i++) {
        renderPawns(dPawns[i])
    }
}

// pawn object constructor
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
// generates my Decorative Pawns for title.

function renderPawns (pawnObj) {
    var tRadius = 6;
    var bRadius = 16;
    var bodyW = 4;
    var bodyH = 15;
    var xPos = pawnObj.xPos;
    var yPos = pawnObj.yPos;
    var lineWidth = ctx.lineWidth;
    ctx.strokeStyle = pawnObj.outline;
    ctx.fillStyle = pawnObj.color;
    ctx.lineWidth = 2;
   
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

board();
title();

  
