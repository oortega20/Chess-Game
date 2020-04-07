class GameState {

    constructor() {
        this.whitePieces = [];
        this.blackPieces = [];
        this.board = GameState.createBoard();
        GameState.setUpBoard(this);
        //TODO: when i eventually create the start screen for the game i will have to have some info to transfer to create the instance of the timer for the game
        this.turn = 'white';
        this.player = 1;
        this.clickCounts = 0;
        this.priorSquare = null;
        this.potentialTiles = null;
        this.passingPiece = null;
        this.isCheck = false;
    }

    static renderBoard (){
        var square = 60;
        var board = 8 * square;
        var topBorder = 150;
        var leftBorder = 425;
        var letterSpace = 10;
        var coordinates = ["A", "B", "C", "D", "E", "F", "G", "H", "1", "2", "3", "4", "5", "6", "7", "8"];

        for (var i = 0; i < 8; i++){
            for (var j = 0; j < 8; j++){
                if ((i + j) % 2 == 0) {
                    ctx.fillStyle = "silver";
                    ctx.fillRect( (i * square) + leftBorder, (j * square) + topBorder, square, square);
                } else {
                    ctx.fillStyle = "white";
                    ctx.fillRect( (i * square) + leftBorder, (j * square) + topBorder, square, square);
                }
            }
        }

        ctx.fillStyle = "black";

        for (var i = 0; i < 16; i++) {
            if (i < 8) {
                ctx.fillText (coordinates [i], leftBorder + (square * i) + (square / 2), topBorder + letterSpace - 12);
            } else {
                ctx.fillText (coordinates [i], leftBorder + 3, topBorder + (square * (i - 8)) + (square / 2));
                ctx.fillText (coordinates [i], leftBorder + board - letterSpace, topBorder + (square * (i - 8)) + (square / 2));
            }
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(leftBorder, topBorder, board, board);
    }

    static renderTitle () {
    var leftBorder = 425;
    var topBorder = 245;
    var board = 480;
    var xPos = 580;
    var yPos = 110;
    var pawnArray = [];
    pawnArray.push(new Pawn ("white", 450, 75, ctx));
    pawnArray.push(new Pawn ("black", 500, 75, ctx));
    pawnArray.push(new Pawn ("white", 550, 75, ctx));
    pawnArray.push(new Pawn ("black", 880, 75, ctx));
    pawnArray.push(new Pawn ("white", 830, 75, ctx));
    pawnArray.push(new Pawn ("black", 780, 75, ctx));
    for (var i = 0; i < pawnArray.length; i++){
        pawnArray[i].render();
    }

    ctx.strokeStyle = "black";
    // for the arc on the top

    ctx.beginPath();
    ctx.arc(leftBorder + ((1 / 2) * board), topBorder, (1 / 2) * board,
            (130 / 100) * Math.PI, (170 / 100) * Math.PI);
    ctx.stroke();

    // for the edges

    ctx.beginPath();
    ctx.moveTo(leftBorder, 150);
    ctx.lineTo(leftBorder, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(leftBorder, 50);
    ctx.lineTo(leftBorder + 100, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(board + leftBorder, 150);
    ctx.lineTo(board + leftBorder, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(board + leftBorder, 50);
    ctx.lineTo((board + leftBorder) - 100, 50);
    ctx.stroke();
    // for the title

    ctx.font = "60px monospace";
    ctx.fillStyle = "black";
    ctx.fillText("CHESS", xPos, yPos);
    }

    static createBoard() {
        var board = new Array(8);
        var dimensions = 60;
        var topBorder = 162;
        var leftBorder = 437;
        for(var i = 0; i < 8; i++) {
            board[i] = new Array(8);
            for(var j = 0; j < 8; j++) {
                var xPos = leftBorder + (dimensions * j);
                var yPos = topBorder + (dimensions * i);
                board[i][j] = new Tile(null, j, i, xPos, yPos);
            }
        }
        GameState.renderBoard();
        GameState.renderTitle();
        return board;
    }

    static setUpBoard(gameState) {
        var board = gameState.board;
        var whitePieces = gameState.whitePieces;
        var blackPieces = gameState.blackPieces;
        for(var w = 0; w < 2; w++) {
            for(var col = 0; col < board.length; col++) {
                //somehow this is wrong fix it tomorrow
                var xPos = board[w][col].getXPos();
                var yPos = board[w][col].getYPos();
                if (w == 1) {
                    var pieceCoords = Pawn.getCoords(xPos, yPos);
                    board[w][col].setPiece(new Pawn("white", pieceCoords[0], pieceCoords[1], pctx, board[w][col]));
                } else {
                    if(col == 0 || col == 7) {
                        var pieceCoords = Rook.getCoords(xPos, yPos);
                        board[w][col].setPiece(new Rook("white", pieceCoords[0], pieceCoords[1], pctx, board[w][col]));
                    } else if (col == 1 || col == 6) {
                        var pieceCoords = Knight.getCoords(xPos, yPos);
                        board[w][col].setPiece(new Knight("white", pieceCoords[0], pieceCoords[1], pctx, board[w][col]));
                    } else if (col == 2 || col == 5) {
                        var pieceCoords = Bishop.getCoords(xPos, yPos);
                        board[w][col].setPiece(new Bishop("white", pieceCoords[0], pieceCoords[1], pctx, board[w][col]));
                    } else if (col == 3) {
                        var pieceCoords = Queen.getCoords(xPos, yPos);
                        board[w][col].setPiece(new Queen("white", pieceCoords[0], pieceCoords[1], pctx, board[w][col]));
                    } else {
                        var pieceCoords = King.getCoords(xPos, yPos);
                        board[w][col].setPiece(new King("white", pieceCoords[0], pieceCoords[1], pctx, board[w][col]));
                    }

                }
                whitePieces.push(board[w][col].getPiece());
                board[w][col].getPiece().render();
            }
        }

        for(var b = 6; b < 8; b++) {
            for(var col = 0; col < board.length; col++) {
                var xPos = board[b][col].getXPos();
                var yPos = board[b][col].getYPos();
                if(b == 6) {
                    var pieceCoords = Pawn.getCoords(xPos, yPos);
                    board[b][col].setPiece(new Pawn("black", pieceCoords[0], pieceCoords[1], pctx, board[b][col]));
                } else {
                    if(col == 0 || col == 7) {
                        var pieceCoords = Rook.getCoords(xPos, yPos);
                        board[b][col].setPiece(new Rook("black", pieceCoords[0], pieceCoords[1], pctx, board[b][col]));
                    } else if (col == 1 || col == 6) {
                        var pieceCoords = Knight.getCoords(xPos, yPos);
                        board[b][col].setPiece(new Knight("black", pieceCoords[0], pieceCoords[1], pctx, board[b][col]));
                    } else if (col == 2 || col == 5) {
                        var pieceCoords = Bishop.getCoords(xPos, yPos);
                        board[b][col].setPiece(new Bishop("black", pieceCoords[0], pieceCoords[1], pctx, board[b][col]));
                    } else if (col == 3) {
                        var pieceCoords = Queen.getCoords(xPos, yPos);
                        board[b][col].setPiece(new Queen("black", pieceCoords[0], pieceCoords[1], pctx, board[b][col]));
                    } else {
                        var pieceCoords = King.getCoords(xPos, yPos);
                        board[b][col].setPiece(new King("black", pieceCoords[0], pieceCoords[1], pctx, board[b][col]));
                    }

                }
                blackPieces.push(board[b][col].getPiece());
                board[b][col].getPiece().render();
            }
        }
        for (var i = 0; i < 8; i++ ){
            for (var j = 0 ; j < 8; j++) {
                board[i][j].gameState = gameState;
            }
        }
    }

    getPotentialTiles() {
        return this.potentialTiles;
    }

    coordsInBoard(x, y) {
        return x < 8 &&  x > -1 && y < 8 && y > - 1;
    }

    switchTurn(){
        if (this.turn === 'white'){
            this.turn = 'black';
            this.player = -1;
        } else{
            this.turn = 'white';
            this.player = 1;
        }
    }

    getTurn() {
        return this.turn;
    }

    inCheck() {
        var kSquare;
        var pieces;
        if(this.turn == "white") {
            kSquare = this.findKing("black");
            pieces = this.getWhitePieces();
        } else {
            kSquare = this.findKing("white");
            pieces = this.getBlackPieces();
        }
        
        for (var i = 0; i < pieces.length; i++) {
            var row = pieces[i].getSquare().getRow();
            var col = pieces[i].getSquare().getCol();
            var potentialTiles = pieces[i].getPotentialTiles(row, col, this);
            for (var j = 0; j < potentialTiles.length; j++) {
                if(kSquare == potentialTiles[j]) {
                    alert("move from", oldSquare, " to", newSquare, " places piece in check");
                    this.isCheck = true;
                    
                }
            }
        }
        this.isCheck = false;
        return this.isCheck;

    }

    verifyNotCheck(oldSquare, newSquare, piece) {
        //Ensures current move is not a move that places a piece in check
        var capturedPiece = checkMove(oldSquare, newSquare, piece);
        var isCheck = this.inCheck();
        this.undoCheckMove(oldSquare, newSquare, piece, capturedPiece);
        return isCheck
    }

    checkMove(oldSquare, newSquare, piece) {
        //when doing the verification of legality use these methods. don't call move or place piece.
        var capturedPiece = checkMove(oldSquare, newSquare, piece);
        if(newSquare.getPiece() != null) {
            capturedPiece = newSquare.getPiece().copy();
        }  
        oldSquare.setPiece(null);
        newSquare.setPiece(this);
        return capturedPiece; 
    }

    undoCheckMove(oldSquare, newSquare, piece, capturedPiece) {
        oldSquare.setPiece(piece);
        newSquare.setPiece(capturedPiece);
    }

    isCastle(oldSquare, newSquare) {
        var board = this.getBoard();
        var piece = oldSquare.getPiece();
        if(piece != null && piece instanceof King) {
            var o = 0;
            var n = 0;
            var passedO = false;
            var passedN = false;
            if(piece.getColor() == "white") {
                var row = 0;
            } else {
                var row = 7;
            }
            for(var i = 0; i < 8; i++) {
                if (board[row][i] == oldSquare) {
                    passedO = true;
                    o = i;
                }
                if(board[row][i] == newSquare) {
                    passedN = true;
                    n = i;
                }
            }
            if(passedN && passedO && Math.abs(o - n) == 2) {
                return true;
            }
            return false;
        }
        return false;

    }

    getClicks() {
        return this.clickCounts;
    }

    getBoard() {
        return this.board;
    }

    getPriorSquare() {
        return  this.priorSquare;
    }

    getWhitePieces() {
        return this.whitePieces;
    }

    getBlackPieces() {
        return this.blackPieces;
    }



    findKing(kingColor) {
        var board = this.getBoard();
        for(var i = 0; i < 8; i++) {
            for(var j = 0; j < 8; j++) {
                if(board[i][j].getPiece() != null) {
                    var piece = board[i][j].getPiece();
                    if(piece instanceof King && piece.getColor() == kingColor) {
                        return board[i][j];
                    }
                }
            }
        }
    }

    rowIsClear(piece, squares) {
        var board = this.getBoard();
        if(this.turn == "white") {
            var pieces = this.getBlackPieces();
        } else {
            var pieces = this.getWhitePieces();
        }
        for (var i = 0; i < pieces.length; i++) {
            var row = pieces[i].getSquare().getRow();
            var col = pieces[i].getSquare().getCol();
            var potentialTiles = pieces[i].getPotentialTiles(row, col, this);
            for(var j = 0; j < potentialTiles.length; j++) {
                for(var k = 0; k < squares.length; k++) {
                    if (squares[k] == potentialTiles[j]) {
                        return false;
                    }
                }
            }
        }
        for(var l = 0; l < squares.length; l++) {
            if(squares[l].getPiece() != null) {
                return false;
            }
        }
        return true;
    }
}
