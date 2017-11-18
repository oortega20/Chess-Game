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
    }

}