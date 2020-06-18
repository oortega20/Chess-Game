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
       
    validatePawnMovements(gameState, potentialTiles) {
        var validTiles = [];
        var board = gameState.getBoard();
        var oldSquare = this.getSquare();
        for (var i = 0; i < 4; i++) {
            console.log(potentialTiles[i]);
            var row = potentialTiles[i][0];
            var col = potentialTiles[i][1];
            //Checking if two squares ahead is valid
            console.log(potentialTiles[1])
            if(gameState.coordsInBoard(row, col) && 
               i == 0 &&
               board[row][col].getPiece() == null &&
               board[potentialTiles[1][0]][potentialTiles[1][1]].getPiece() == null &&
               this.numMoves == 0) {
                validTiles.push(board[row][col]);
            //Checking if the square ahead is valid
            } else if (gameState.coordsInBoard(row, col) && 
                       i == 1 &&
                       board[row][col].getPiece() == null) {
                validTiles.push(board[row][col]);
            //Checking the capture moves
            } else if ((i == 2 || i == 3) &&
                       gameState.coordsInBoard(row, col) &&
                       board[row][col].getPiece() != null &&
                       board[row][col].getPiece().getColor() != this.getColor()) {
                validTiles.push(board[row][col]);
            } else {
                continue;
            }
        }
        return validTiles;
    }
    
    getPotentialTiles(row,  col, gameState) {
        var potentialTiles = [];
        var twoSpaces = [];
        var oneSpace = [];
        var leftCapture = [];
        var rightCapture = [];
        twoSpaces = [row + (2 * gameState.player), col];
        oneSpace = [row + (1 * gameState.player), col];
        leftCapture = [row + (1 * gameState.player), col + (1 * gameState.player)];
        rightCapture = [row + (1 * gameState.player), col - (1 * gameState.player)];
      
        var potentialTiles = [twoSpaces, oneSpace, leftCapture, rightCapture];
        potentialTiles = this.validatePawnMovements(gameState, potentialTiles);
        

        this.addEnPassantTiles(potentialTiles)
        return potentialTiles;
        
    }

    /*TODO: handle the logic for these tricky methods */
    addEnPassantTiles(potentialTiles) {
        return 0;   
    }

    isEnPassant(oldSquare, newSquare) {
        return true;
    }

    completeEnPassant() {
        return 0;
    }

    isPromotion() {
        return 0;
    }

    completePromotion() {
        return 0;
    }

}