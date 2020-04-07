//TODO: look at the logic for castling once more. From what I can see capturing is correct now.
var boardCanvas = document.getElementById("board");
var ctx = boardCanvas.getContext("2d");

var piecesCanvas = document.getElementById("pieces");
var pctx = piecesCanvas.getContext("2d");

// piece constructor that requires  color (white or black) and its coordinates
class Piece {
    constructor (color, xPos, yPos, type, square) {
        this.color = color;
        this.outline;
        if (this.color == "white") {
            this.outline = "black";
        } else {
            this.outline = "grey";
        }
        this.xPos = xPos;
        this.yPos = yPos;
        this.type = type;
        this.square = square;
        this.numMoves = 0;
    }

    copy(piece) {
        return new Piece(this.color, this.xPos, this.yPos, this.type, this.square)
    }
    
    getSquare() {
        return this.square;
    }
    
    getColor() {
        return this.color;
    }

    getSquares(row, col, dRow, dCol, potentialSquares, gameState) {
        //Returns the squares along a queen direction specified by dRow, dCol
        var board = gameState.getBoard();
        var startR = row;
        var startC = col;
        while(row <= 7 && row >= 0 && col <= 7 && col >= 0) {
            if (board[row][col].getPiece() == this) {
                row += dRow;
                col += dCol;
            } else if(board[row][col].getPiece() == null) {
                potentialSquares.push(board[row][col]);
                row += dRow;
                col += dCol;
            } else if(board[row][col].getPiece().getColor() != this.getColor()) {
                potentialSquares.push(board[row][col]);
                break;
            } else {
                break;
            }
        }  
    }

    isLegal(oldSquare, newSquare) {
        /*
        Return: a boolean that indicates whether the given move does not move into a piece of its own color 
                and the move does not place piece in check subsequent pieces will have to make sure the piece can move
                in the specified manner ie horse move is an L.
        */
        if (newSquare.getPiece() != null) {
            return this.getColor() != newSquare.getPiece().getColor() && verifyNotCheck(oldSquare, newSquare, this);
        }
        return true;     
    }
    
    placePiece(oldSquare, newSquare) {
        
        /*TODO: structure will be the following: placePiece should only be called after a call to isLegal on the following piece.
                will assume that move is legal. 
                Have place piece return old piece that was there if one exists.

        */
        if(newSquare.getPiece() != null) {
            var capturedPiece = newSquare.getPiece();
            capturedPiece.removeFromPlay(newSquare);
        }
        this.move(oldSquare, newSquare);
        
    }
    
    move(oldSquare, newSquare) {
        //Performs the rendering of the movement, does not handle legality
        var newCoords = this.getCoords(newSquare.getXPos(), newSquare.getYPos());
        this.xPos = newCoords[0];
        this.yPos = newCoords[1];
        this.eraseImage(oldSquare);
        this.render();  
        oldSquare.setPiece(null);
        newSquare.setPiece(this);
        this.square = newSquare;
        this.numMoves++;
    }
    
    eraseImage(currentSquare){
        pctx.clearRect(currentSquare.getXPos() - 10, currentSquare.getYPos() - 10, 60, 60);
    }
    
    removeFromPlay(currentSquare) {
        this.eraseImage(currentSquare);
        var g = currentSquare.getGameState();
        var color = this.color;
        if (color == "white") {
            var piecesInPlay = g.getWhitePieces();

        } else {
            var piecesInPlay = g.getBlackPieces();
        }
        var index = piecesInPlay.indexOf(this);
        piecesInPlay.splice(index, 1);
        console.log(piecesInPlay);
    }
    
}