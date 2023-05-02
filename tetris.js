var myGamePiece;
// starter spillet
function startGame() {
    myGameArea.start();
}

//vi lager en klasse som heter piece som skal hjelpe oss å lage figurer
class Piece {
    //vi sier at når vi lager brikken så må vi ha x og y kordinatet til hoved brikken
    constructor(x, y){
        //vi definerer x og y og lager rotasjon og setter den til 0
        this.x = x
        this.y = y
        this.rotation = 0 
        //her skal vi finne ut hvilken brikke vi skal plasere på brettet
        //først lager vi at tilfeldig tall mellom 1 og 7
        var brick = Math.floor((Math.random() *7)+1);
        //så sjekker vi hvilke tall vi har fått så tegner vi brikken som er det samme som det talet og setter fargen den skal ha 
        if (brick == 1){
            // speilvendt L
            this.bricks = [{x:-1, y:0}, {x:-1, y:1}, {x:0, y:0}, {x:1, y:0}]
            this.color = 1
        }
        else if (brick == 2){
            // strek
            this.bricks = [{x:0, y:-2}, {x:0, y:-1}, {x:0, y:0}, {x:0, y:1}]
            this.color = 5
        }
        else if (brick == 3){
            // pluss symbol minus den nederste boksen  
            this.bricks = [{x:-1, y:0}, {x:0, y:1}, {x:0, y:0}, {x:1, y:0}]
            this.color = 7
        }
        else if (brick == 4){
            // andre L
            this.bricks = [{x:-1, y:0}, {x:+1, y:1}, {x:0, y:0}, {x:1, y:0}]
            this.color = 4
        }
        else if (brick == 5){
            // z
            this.bricks = [{x:-1, y:0}, {x:0, y:1}, {x:0, y:0}, {x:1, y:1}]
            this.color = 3
        }
        else if (brick == 6){
            // speilvent z
            this.bricks = [{x:1, y:0}, {x:0, y:1}, {x:0, y:0}, {x:-1, y:1}]
            this.color = 2
        }
        else if (brick == 7){
            // boksen
            this.bricks = [{x:-1, y:0}, {x:0, y:1}, {x:0, y:0}, {x:-1, y:1}]
            this.color = 6
        }
        // streken [{x:0, y:-2}, {x:0, y:-1}, {x:0, y:0}, {x:0, y:1}] funker 
        // pluss symbol minus den nederste boksen  [{x:-1, y:0}, {x:0, y:0}, {x:1, y:0}, {x:0, y:1}] funker
        // speilvendt L [{x:-1, y:0}, {x:-1, y:1}, {x:0, y:0}, {x:1, y:0}] funker
        // andre L  [{x:-1, y:0}, {x:+1, y:1}, {x:0, y:0}, {x:1, y:0}] funker
        // z [{x:-1, y:0}, {x:0, y:1}, {x:0, y:0}, {x:1, y:1}] funker
        // speilvent z [{x:1, y:0}, {x:0, y:1}, {x:0, y:0}, {x:-1, y:1}] funker
        // boksen [{x:-1, y:0}, {x:0, y:1}, {x:0, y:0}, {x:-1, y:1}] funker 
    }
    //vi lager en funksjon som heter get_coordinats og gir den x, y, og rotasjonen
    get_coordinates(x, y, rotation) {
        //vi lager en tom liste som heter coords
        var coords = []
        //vi lager en for løkke som vil gå gjennom alle tingene i listen
        for(var i = 0; i < this.bricks.length; i++) {
            //vi lager en variabel som heter brick og gir den verdien til this.bricks[i]
            var brick = this.bricks[i];
            //så sjekker vi hva rotasjonen er sånn at vi kan lage brikken riktig
            if (rotation == 0) {
                coords.push({x: x + brick.x, y: y + brick.y})
            } else if (rotation == 1){
                coords.push({x: x + brick.y, y: y - brick.x})
            } else if (rotation == 2) {
                coords.push({x: x - brick.x, y: y - brick.y})
            } else if (rotation == 3){
                coords.push({x: x - brick.y, y: y + brick.x})
            }   
        }  
        return coords
    }
    //lager en funksjon som skal plasere på brettet  
    place_on_board(){
        var coords = this.get_coordinates(this.x, this.y, this.rotation)
        for (var i = 0; i <coords.length; i++) {
            var coord = coords[i];

            myGameArea.board[coord.y][coord.x] = this.color;
        }
    }
    //denne funksjonen skal sjekke om denne brikken kommer til å treffe en annen brikke
    //eller treffer utenfor brettet om vi plaserer den på x, y med rotation
    //isåfal retunerer vi true. ellers så skal vi returnere false
    crashes(x, y, rotation) {  
        var coords = this.get_coordinates(x, y, rotation)
        for (var i = 0; i <coords.length; i++) {
            var coord = coords[i];
            //er brikken utenfor brettet på høyre siden?
            if (coord.x >= myGameArea.boardsizex){
                return true;
            }
            //er brikken utenfor brettet på venstre siden?
            if (coord.x < 0){
                return true;
            }
            //treffer utenfor bunnen av brettet 
            if (coord.y < 0){
                return true; 
            }
            //sjekker om brikken kræsjer med en annen brikke
            if (myGameArea.board[coord.y][coord.x] > 0 ) {
                return true;
            }
        }
        //brikken sin plass er ledig
        return false;
    }
    //skal prøve å flytte brikken et steg ned og hvis den gerier det så skal den returnere true
    //ellers så skal den returnere false og ikke gjøre noe
    movedown(){
        if (this.crashes(this.x, this.y-1, this.rotation) ) {
            return false;
        }
        this.y = this.y-1
        return true;
    }
    //her lager vi funksjonene som vi skal kalle når de forsjellige piltastene er blitt trykket
    moveright(){
        if (this.crashes(this.x+1, this.y, this.rotation) ) {
            return false;
        }
        this.x = this.x +1
    }
    moveleft(){
        if (this.crashes(this.x-1, this.y, this.rotation) ) {
            return false;
        }
        this.x = this.x-1
    }
    changedirec(){
        if (this.crashes(this.x, this.y, (this.rotation+1)%4) ) {
            return false;
        }
        this.rotation = (this.rotation +1) % 4 
    }
}

