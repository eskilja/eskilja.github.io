var myGamePiece;
// starter spillet
function startGame() {
    myGameArea.start();
}

var myGameArea = {
    //lager canvasen
    canvas : document.createElement("canvas"),
    start : function() {
        //definerer hvor stor canvasen skal være 
        this.boardsizex = 20;
        this.boardsizey = 20;
        this.squaresize = 20;
        this.canvas.width = this.boardsizex * this.squaresize;
        this.canvas.height = this.boardsizey * this.squaresize;
        //lager en liste med hvor slangen er 
        //            halen                       hodet 
        this.snake = [{x:10, y:10}, {x:9, y:10}, {x:8, y:10}]
        //sier start retningen
        this.direction = {x:-1, y:0}

        this.snakeh = [{x:7, y:10}]

        //sier x og y som maten skal være i og lager en liste med x en og y en
        this.drawfoodx = Math.floor(Math.random() * this.squaresize)
        this.drawfoody = Math.floor(Math.random() * this.squaresize)
        //this.drawfood = [{x:drawfoodx, y:drawfoody}]
    
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        //setter start intervalen mellom oppdaterninger til 500
        this.interval_ms = 500;
        this.interval = setInterval(updateGameArea, this.interval_ms);
        //sier at hvis den registrerer en knapp trykket så vil den sjekke hvilken knapp det er
        //så hvis det er en av piltastene så vil den endre retningen som slangen beveger seg i 
        window.addEventListener('keydown', function (e) {
            console.log("Knapp trykket")
            switch(e.key){
                case 'ArrowLeft':
                    myGameArea.direction = {x:-1, y:0};
                    console.log('venstre');
                    break;
                case 'ArrowUp':
                    myGameArea.direction = {x:0, y:-1};
                    console.log('opp');
                    break;
                case 'ArrowRight':
                    myGameArea.direction = {x:1, y:0};
                    console.log('höyre');
                    break;
                case 'ArrowDown':
                    myGameArea.direction = {x:0, y:1};
                    console.log('ned');
                    break;
                              
            }
            
        })

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    drawsquare : function(x, y, color) {
        //funksjon som hvis vi kaller den så vkan vi definere fhvordan en block skal se ut
        this.context.fillStyle = color;
        this.context.fillRect(x*this.squaresize, y*this.squaresize, this.squaresize-2, this.squaresize-2);
    }
}

function restart(){
    // sier at hvis en knapp med funksjonen restart bir trykket så vil slangen blis satt til start posisjon
    // og maten vil finne en ny posisjon
    myGameArea.snake = [{x:10, y:10}, {x:9, y:10}, {x:8, y:10}]
    myGameArea.drawfoodx = Math.floor(Math.random() * myGameArea.squaresize)
    myGameArea.drawfoody = Math.floor(Math.random() * myGameArea.squaresize)
}

function updateGameArea() {
    myGameArea.clear();

    //definerer newhead og definerer hvor det nye hodet skal være
    var snakehead = myGameArea.snake[myGameArea.snake.length -1];
    var newhead = {x:snakehead.x + myGameArea.direction.x, y:snakehead.y + myGameArea.direction.y};

    // hvis hodet er på en hvis plass så vil plassen endres
    if (newhead.x < 0){
        newhead.x = myGameArea.boardsizex-1;
    }
    if (newhead.x > myGameArea.boardsizex-1){
        newhead.x = 0;
    }
    if (newhead.y < 0){
        newhead.y = myGameArea.boardsizey-1;
    }
    if (newhead.y > myGameArea.boardsizey-1){
        newhead.y = 0;
    }

    //kaller en funksjon som gjør slangen lengere og etter det fjærner halen sån at den ikke blir for lang
    myGameArea.snake.push(newhead);
    myGameArea.snake.shift();
 

    //sier hva maten skal se ut som og hvor den er
    myGameArea.drawsquare(myGameArea.drawfoodx, myGameArea.drawfoody, 'green')

    myGameArea.drawsquare(myGameArea.snakeh.x, myGameArea.snakeh.y, 'blue')




    //sier at hvis slangen sitt hode er på samme blokk som maten så vil maten finne en ny plass og slangen vil bli lengere
    if (newhead.x == myGameArea.drawfoodx && newhead.y == myGameArea.drawfoody){
        myGameArea.snake.push(newhead)
        myGameArea.drawfoodx = Math.floor(Math.random() * myGameArea.squaresize)
        myGameArea.drawfoody = Math.floor(Math.random() * myGameArea.squaresize)
        f1();
    } /*else {
        myGameArea.snake.shift();
    }*/

    //kaller funksjonen drawsquare så lenge snake.leangth er lengere en i 
    for(var i = 0; i < myGameArea.snake.length; i++) {
        //definerer hvordan slangen skal se ut 
        myGameArea.drawsquare(myGameArea.snake[i].x, myGameArea.snake[i].y, 'red');
        /*if (newhead.x == myGameArea.snake[i].x && newhead.y == myGameArea.snake[i].y){
            myGameArea.direction = {x:-0, y:0};
            myGameArea.snake = [{x:10, y:10}, {x:9, y:10}, {x:8, y:10}]
        }*/
    }  

    
    //sier at hvis funksjonen change timer blir kalt så skal den sjekke om interval_ms er større en 50 
    //er det dette så vil den ikke endre hvor raskt spillet oppdateres ellers så vil det oppdateres 25 ms raskere
    function changeTimer(){
        
        if (myGameArea.interval_ms > 50){
            myGameArea.interval_ms = myGameArea.interval_ms - 25;
        }
    }
    //lager en funksjon som vill cleare set interval og kaller change timer for å endre timeren 
    //så lager en ny timer som oppdateres litt raskere
    function f1 (){
        clearInterval(myGameArea.interval);
        changeTimer();
        myGameArea.interval = setInterval(updateGameArea, myGameArea.interval_ms);
    }

}