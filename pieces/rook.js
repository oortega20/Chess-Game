//TODO: look at the logic for castling once more. From what I can see capturing is correct now.
var boardCanvas = document.getElementById("board");
var ctx = boardCanvas.getContext("2d");

var piecesCanvas = document.getElementById("pieces");
var pctx = piecesCanvas.getContext("2d");

class Rook extends Piece {
    render() {
        var xPos = this.xPos;
        var yPos = this.yPos;
        var lineWidth = 3;
        var canvas = this.type;
        
        canvas.lineWidth = lineWidth;
        canvas.strokeStyle = this.outline;
        canvas.fillStyle = this.color;
        
        canvas.beginPath();
        canvas.moveTo(xPos, yPos);
        canvas.lineTo(xPos + 6, yPos);
        canvas.lineTo(xPos + 6, yPos + 3);
        canvas.lineTo(xPos + 10, yPos + 3);
        canvas.lineTo(xPos + 10, yPos);
        canvas.lineTo(xPos + 15, yPos);
        canvas.lineTo(xPos + 15, yPos + 3);
        canvas.lineTo(xPos + 20, yPos + 3);
        canvas.lineTo(xPos + 20, yPos);
        canvas.lineTo(xPos + 26, yPos);
        canvas.lineTo(xPos + 26, yPos + 3);
        canvas.lineTo(xPos + 26, yPos + 8);
        canvas.lineTo(xPos, yPos + 8);
        canvas.lineTo(xPos, yPos);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.lineWidth = 2;
        canvas.beginPath();
        canvas.moveTo(xPos, yPos + 8);
        canvas.lineTo(xPos + 26, yPos + 8);
        canvas.lineTo(xPos + 23, yPos + 12);
        canvas.lineTo(xPos + 3, yPos + 12);
        canvas.lineTo(xPos, yPos + 8);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.lineWidth = 3;
        canvas.beginPath();
        canvas.moveTo(xPos + 3, yPos + 13);
        canvas.lineTo(xPos + 23, yPos + 13);
        canvas.lineTo(xPos + 23, yPos + 43);
        canvas.lineTo(xPos + 3, yPos + 43);
        canvas.lineTo(xPos + 3, yPos + 13);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.beginPath();
        canvas.arc(xPos + 13 , yPos + 55, 18, (12 / 10) * Math.PI, (18 / 10) * Math.PI);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.lineWidth = 2;
        canvas.beginPath();
        canvas.moveTo(xPos - 4, yPos + 45);
        canvas.lineTo(xPos + 30, yPos + 45);
        canvas.stroke();
    }
    
    getPotentialTiles(row,  col, gameState) {
        var potentialTiles = [];
        this.getSquares(row, col, -1, 0, potentialTiles, gameState);
        this.getSquares(row, col, 1, 0, potentialTiles, gameState);
        this.getSquares(row, col, 0, -1, potentialTiles, gameState);
        this.getSquares(row, col, 0, 1, potentialTiles, gameState);
        return potentialTiles;
    }
    
    static getCoords(xPos, yPos){
        return [xPos + 8, yPos];
    }
    
    getCoords(xPos, yPos) {
        return [xPos + 8, yPos];
    }
}