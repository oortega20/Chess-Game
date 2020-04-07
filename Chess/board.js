var boardCanvas = document.getElementById("board");
var ctx = boardCanvas.getContext("2d");

var piecesCanvas = document.getElementById("pieces");
var pctx = piecesCanvas.getContext("2d");


class Tile {
    constructor(Piece, col, row, xPos, yPos) {
        this.Piece = Piece;
        this.row = row;
        this.col = col;
        this.xPos = xPos;
        this.yPos = yPos;
        this.div = Tile.createDiv(this);
        this.colorHighlight = "none";
        this.gameState = null;
        Tile.addListeners(this);

    }

    static addListeners(Tile) {
        function onClick(Tile) {
            var g = Tile.getGameState();
            console.log(g);
            if (g.getClicks() == 0) {
                var piece = Tile.getPiece();
                var g = Tile.getGameState();
                if (piece != null && piece.getColor() == g.getTurn()) {
                    var row  = Tile.getRow();
                    var col = Tile.getCol();
                    var board = g.getBoard();
                    var potentialTiles = piece.getPotentialTiles(row, col, g);
                    for(var i = 0; i < potentialTiles.length; i++) {
                        potentialTiles[i].highlightBlue();
                    }
                    g.clickCounts++;
                    g.potentialTiles = potentialTiles;
                    g.priorSquare = Tile;
                }
            } else {
                var tiles = g.getPotentialTiles();
                if(tiles != null) {
                    for(var i = 0; i < tiles.length; i++) {
                // move the piece to the potential tiles
                        if(Tile == tiles[i]) {
                            var oldSquare = g.getPriorSquare();
                            if(g.isValidMove(oldSquare, Tile)) {
                                var piece = oldSquare.getPiece();
                                piece.placePiece(oldSquare, Tile);
                                g.inCheck();
                                g.switchTurn();
                            }
                        }
                        tiles[i].stopHighlighting();
                    }
                }
                g.potentialTiles = null;
                g.priorSquare = null;
                g.clickCounts = 0;
            }
            //TODO: write the magic for making a turn
        }

        function onHover(Tile) {
            Tile.highlightYellow();
        }

        function whenNoLongerHovering(Tile) {
            Tile.stopYellowHighlighting();

        }

        Tile.div.addEventListener("mouseout", function(){whenNoLongerHovering(Tile)});
        Tile.div.addEventListener("click", function() { onClick(Tile) });
        Tile.div.addEventListener("mouseover", function() { onHover(Tile)  });
    }

    //TODO: rewrite this now that i'm caching my Tile objects
    static createDiv(Tile) {
        var dimensions = 60;
        var topBorder = Tile.getYPos();
        var leftBorder = Tile.getXPos();
        var id = Tile.getRow().toString() + Tile.getCol().toString();

        var div = document.createElement(div);
        div.style.position = "absolute";
        div.style.width = dimensions.toString() + "px";
        div.style.height = dimensions.toString() + "px";
        div.style.left = leftBorder + "px";
        div.style.top = topBorder + "px";
        div.style.zIndex = "3";
        document.body.appendChild(div);
        return div;
    }

    getGameState() {
        return this.gameState;
    }

    setPiece(piece) {
        this.Piece = piece;
    }

    getPiece() {
        return this.Piece;
    }


    getRow() {
        return this.row;
    }

    getCol() {
        return this.col;
    }

    getXPos() {
        return this.xPos;
    }

    getYPos() {
        return this.yPos;
    }

    highlightYellow() {
        var d = this.div;
        if(this.colorHighlight == "none") {
            this.colorHighlight = "yellow";
            d.style.backgroundColor = "#f2ff00";
            d.style.opacity = "0.3";
        }

    }

    highlightBlue() {
        this.colorHighlight = "blue"
        var d = this.div;
        d.style.backgroundColor = "blue";
        d.style.opacity = "0.3";
    }

    stopYellowHighlighting() {
        var d = this.div;
        if(this.colorHighlight == "yellow") {
             d.style.opacity = "0.0";
            this.colorHighlight = "none";
        }
    }

    stopHighlighting() {
        var d = this.div;
        d.style.opacity = "0.0";
        this.colorHighlight = "none"
    }

    colorHighlight() {
        return this.colorHighlight;
    }
}
