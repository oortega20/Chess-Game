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
    
    getSquare() {
        return this.square;
    }
    
    getColor() {
        return this.color;
    }

    getSquares(row, col, dRow, dCol, potentialSquares, gameState) {
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
    
    placePiece(oldSquare, newSquare) {
        //would want to handle castling here as well??
        //TODO: for my getPotential Squares method make sure to take castling into consideration. In this method as well i would also have to do the castling checks as well as the piece
        var g = oldSquare.getGameState();
        var board = g.getBoard();
        if(g.isCastle(oldSquare, newSquare)) {
            if(this.color == "white") {
                var row = 0;
            } else {
                var row = 7;
            }
            var kingSide = false;
            var queenSide = false;;
            for(var i = 0; i < 8; i++) {
                if (board[row][1] == newSquare) {
                    kingSide = true;
                }
                if(board[row][5] == newSquare) {
                    queenSide = true;
                }
            }
            if(kingSide) {
                var rookSquare = board[row][0];
                var rNS = board[row][2];
            } else {
                var rookSquare = board[row][7];
                var rNS = board[row][4];
            }
            var rook = rookSquare.getPiece();
            rook.move(rookSquare, rNS);
            this.move(oldSquare, newSquare);

        } 
        else if (g.isEnPassant()) {
            // would want to remove from play recall this
        } else {
            if(newSquare.getPiece() != null) {
                var capturedPiece = newSquare.getPiece();
                capturedPiece.removeFromPlay(newSquare);
            }
            this.move(oldSquare, newSquare);
        }
    
    }
    
    move(oldSquare, newSquare) {
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

// subclasses for different pieces
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
    
    getPotentialTiles(row,  col, gameState) {
        var potentialTiles = [];
        var twoSpaces = [];
        var oneSpace = [];
        var leftCapture = [];
        var rightCapture = [];
        if(this.color == "white") {
            twoSpaces = [row + 2, col];
            oneSpace = [row + 1, col];
            leftCapture = [row + 1, col - 1];
            rightCapture = [row + 1, col + 1];
        } else {
            twoSpaces = [row - 2, col];
            oneSpace = [row - 1, col];
            leftCapture = [row - 1, col - 1];
            rightCapture = [row - 1, col + 1];
        }
        // TODO: check the logic for this bad boy.
        if(gameState.isEnPassant()) {
            this.runEnPassentChecks(leftCapture, rightCapture, gameState, potentialTiles)
        }
        this.runOtherChecks(oneSpace, twoSpaces, leftCapture, rightCapture, gameState, potentialTiles);
        return potentialTiles;
        
    }
    
    runEnPassentChecks(leftCapture, rightCapture, gameState, potentialTiles) {
        //TODO: figure out how to check if the enPassent is legal
        var board = gameState.getBoard();
        var priorSquare = gameState.getPriorSquare();
        var currentSquare = board[row][col];
        var dCol = currentSquare.getCol() - priorSquare.getCol();
        if(dCol == -1) {
            var row = leftCapture[0];
            var col = leftCapture[1];
            potentialTiles.push(board[row][col]);
        } else {
            var row = rightCapture[0];
            var col = rightCapture[1];
            potentialTiles.push(board[row][col]);
        }
        // this can be made more simple
        
        
    }
    
    runOtherChecks(oneSpace, twoSpaces, leftCapture, rightCapture, gameState, potentialTiles) {
        var board = gameState.getBoard();
        var oldSquare = this.getSquare();
        var moveOne = false;
        if (oneSpace[0] < 8 && oneSpace[1] < 8 && oneSpace[0] > -1 && oneSpace[1] > - 1) {
            var row = oneSpace[0];
            var col = oneSpace[1];
            if(board[row][col].getPiece() == null) {
                potentialTiles.push(board[row][col]);
                moveOne = !moveOne;
            }
        }
        if (this.numMoves == 0 && moveOne) {
            if(twoSpaces[0] < 8 && twoSpaces[1] < 8 && twoSpaces[0] > -1 && twoSpaces[1] > -1) {
                var row = twoSpaces[0];
                var col = twoSpaces[1];
                if(board[row][col].getPiece() == null) {
                    potentialTiles.push(board[row][col]);
                }
            }
        }
        if(leftCapture[0] < 8 && leftCapture[1] < 8 && leftCapture[0] > -1 && leftCapture[1] > -1) {
            var row = leftCapture[0];
            var col = leftCapture[1];
            if(board[row][col].getPiece() != null && board[row][col].getPiece().getColor() != this.getColor()) {
                potentialTiles.push(board[row][col]);
            }
        }
        if(rightCapture[0] < 8 && rightCapture[1] < 8 && rightCapture[0] > -1 && rightCapture[1] > -1) {
            var row = rightCapture[0];
            var col = rightCapture[1];
            if(board[row][col].getPiece() != null && board[row][col].getPiece().getColor() != this.getColor()) {
                potentialTiles.push(board[row][col]);
            }
        }
    }
    
}

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
