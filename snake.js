var myGamePiece;

function startGame() {
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.boardsizex = 20;
        this.boardsizey = 20;
        this.squaresize = 20;
        this.canvas.width = this.boardsizex * this.squaresize;
        this.canvas.height = this.boardsizey * this.squaresize;
        this.snake = [{x:10, y:10}, {x:9, y:10}, {x:8, y:10}]
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            console.log("Knapp trykket")
            myGameArea.key = e.keyCode;
        })

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    drawsquare : function(x, y, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x*this.squaresize, y*this.squaresize, this.squaresize-2, this.squaresize-2);
    }
}

/*function component(width, height, color, startx, starty) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.startx = startx;
    this.starty = starty;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    } 
    this.resetPos =function(){
        this.x = this.startx;
        this.y = this.starty;
    }  
    this.resetPos();
} */

function updateGameArea() {
    myGameArea.clear();
    /*først betingelse så hva som skjer*/
/*    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; } 
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; } 
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; } */
    for(var i = 0; i< myGameArea.snake.length; i++) {
        myGameArea.drawsquare(myGameArea.snake[i].x, myGameArea.snake[i].y, 'red');
    }   
}