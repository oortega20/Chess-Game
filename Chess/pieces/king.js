//TODO: look at the logic for castling once more. From what I can see capturing is correct now.
var boardCanvas = document.getElementById("board");
var ctx = boardCanvas.getContext("2d");

var piecesCanvas = document.getElementById("pieces");
var pctx = piecesCanvas.getContext("2d");

class King extends Piece {
    render() {
        var xPos = this.xPos;
        var yPos = this.yPos;
        var lineWidth = 3;
        var canvas = this.type;
        var crossWidth = 4;
        var crossHeight = 6;
        var crownWidth = 25;
        var crownHeight = 12;
        
        canvas.lineWidth = lineWidth;
        canvas.strokeStyle = this.outline;
        canvas.fillStyle = this.color;
        
        canvas.beginPath();
        canvas.moveTo(xPos, yPos);
        canvas.lineTo(xPos + (crownWidth / 2) - (crossWidth / 2), yPos);
        canvas.lineTo(xPos + (crownWidth / 2) - (crossWidth / 2), yPos - (crownHeight / 3));
        canvas.lineTo(xPos + (crownWidth / 2) - (2 * crossWidth), yPos - (crownHeight / 3));
        canvas.lineTo(xPos + (crownWidth / 2) - (2 * crossWidth), yPos - (2 * crownHeight / 3));
        canvas.lineTo(xPos + (crownWidth / 2) - (crossWidth / 2), yPos - (2 * crownHeight / 3));
        canvas.lineTo(xPos + (crownWidth / 2) - (crossWidth / 2), yPos - crownHeight);
        canvas.lineTo(xPos + (crownWidth / 2) + (crossWidth / 2), yPos - crownHeight);
        canvas.lineTo(xPos + (crownWidth / 2) + (crossWidth / 2), yPos - (2 * crownHeight / 3));
        canvas.lineTo(xPos + (crownWidth / 2) + (2 * crossWidth), yPos - (2 * crownHeight / 3));
        canvas.lineTo(xPos + (crownWidth / 2) + (2 * crossWidth), yPos - (crownHeight / 3));
        canvas.lineTo(xPos + (crownWidth / 2) + (crossWidth / 2), yPos - (crownHeight / 3));
        canvas.lineTo(xPos + (crownWidth / 2) + (crossWidth / 2), yPos);
        canvas.lineTo(xPos + crownWidth, yPos);
        canvas.lineTo(xPos, yPos);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.beginPath();
        canvas.moveTo(xPos - 3, yPos);
        canvas.lineTo(xPos + crownWidth, yPos);
        canvas.lineTo(xPos + (crownWidth - 3), yPos + 2);
        canvas.lineTo(xPos + 3, yPos + 2);
        canvas.lineTo(xPos, yPos);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.beginPath();
        canvas.moveTo(xPos + 3, yPos + 2);
        canvas.lineTo(xPos + (crownWidth - 3), yPos + 2);
        canvas.lineTo(xPos + (crownWidth - 3), yPos + 5);
        canvas.lineTo(xPos + 3, yPos + 5);
        canvas.lineTo(xPos + 3, yPos + 2);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.beginPath();
        canvas.moveTo(xPos + 6, yPos + 6);
        canvas.lineTo(xPos + 6, yPos + 35);
        canvas.lineTo(xPos + crownWidth - 5, yPos + 35);
        canvas.lineTo(xPos + crownWidth - 6, yPos + 6);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.beginPath();
        canvas.arc(xPos + 13 , yPos + 50, 18, (12 / 10) * Math.PI, (18 / 10) * Math.PI);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        canvas.lineWidth = 2;
        canvas.beginPath();
        canvas.moveTo(xPos - 4, yPos + 40);
        canvas.lineTo(xPos + 30, yPos + 40);
        canvas.stroke(); 
    }
    
    getPotentialTiles(row,  col, gameState) {
        var board = gameState.getBoard();
        var piece = board[row][col].getPiece();
        var potentialTiles = [];
        var coords = [[row - 1, col], [row - 1, col + 1], [row, col + 1], [row + 1, col + 1], [row + 1, col], [row + 1, col - 1], [row, col - 1], [row - 1, col - 1]];
         for(var i = 0; i < coords.length; i++) {
            var r = coords[i][0];
            var c = coords[i][1];
            if((r >= 0 && r <= 7) && (c >= 0 && c <= 7)) {
                var otherPiece = board[r][c].getPiece();
                if(otherPiece == null || otherPiece.getColor() != piece.getColor()){
                    potentialTiles.push(board[r][c]);
                    
                }
            }

        }
        //TODO: Look over this then you can begin working on your paper again
        if(gameState.getTurn() == this.color) {
            if(this.color == "white") {
                var kingSide = gameState.rowIsClear(this, [board[0][4], board[0][5]]);
                var queenSide = gameState.rowIsClear(this, [board[0][2], board[0][3]]);
            } else {
                var kingSide = gameState.rowIsClear(this,[board[7][4], board[7][5]]);
                var queenSide = gameState.rowIsClear(this,[board[7][2], board[7][3]]);
            }
        }
        
        this.addCastlingTiles(kingSide, queenSide, gameState, potentialTiles);
        return potentialTiles;
    }
    
    addCastlingTiles(kingSide, queenSide, gameState, potentialTiles) {
        var board = gameState.getBoard();
        var oldSquare = this.getSquare();
        if (this.color == "white") {
            if(kingSide) {
                var rook = board[0][0].getPiece();
                if(rook != null && rook instanceof Rook && rook.numMoves == 0 && this.numMoves == 0) {
                    potentialTiles.push(board[0][1]);
                }
            }
            if(queenSide) {
                var rook = board[0][7].getPiece();
                if(rook != null && rook instanceof Rook && rook.numMoves == 0 && this.numMoves == 0) {
                    potentialTiles.push(board[0][5]);
                }
            }
        } else {
            if(kingSide) { 
                var rook = board[7][0].getPiece();
                if(rook != null && rook instanceof Rook && rook.numMoves == 0 && this.numMoves == 0) {
                    potentialTiles.push(board[7][1]);
                }
            }
            if(queenSide) {
                var rook = board[7][7].getPiece();
                if(rook != null && rook instanceof Rook && rook.numMoves == 0 && this.numMoves == 0) {
                    potentialTiles.push(board[7][5]);
                }
            }
        }
    }
    
    static getCoords(xPos, yPos) {
        return [xPos + 9, yPos + 4];
    }
    getCoords(xPos, yPos) {
        return [xPos + 9, yPos + 4];
    }
}