var myGameArea = {
    //lager canvasen
    canvas : document.createElement("canvas"),
    start : function() {
        //definerer hvor stor canvasen skal være 
        this.boardsizex = 10;
        this.boardsizey = 20;
        this.squaresize = 20;
        this.scorewidth = 100;
        this.scorex = this.boardsizex * this.squaresize
        this.canvas.width = this.scorex + this.scorewidth;
        this.canvas.height = this.boardsizey * this.squaresize;
        this.initgame();

        //lager en liste som sier hva de forsjellige fargene er 
        this.colors = ["gray", "red", "blue", "green", "pink", "cyan", "yellow", "purple"];
    
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        //setter start intervalen mellom oppdaterninger til 500
        this.interval_ms = 500;
        this.interval = setInterval(updateGameArea, this.interval_ms);
        //sier at hvis den registrerer en knapp trykket så vil den sjekke hvilken knapp det er
        //så hvis det er en av piltastene så vil den endre retningen som slangen beveger seg i 
        window.addEventListener('keydown', function (e) {
            if( myGameArea.gameover){
                return
            }
            console.log("Knapp trykket")
            switch(e.key){
                //her sjekker vi om vi ser at noen av disse knappene er blitt trykket og hvis de har blitt trykket så skal vi 
                //kalle en funksjon som sier hva de skal gjøre og derreter oppdatere brettet
                case 'ArrowLeft':
                    myGameArea.piece.moveleft()
                    myGameArea.clear();
                    myGameArea.drawboard()
                    myGameArea.drawpiece()
                    console.log('venstre');
                    break;
                case 'ArrowUp':
                    myGameArea.piece.changedirec()
                    myGameArea.clear();
                    myGameArea.drawboard()
                    myGameArea.drawpiece()
                    console.log('opp');
                    break;
                case 'ArrowRight':
                    myGameArea.piece.moveright()
                    myGameArea.clear();
                    myGameArea.drawboard()
                    myGameArea.drawpiece()
                    console.log('höyre');
                    break;
                case 'ArrowDown':
                    myGameArea.piece.movedown()
                    myGameArea.clear();
                    myGameArea.drawboard()
                    myGameArea.drawpiece()
                    console.log('ned');
                    break;                
            }
            
        })

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    drawsquare : function(x, y, color) {
        //enkelt forklart så er dette en funksjon som hvis vi kaller den så vi kan vi definere hvordan en block skal se ut
        this.context.fillStyle = this.colors[color];
        let new_y = this.boardsizey-1-y
        this.context.fillRect(x*this.squaresize, new_y*this.squaresize, this.squaresize-2, this.squaresize-2);
    },
    // vi lager en funksjon som kommer til å tegne brettet
    drawboard : function(){
        //først så har vi en for løkke som vil gå gjennom alle boardsizey 
        for (let i = 0; i < this.boardsizey; i++) {
            //så lager vi en for løkke som vil gå gjennom alle boardsizex
            for (let j = 0; j < this.boardsizex; j++) {
                // så sier vi at color er board[i][j]
                color = this.board[i][j]
                //hvis color er større en null så skal vi tenge kalle en funkson som skal tegne denne brikken
                if (color > 0){
                    this.drawsquare(j,i,color)
                }
            }
        }
        this.context.fillStyle = "midnightblue";
        this.context.fillRect(this.scorex, 0, this.scorewidth, this.canvas.height);
        this.context.fillStyle = "white";
        this.context.font = "15px Arial";
        this.context.fillText("Score",this.scorex+10,50);
        this.context.fillText(this.score, this.scorex+15,70)
    },

    //vi skal lage en ny funksjon som skal tegne brikken
    drawpiece : function(){
        // vi sier at en ny variabel som heter coords er funksjonen som heter get_coordinates 
        var coords = this.piece.get_coordinates(this.piece.x, this.piece.y, this.piece.rotation)
        //så lager vi en for løkke som går gjennom alle coords og tegner dem 
        for (let i = 0; i < coords.length; i++){
            this.drawsquare(coords[i].x, coords[i].y, this.piece.color)
        }
    }, 
    //vi lager en funksjon som vi skal bruke til å slette hele linjer 
    boardcleanup : function(){
        //først så lager vi en variabel som heter i og sier at den er 0
        let i = 0;
        //så lager vi en while løkke som sier at så lenge i er mindre en this.board.length så skal den kjøre
        while (i < this.board.length){
            // så sjekker vi hva det minste tallet på en linje er
            var mincolor = Math.min(...this.board[i])
            //hvis mincolor er større en null så vet vi at vi har en full linje og så sletter vi den
            if (mincolor > 0){
                this.board.splice(i, 1)
                //hvis ikke så gjør vi i en større sånn at den vil sjekke den nye linje i 
                this.score = this.score + 100
                if (this.interval_ms > 0){
                    this.interval_ms = this.interval_ms - 10;
                    changeTimer();
                }
            }else {
                i = i + 1
            }    
        }
        //så lager vi en ny while løkke som skal lage nye linjer fordi vi nettop slettet noen
        //så lenge this.board.length er mindre en this.boardsizey så vil den kjøre
        while (this.board.length < this.boardsizey + 4) {
            //vi sier at i er lik this.board.length 
            i = this.board.length
            //vi sier at this.board[i] er en tom liste
            this.board[i] = [];
            //så lager vi en for løkke som vil lage x sidene også
            for (let j = 0; j < this.boardsizex; j++) {
                this.board[i][j] = 0;
            }
        }
    },
    initgame : function(){
        //lager et tomt brett 
        this.board = [];
        this.boardcleanup()

        //sier hvor brikken skal komme 
        this.piece = new Piece(5, 19)

        //lager en variabel som heter gameover og setter den til false
        this.gameover = false;

        this.score = 0;
    }
}


//sier at hvis funksjonen change timer blir kalt så skal den sjekke om interval_ms er større en 25 
//er det dette så vil den ikke endre hvor raskt spillet oppdateres ellers så vil det oppdateres 25 ms raskere
function speedup(){
if (myGameArea.interval_ms > 0){
    myGameArea.interval_ms = myGameArea.interval_ms - 100;
}
}

//lager en funksjon som vill cleare set interval og kaller change timer for å endre timeren 
//så lager en ny timer som oppdateres litt raskere
function changeTimer (){
clearInterval(myGameArea.interval);
myGameArea.interval = setInterval(updateGameArea, myGameArea.interval_ms);
}

function restart(){
    myGameArea.initgame();
    myGameArea.interval_ms = 500
    changeTimer();
}


function updateGameArea() {

    if( myGameArea.gameover){
        myGameArea.clear();
        myGameArea.drawboard();
    } else {
        myGameArea.clear(); 
        //gjør sånn at brikken beveger seg hvert 1/2 sekund helt til du treffer bunnen eller en annen brikke
        if(myGameArea.piece.movedown()){
            //vi beveger oss ned med 1
            ; 
        } else {
            //vi stopper brikken og lagrer hvor den var i board
            myGameArea.piece.place_on_board();

            //lager en ny brikke
            myGameArea.piece = new Piece(5, 19)
            
            if (myGameArea.piece.crashes(myGameArea.piece.x, myGameArea.piece.y, myGameArea.piece.rotation)){
                myGameArea.gameover = true  
                
            }
            
        }
        //her tegner vi brettet på nytt og vi sjekker om det er noen linjer som vi skal slette
        myGameArea.drawboard()
        if( myGameArea.gameover == false){
            myGameArea.drawpiece()
        }
        myGameArea.boardcleanup()
        
        
    }
    
    
}