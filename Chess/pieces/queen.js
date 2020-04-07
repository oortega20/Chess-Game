//TODO: look at the logic for castling once more. From what I can see capturing is correct now.
var boardCanvas = document.getElementById("board");
var ctx = boardCanvas.getContext("2d");

var piecesCanvas = document.getElementById("pieces");
var pctx = piecesCanvas.getContext("2d");

class Queen extends Piece {
    render() {
        var xPos = this.xPos;
        var yPos = this.yPos;
        var lineWidth = 3;
        var canvas = this.type;
        var jewelRad = 1.5;
        var crownWidth = 25;
        var crownHeight = 12;
        
        canvas.lineWidth = lineWidth;
        canvas.strokeStyle = this.outline;
        canvas.fillStyle = this.color;
        
        canvas.beginPath();
        canvas.arc(xPos, yPos, jewelRad, 0, 2 * Math.PI);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.beginPath();
        canvas.arc(((2 * xPos) + crownWidth) / 2, yPos, jewelRad, 0, 2 * Math.PI);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.beginPath();
        canvas.arc(xPos + crownWidth, yPos, jewelRad, 0, 2 * Math.PI);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.beginPath();
        canvas.moveTo(xPos, yPos + (2 * jewelRad));
        canvas.lineTo(xPos, yPos + crownHeight);
        canvas.lineTo(xPos + crownWidth, yPos + crownHeight);
        canvas.lineTo(xPos + crownWidth, yPos + (2 * jewelRad));
        canvas.lineTo(xPos + ((3 / 4) * crownWidth), yPos + (crownHeight / 2));
        canvas.lineTo(xPos + ((1 / 2) * crownWidth),
                      yPos + (2 * jewelRad));
        canvas.lineTo(xPos + ((1 / 4) * crownWidth),
                      yPos + (crownHeight / 2));
        canvas.lineTo(xPos, yPos + (2 * jewelRad));
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.beginPath();
        canvas.moveTo(xPos, yPos + crownHeight);
        canvas.lineTo(xPos + 3, yPos + crownHeight + 4);
        canvas.lineTo(xPos + crownWidth - 3, yPos + crownHeight + 4);
        canvas.lineTo(xPos + crownWidth, yPos + crownHeight);
        canvas.lineTo(xPos, yPos + crownHeight);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.beginPath();
        canvas.moveTo(xPos + 3, yPos + crownHeight + 4);
        canvas.lineTo(xPos + 3, yPos + crownHeight + 30);
        canvas.lineTo(xPos + crownWidth - 3, yPos + crownHeight + 30);
        canvas.lineTo(xPos + crownWidth - 3, yPos + crownHeight + 4);
        canvas.lineTo(xPos + 3, yPos + crownHeight + 4);
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
        this.getSquares(row, col, -1, 0, potentialTiles,gameState);
        this.getSquares(row, col, 1, 0, potentialTiles, gameState);
        this.getSquares(row, col, 0, -1, potentialTiles, gameState);
        this.getSquares(row, col, 0, 1, potentialTiles, gameState);
        this.getSquares(row, col, -1, -1, potentialTiles, gameState);
        this.getSquares(row, col, -1, 1, potentialTiles, gameState);
        this.getSquares(row, col, 1, -1, potentialTiles, gameState);
        this.getSquares(row, col, 1, 1, potentialTiles, gameState);
        return potentialTiles;            
        
    }
    
    static getCoords(xPos, yPos){
        return [xPos + 8, yPos];
    }
    getCoords(xPos, yPos) {
        return [xPos + 8, yPos];
    }
}