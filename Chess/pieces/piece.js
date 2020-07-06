//TODO: look at the logic for castling once more. From what I can see capturing is correct now.
var boardCanvas = document.getElementById("board");
var ctx = boardCanvas.getContext("2d");

var piecesCanvas = document.getElementById("pieces");
var pctx = piecesCanvas.getContext("2d");

/* Use when comparing board coordinates */
function isArrayEquals(arr1, arr2) {
    var isArray = arr1 instanceof Array && arr2 instanceof Array &&
                    arr1.length == arr2.length;
    
    if (isArray) {
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] != arr2[i]) {
                return false;
            }
        }
    }
    return isArray;
}

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
        while(gameState.coordsInBoard(row, col)) {
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
        Return: boolean that indicates whether the given move does not move into a 
                piece of its own color 
                and the move does not place team in check. 
                Each piece will have to make sure the piece can move
                in the specified manner
                ie: the horse will have to determine whether a move is an L.
        */
        if (newSquare.getPiece() != null) {
            return this.getColor() != newSquare.getPiece().getColor() && verifyNotCheck(oldSquare, newSquare);
        }
        return true;     
    }
    
    placePiece(oldSquare, newSquare) {
        
        /*  structure will be the following: 
            placePiece should only be called after a call to isLegal on the following piece.
            will assume that move is legal. 
            Have place piece return old piece that was there if one exists.
        */
       
        if (this.isLegal(oldSquare, newSquare)) {
            if(newSquare.getPiece() != null) {
                var capturedPiece = newSquare.getPiece();
                capturedPiece.removeFromPlay(newSquare);
            }
            this.move(oldSquare, newSquare);
            /*TODO: handle the castling, enPassant, and pawn promotion */
            if (newSquare.getPiece().isCastlingMove(oldSquare, newSquare)) {
                newSquare.getPiece().completeCastlingMove(newSquare);
            }
            if (newSquare.getPiece().isEnPassant(oldSquare, newSquare)) {
                newSquare.getPiece().completeEnPassant()
            }
            if (newSquare.getPiece().isPromotion()){
                newSquare.getPiece().completePromotion();
            }
        }

        this.square.gameState.inCheck();

    }
    
    move(oldSquare, newSquare) {
        /* Performs the rendering of the movement, does not handle legality */
        var piece = oldSquare.getPiece();
        console.log(oldSquare, newSquare, piece, 'before');
        var newCoords = piece.getCoords(newSquare.getXPos(), newSquare.getYPos());
        piece.xPos = newCoords[0];
        piece.yPos = newCoords[1];
        piece.eraseImage(oldSquare);
        oldSquare.setPiece(null);
        newSquare.setPiece(piece); 
        piece.square = newSquare; 
        piece.numMoves++;
        console.log(oldSquare, newSquare, piece, 'after');
        piece.render(); 
    }
    
    eraseImage(currentSquare){
        pctx.clearRect(currentSquare.getXPos() - 10, currentSquare.getYPos() - 10, 60, 60);
    }

    
    verifyNotCheck(oldSquare, newSquare) {
        console.log('currently verifying no check')
        var oldPiece = oldSquare.getPiece().copy();
        var newPiece = newSquare.getPiece().copy();
        oldSquare.setPiece(null);
        newSquare.setPiece(this);
        var isCheck = false;
        var pieces = []
        var king = null;
        /*Perform the check verifications */
        if (this.turn == "white") {
            pieces = this.getBlackPieces();
            king = this.gameState.findKing("white");
        } else {
            pieces = this.getWhitePieces();
            king = this.gameState.findKing("black");
        }

        for (var i = 0; i < pieces.length; i++) {
            var row = pieces[i].getSquare().getRow();
            var col = pieces[i].getSquare().getCol();
            console.log('verifying this piece', pieces[i])
            var potentialTiles = pieces[i].getPotentialTiles(row, col, this);
            for (var j = 0; j < potentialTiles.length; j++) {
                if(king.getSquare() == potentialTiles[j]) {
                    console.log("move from", oldSquare, " to", newSquare, " places piece in check");
                    isCheck = true;   
                }
            }
        }
        oldSquare.setPiece(oldPiece);
        newSquare.setPiece(newPiece);
        return this.isCheck;
        /*Reset the state of the game to what it was prior*/
    }
    
    removeFromPlay(currentSquare) {
        /* remove piece from current gameplay if it was captured */
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

    isCastlingMove(oldSquare, newSquare) {
        /* Check to see if the move to the new square is a king move */
        var oldS = oldSquare.getGameCoords();
        var newS = newSquare.getGameCoords();

        return (isArrayEquals(oldS, [0, 4]) && (isArrayEquals(newS, [0, 2]) || isArrayEquals(newS, [0, 6])) ||
               (isArrayEquals(oldS, [7, 4]) && (isArrayEquals(newS, [7, 2]) || isArrayEquals(newS,[7, 6])))) &&
               this instanceof King;
    }

    completeCastlingMove(newSquare) {
        /* moves the corresponding rook after a castling move */
        var board = newSquare.getGameState().getBoard();
        if (isArrayEquals(newSquare.getGameCoords(), [0,2])) {
            this.move(board[0][0], board[0][3]);
        } else if (isArrayEquals(newSquare.getGameCoords(),[0,6])) {
            console.log(board[0][7], board[0][5]);
            this.move(board[0][7], board[0][5]);
        } else if (isArrayEquals(newSquare.getGameCoords(), [7,2])) {
            this.move(board[7][0], board[7][3]);
        } else  {
            this.move(board[7][7], board[7][5]);
        }
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