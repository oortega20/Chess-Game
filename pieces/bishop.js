//TODO: look at the logic for castling once more. From what I can see capturing is correct now.
var boardCanvas = document.getElementById("board");
var ctx = boardCanvas.getContext("2d");

var piecesCanvas = document.getElementById("pieces");
var pctx = piecesCanvas.getContext("2d");

class Bishop extends Piece {
    render() {
        var xPos = this.xPos;
        var yPos = this.yPos;
        var canvas = this.type;
        var topR = 1;
        var headR = 9.5;
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
        canvas.moveTo(xPos - 7, yPos + 2 * headR + 2 * topR);
        canvas.lineTo(xPos + 7, yPos + 2 * headR + 2 * topR);
        canvas.lineTo(xPos + 7, yPos + 2 * headR + 2 * topR + 4);
        canvas.lineTo(xPos - 7, yPos + 2 * headR + 2 * topR + 4);
        canvas.lineTo(xPos - 7, yPos + 2 * headR + 2 * topR);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.beginPath();
        canvas.moveTo(xPos - 2, yPos + 2 * headR + 2 * topR + 5);
        canvas.lineTo(xPos + 2, yPos + 2 * headR + 2 * topR + 5);
        canvas.lineTo(xPos + 2, yPos + 2 * headR + 2 * topR + 18);
        canvas.lineTo(xPos - 2, yPos + 2 * headR + 2 * topR + 18);
        canvas.lineTo(xPos - 2, yPos + 2 * headR + 2 * topR + 5);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
         
        canvas.beginPath();
        canvas.arc(xPos , yPos + 2 * headR + 2 * topR + 36, 17, (12 / 10) * Math.PI, (18 / 10) * Math.PI);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.lineWidth = 2;
        canvas.beginPath();
        canvas.moveTo(xPos - 15, yPos + 47);
        canvas.lineTo(xPos + 15, yPos + 47);
        canvas.stroke();
    }
    
    static getCoords(xPos, yPos) {
        return [xPos + 20, yPos - 2];
    }
    
    getCoords(xPos, yPos) {
        return [xPos + 20, yPos - 2];
    }
    
    getPotentialTiles(row,  col, gameState) {
        var potentialTiles = [];
        this.getSquares(row, col, -1, -1, potentialTiles, gameState);
        this.getSquares(row, col, -1, 1, potentialTiles, gameState);
        this.getSquares(row, col, 1, -1, potentialTiles, gameState);
        this.getSquares(row, col, 1, 1, potentialTiles, gameState);
        return potentialTiles;
    }
}