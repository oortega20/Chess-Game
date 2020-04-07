var boardCanvas = document.getElementById("board");
var ctx = boardCanvas.getContext("2d");

var piecesCanvas = document.getElementById("pieces");
var pctx = piecesCanvas.getContext("2d");

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
        
        canvas.lineWidth = 2;
        canvas.beginPath();
        canvas.lineTo(xPos + 4, yPos + 6);
        canvas.lineTo(xPos - 4, yPos + 6)
        canvas.lineTo(xPos - 4, yPos + 8);
        canvas.lineTo(xPos + 4, yPos + 8);
        canvas.lineTo(xPos + 4, yPos + 6);
        canvas.stroke();
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
    
    static getCoords(xPos, yPos) {
        return [xPos + 20, yPos + 16];
    }
    
    getCoords(xPos, yPos) {
        return [xPos + 20, yPos + 16];
    }
    
    getPotentialTiles(row,  col, gameState) {
        var potentialTiles = [];
        var twoSpaces = [];
        var oneSpace = [];
        var leftCapture = [];
        var rightCapture = [];
        if(this.color == "white") {
            twoSpaces = [row + 2, col];
            oneSpace = [row + 1, col];
            leftCapture = [row + 1, col - 1];
            rightCapture = [row + 1, col + 1];
        } else {
            twoSpaces = [row - 2, col];
            oneSpace = [row - 1, col];
            leftCapture = [row - 1, col - 1];
            rightCapture = [row - 1, col + 1];
        }
        // TODO: check the logic for this bad boy.
        if(gameState.isEnPassant()) {
            this.runEnPassentChecks(leftCapture, rightCapture, gameState, potentialTiles)
        }
        this.runOtherChecks(oneSpace, twoSpaces, leftCapture, rightCapture, gameState, potentialTiles);
        return potentialTiles;
        
    }
}