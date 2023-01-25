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
        //            halen                       hodet 
        this.snake = [{x:10, y:10}, {x:9, y:10}, {x:8, y:10}]
        this.direction = {x:-1, y:0}
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 1000);
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


function updateGameArea() {
    myGameArea.clear();

    var snakehead = myGameArea.snake.slice(-1);
    var newhead = {x:snakehead.x+myGameArea.direction.x, y:snakehead.y+myGameArea.direction.y};

    myGameArea.snake.push(newhead);
    myGameArea.snake.shift();

    for(var i = 0; i< myGameArea.snake.length; i++) {
        myGameArea.drawsquare(myGameArea.snake[i].x, myGameArea.snake[i].y, 'red');
    }   
}