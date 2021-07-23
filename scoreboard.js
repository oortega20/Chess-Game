var boardCanvas = document.getElementById("board");
var ctx = boardCanvas.getContext("2d");

var piecesCanvas = document.getElementById("pieces");
var pctx = piecesCanvas.getContext("2d");

var timerCanvas = document.getElementById("timer");
var tctx = timerCanvas.getContext("2d");

class ScoreBoard{
    constructor(startingTime) {
        this.whitePawns = new Array(8);
        this.blackPawns = new Array(8);
        this.whitePieces = new Array(8);
        this.blackPieces = new Array(8);
        this.timer = new Timer(startingTime);
        this.whiteMoves = [];
        this.blackMoves = [];
        this.potentialMove = "";
    }

    displayPieces() {
        var xPos = 100;
        var yPos = 100;
        var positions = {q : 100, b1 : 120, b2 : 140,  r1: 160,
                        r2: 180, k1: 200, k2: 220};
        var bCaptures = {b1: false, r1: false, k1: false};
        var wCaptures = {b1: false, r1: false, k1: false};
        for(var i = 0; i < this.whitePawns.length; i++) {
            this.whitePawns[i].xPos = xPos;
            this.whitePawns[i].yPos = yPos;
            this.whitePawns[i].render();
            xPos += 20;
        }
        yPos += 50;
        xPos = 100;
        for(var i = 0; i < this.blackPawns.length; i++) {
           this.blackPawns[i].xPos = xPos;
           this.blackPawns[i].yPos = yPos;
           this.blackPawns[i].render();
           xPos += 20;
        }
        yPos += 50;
        for(var i = 0; i < this.whitePieces.length; i++) {
            var piece = this.whitePieces[i];
            if(piece instanceof Queen) {
                piece.xPos = positions[q];
            }
            if(piece instanceof Bishop) {
                if(!wCaptures[b1]) {
                    wCaptures[b1] = !wCaptures[b1];
                    piece.xPos = positions[b1];
                } else {
                    piece.xPos = positions[b2];
                }
            }
            if(piece instanceof Rook) {
                if(!wCaptures[r1]) {
                    wCaptures[r1] = !wCaptures[r1];
                    piece.xPos = positions[r1];
                } else {
                    piece.xPos = positions[r2];
                }
            }
            if(piece instanceof Knight) {
                if(!wCaptures[k1]) {
                    wCaptures[k1] = !wCaptures[k1];
                    piece.xPos = positions[k1];
                } else {
                    piece.xPos = positions[k2];
                }
            }
            piece.yPos = yPos;
            piece.render();
        }
        y += 50;

        for(var i = 0; i < this.blackPieces.length; i++) {
            var piece = this.blackPieces[i];
            if(piece instanceof Queen) {
                piece.xPos = positions[q];
            }
            if(piece instanceof Bishop) {
                if(!bCaptures[b1]) {
                    bCaptures[b1] = !bCaptures[b1];
                    piece.xPos = positions[b1];
                } else {
                    piece.xPos = positions[b2];
                }
            }
            if(piece instanceof Rook) {
                if(!bCaptures[r1]) {
                    bCaptures[r1] = !bCaptures[r1];
                    piece.xPos = positions[r1];
                } else {
                    piece.xPos = positions[r2];
                }
            }
            if(piece instanceof Knight) {
                if(!bCaptures[k1]) {
                    bCaptures[k1] = !bCaptures[k1];
                    piece.xPos = positions[k1];
                } else {
                    piece.xPos = positions[k2];
                }
            }
        }



    }

    addMove(turn) {
        if(turn == "white") {
            this.whiteMoves.push(this.potentialMove);
        } else {
            this.blackMoves.push(this.potentialMove);
        }
        this.potentialMove = "";
    }

    
}