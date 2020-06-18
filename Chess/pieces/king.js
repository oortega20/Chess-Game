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
    
    static getCoords(xPos, yPos) {
        return [xPos + 9, yPos + 4];
    }
    getCoords(xPos, yPos) {
        return [xPos + 9, yPos + 4];
    }

    getPotentialTiles(row,  col, gameState) {
        var board = gameState.getBoard();
        var piece = board[row][col].getPiece();
        var potentialTiles = [];
        var coords = [[row - 1, col - 1], 
                      [row - 1, col],
                      [row - 1, col - 1],
                      [row, col - 1], 
                      [row, col + 1], 
                      [row + 1, col + 1], 
                      [row + 1, col], 
                      [row + 1, col - 1], 
                      ];
         for(var i = 0; i < coords.length; i++) {
            console.log(coords[i])
            var r = coords[i][0];
            var c = coords[i][1];
            if(gameState.coordsInBoard(r, c)) {
                var otherPiece = board[r][c].getPiece();
                if(otherPiece == null || otherPiece.getColor() != piece.getColor()){
                    potentialTiles.push(board[r][c]);
                    
                }
            }

        }
        this.addCastlingTiles(potentialTiles, gameState)
        return potentialTiles;     
    }
    
    addCastlingTiles(potentialTiles, gameState) {
        var board = gameState.getBoard();
        var oldSquare = this.getSquare();
        /* if the king has moved we can no longer castle */
        var pieces = [];
        var threateningTiles = [];
        var kingSide = [];
        var queenSide = [];
        var addKing = true;
        var addQueen = true;
        if (this.numMoves > 0) {
            return;
        }
        /* determine the side */
        if (this.turn == 'white') {
            pieces = gameState.getBlackPieces()
        } else {
            pieces = gameState.getWhitePieces()
        }

        /*obtain squares the other side can potentially attack*/
        for (var piece in pieces) {
            var row = piece.getSquare.getRow();
            var col = piece.getSquare.getCol();
            threateningTiles.concat(piece.getPotentialTiles(row, col, gameState));
        }
        console.log(threateningTiles);
        /*if these squares are in the corresponding squares in between the rook and king
        then we cannot castle there, here we also check if the corresponding rooks have not moved*/
        if (this.turn == 'white') {
            queenSide = [board[0][1], board[0][2], board[0][3]]
            kingSide =  [board[0][5], board[0,6]];
            kingRook = board[0][0].getPiece();
            queenRook = board[0][7].getPiece();

        } else {
            queenSide = [board[7][1], board[7][2], board[7][3]]
            kingSide = [board[7][5], board[7,6]];
        }
        if (kingRook instanceof Rook &&
            kingRook.numMoves == 0) {
             for (var threatTile in threateningTiles) {
                 for (var emptyTile in kingSide) {
                     if (threatTile === emptyTile) 
                     {
                         addKing = false;
                     }
                 }
             }   
            }
        if (queenRook instanceof Rook &&
            queenRook.numMoves == 0) {
            for (var threatTile in threateningTiles) {
                for (var emptyTile in kingSide) {
                    if (threatTile === emptyTile) 
                    {
                        addQueen = false;
                    }
                }
            }  
        }
        if (this.turn == 'white') {
            if(addKing)
                potentialTiles.add(board[0][2]);
            if(addQueen)
                potentialTiles.add(board[0][6]);
        } else {
            if (addKing)
                potentialTiles.add(board[7][2]);
            if (addQueen)
                potentialTiles.add(board[7][6]);
        }

    }

    isCastlingMove(oldSquare, newSquare) {
        /* TODO: Check to see if the move to the new square is a king move */
        return true;
    }

    completeCastlingMove() {
        /* TODO: moves the corresponding rook after a castling move */
        return;
    }
}