import gameState from gameState.js
// the different canvases
var boardCanvas = document.getElementById("board");
var ctx = boardCanvas.getContext("2d");

var piecesCanvas = document.getElementById("pieces");
var pctx = piecesCanvas.getContext("2d");

var timerCanvas = document.getElementById("timer");
var tctx = timerCanvas.getContext("2d");

function main() {
    var gameState = new GameState();
    var scoreboard = new Scoreboard();
}
main();
