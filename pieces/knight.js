//TODO: look at the logic for castling once more. From what I can see capturing is correct now.
var boardCanvas = document.getElementById("board");
var ctx = boardCanvas.getContext("2d");

var piecesCanvas = document.getElementById("pieces");
var pctx = piecesCanvas.getContext("2d");

class Knight extends Piece {
    render() {
        var xPos = this.xPos;
        var yPos = this.yPos;
        var lineWidth = 3;
        var canvas = this.type;
        
        canvas.lineWidth = lineWidth;
        canvas.strokeStyle = this.outline;
        canvas.fillStyle = this.color;
        canvas.beginPath();
        canvas.moveTo(xPos - 4, yPos);
        canvas.lineTo(xPos - 2 , yPos - 4);
        canvas.lineTo(xPos + 0, yPos + 2);
        canvas.lineTo(xPos + 2, yPos + 2);
        canvas.lineTo(xPos + 23, yPos + 25);
        canvas.lineTo(xPos + 17, yPos + 39);
        canvas.lineTo(xPos + 8, yPos + 33);
        canvas.lineTo(xPos + 6, yPos + 33);
        canvas.lineTo(xPos + 6, yPos + 45);
        canvas.lineTo(xPos - 14, yPos + 45);
        canvas.lineTo(xPos - 10, yPos + 33);
        canvas.lineTo(xPos - 15, yPos + 35);
        canvas.lineTo(xPos - 9, yPos + 22);
        canvas.lineTo(xPos - 14, yPos + 25);
        canvas.lineTo(xPos - 10, yPos + 15);
        canvas.lineTo(xPos - 12, yPos + 16);
        canvas.lineTo(xPos - 4, yPos);        
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.beginPath();
        canvas.arc(xPos - 3, yPos + 58, 17, (12 / 10) * Math.PI, (18 / 10) * Math.PI);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.lineWidth = 2;
        canvas.beginPath();
        canvas.moveTo(xPos - 18, yPos + 48);
        canvas.lineTo(xPos + 12, yPos + 48);
        canvas.stroke();
    }
    
    getPotentialTiles(row,  col, gameState) {
        var potentialTiles = [];
        var oldSquare = this.getSquare();
        var board = gameState.getBoard();
        var coords = [[row - 2, col + 1],[row - 1, col + 2], [row + 1, col + 2],
                      [row + 2, col + 1], [row + 2, col - 1], [row + 1, col - 2], 
                      [row - 1, col - 2], [row - 2, col - 1]];
        
        for(var i = 0; i < coords.length; i++) {
            var r = coords[i][0];
            var c = coords[i][1];
            if((r >= 0 && r <= 7) && (c >= 0 && c <= 7)) {
                var otherPiece = board[r][c].getPiece();
                var thisPiece = board[row][col].getPiece();
                if(otherPiece == null || otherPiece.getColor() != thisPiece.getColor() ){
                    potentialTiles.push(board[r][c]);
                }
            }
                
        }
        return potentialTiles;
    }
    
    static getCoords(xPos, yPos) {
        return [xPos + 18, yPos - 2];
    }
    
    getCoords(xPos, yPos) {
        return [xPos + 18, yPos - 2];
    }
}