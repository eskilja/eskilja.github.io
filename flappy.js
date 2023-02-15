var myGamePiece;
        
        function startGame() {
            //kjører mygamearea
            myGameArea.start();
            //sier hvordan boksen skal se ut og hvor den skal være
            myGamePiece = new component(40, 40, "red", 40, 200);
            
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
                //sier at dokumentet skaal oppdateres hvert 10. sekund
                this.interval = setInterval(updateGameArea, 10);
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
        function component(width, height, color, x, y) {
            this.gamearea = myGameArea;
            this.width = width;
            this.height = height;
            this.speedX = 0.0;
            this.speedY = 0.0;    
            this.x = x;
            this.y = y;    
            this.update = function() {
                ctx = myGameArea.context;
                ctx.fillStyle = color;
                ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.width, this.height);
            }
            //lager en funksjon som heter newpos
            this.newPos = function() {
                this.x += this.speedX;
                this.y += this.speedY; 
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
        }
        
        function updateGameArea() {
            //sletter alt på brettet
            myGameArea.clear();
            //setter farten til 0
            myGamePiece.speedX = 0;
            myGamePiece.speedY = myGamePiece.speedY+0.1;    
            //hvis den kanppen som er trykket er en av dusse to so vil den gå opp eller ned
            if (myGameArea.key && myGameArea.key == 38) {
                if (myGamePiece.speedY > 0 ) {
                    myGamePiece.speedY = 0;
                }
                myGamePiece.speedY = myGamePiece.speedY - 2; 
                myGameArea.key = false;
            }
            //så vil den oppdatere posisjonen
            myGamePiece.newPos();    
            myGamePiece.update();
        
        }
        
        