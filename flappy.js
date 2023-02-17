var myGamePiece;
var myObsticales;
var myScore;

        
        function startGame() {
            //kjører mygamearea
            myGameArea.start();
            //sier hvordan boksen skal se ut og hvor den skal være
            myGamePiece = new component(40, 40, "red", 40, 200);
            //sier at myObsticales er en liste
            myObsticales  = [];
            //sier hva my game score skal se ut som 
            myScore = new component("30px", "Consolas", "black", 280, 40, "text");
        }

        
        
        
        
        var myGameArea = {
            //lager et dokument som heter canvas 
            canvas : document.createElement("canvas"),
            //sier hva som skal skje når start skal skje 
            start : function() {
                //hvor stor canvasen skal være
                this.canvas.width = 480;
                this.canvas.height = 480;
                this.context = this.canvas.getContext("2d");
                document.body.insertBefore(this.canvas, document.body.childNodes[0]);
                //lager frameNO og setter den til 0
                this.frameNo = 0;
                //lager en funksjon som heter interval_ms
                this.interval_ms = 10;
                //sier at dokumentet skaal oppdateres hvert 10. sekund
                this.interval = setInterval(updateGameArea, this.interval_ms);
                //sjekker om en knapp har blitt trykket
                window.addEventListener('keydown', function (e) {
                    myGameArea.key = e.keyCode;
                })
                window.addEventListener('keyup', function (e) {
                    myGameArea.key = false;
                })
            }, 
            clear : function(){
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }
        //lager en funksjon som heter component
        function component(width, height, color, x, y, type) {
            this.gamearea = myGameArea;
            this.width = width;
            this.height = height;
            this.speedX = 0.0;
            this.speedY = 0.0;    
            this.x = x;
            this.y = y;
            this.type = type;   
            this.score = 0; 
            this.update = function() {
                ctx = myGameArea.context;
                if (this.type == "text"){
                    ctx.font = this.width + " " + this.height;
                    ctx.fillStyle = color;
                    ctx.fillText(this.text, this.x, this.y);
                } else{
                ctx.fillStyle = color;
                ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.width, this.height);
            }}
            //lager en funksjon som heter newpos
            this.newPos = function() {
                this.x += this.speedX;
                this.y += this.speedY; 
            }
            this.gravity= function(){
                //sier at hvis fulen treffer taket eller guvet 
                //og sier hva som skal skje hvis den treffer 
                if (this.y > 440){
                    this.speedY = -0.8 * this.speedY;
                    this.y = 440-(this.y-440);
                }
                if (this.y < 0) {
                    this.speedY = -0.8*this.speedY
                    this.y = -this.y;
                }       
            }
            this.crashWith = function(otherobj) {
                //lager masse variabler som representerer alle sidene til fugelen
                var myleft = this.x;
                var myright = this.x + (this.width);
                var mytop = this.y;
                var mybottom = this.y + (this.height);
                var otherleft = otherobj.x;
                var otherright = otherobj.x + (otherobj.width);
                var othertop = otherobj.y;
                var otherbottom = otherobj.y + (otherobj.height);
                var crash = true;
                //hvis det er noe spesielt med en av sidene (altsa at den ikke har blitt truffet røret) så 
                //sender den ut at den ikke har blitt truffet 
                if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                    crash = false;
                }
                //hvis ikke så vet den at den har blitt truffet av røret
                return crash;
            }
            
        }
    function speedup(){
        if (myGameArea.interval_ms > 5){
            myGameArea.interval_ms = myGameArea.interval_ms - 1;
        }
        }

    //lager en funksjon som vill cleare set interval og kaller change timer for å endre timeren 
    //så lager en ny timer som oppdateres litt raskere
    function changeTimer (){
        clearInterval(myGameArea.interval);
        myGameArea.interval = setInterval(updateGameArea, myGameArea.interval_ms);
    }
    
    function restart(){
        // sier at hvis en knapp med funksjonen restart bir trykket så vil alt returnere til det det var i starten
        myGamePiece.x = 40
        myGamePiece.y = 200
        myGameArea.interval_ms = 10
        myObsticales=[];
        changeTimer();
        console.log('restart eller død')
    }
            
        
        
        function updateGameArea() {
            var x, height, gap, minHeight, maxHeight, minGap, maxGap;
            //går gjennom alle rørene og sjekkor om du har kræsjet med dem
            for (i = 0; i < myObsticales.length; i += 1) {
                if (myGamePiece.crashWith(myObsticales[i])) {
                    return;
                } 
            }
            //legger til 1 til frameNo hver frame
            myGameArea.frameNo += 1;
            //hvis FrameNo er 1 og everyinterval er 200 så
            if (myGameArea.frameNo == 1 || everyinterval(200)) {
                x = myGameArea.canvas.width;
                //sier at minimum høyde er 20
                minHeight = 20;
                //maximum høyde er 200
                maxHeight = 200;
                //lager et tillfeldig tall som er høyden på røret
                height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
                //minimum mellomromet mellom rørene er 70
                minGap = 70;
                //maximum høyden mellom rørene er 200
                maxGap = 200;
                //lager et tilfeldig tall mellom 70 og 200 
                gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap); 
                //lager et nytt rør som er mellom 20 og 200 høy og har et gap på mellom 70 og 200
                myObsticales.push(new component(10, height, "green", x, 0));
                myObsticales.push(new component(10, x - height - gap, "green", x, height + gap));
            } 
            if (myGameArea.frameNo == 1 || everyinterval(800)){

            }
            //sletter alt på brettet
            myGameArea.clear();
            //setter farten til 0
            myGamePiece.speedX = 0;
            myGamePiece.speedY = myGamePiece.speedY+0.1;    
            //hvis den kanppen som er trykket er den riktige kanppen so vil den gå opp 
            if (myGameArea.key && myGameArea.key == 38) {
                if (myGamePiece.speedY > 0 ) {
                    myGamePiece.speedY = 0;
                }
                myGamePiece.speedY = myGamePiece.speedY - 2; 
                myGameArea.key = false;
            }
            //lager en funksjon som heter everyinterval
            function everyinterval(n) {
                //hvis FrameNo delt på n % 1 == nå så returner du true 
                if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
                //ellers så returen du false
                return false;}
            //går gjennom alle rørene og oppdaterer posisjonene deres
            for (i = 0; i < myObsticales.length;i++ ){
                myObsticales[i].update();
                myObsticales[i].newPos();
                myObsticales[i].speedX= -1;
            }
            //gir høyere score
            myScore.text="SCORE: " + myGameArea.frameNo;
            //oppdaterer posisjonendin
            myGamePiece.newPos();  
            myGamePiece.gravity();  
            myGamePiece.update();
            
        }
        
        