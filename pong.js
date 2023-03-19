var myGamePiece;
var myGamePiece2;
        
        function startGame() {
            //kjører mygamearea
            myGameArea.start();
            //sier hvordan boksen skal se ut
            myGamePiece = new component(15, 50, "red", 20, 120);
            myGamePiece2 = new component(15, 50, "blue", 140, 120);
        }
        
        var myGameArea = {
            canvas : document.createElement("canvas"),
            start : function() {
                //hvor stor canvasen skal være
                this.canvas.width = 480;
                this.canvas.height = 480;
                this.context = this.canvas.getContext("2d");
                document.body.insertBefore(this.canvas, document.body.childNodes[0]);
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
        
        function component(width, height, color, x, y) {
            this.gamearea = myGameArea;
            this.width = width;
            this.height = height;
            this.speedX = 0;
            this.speedY = 0;    
            this.x = x;
            this.y = y;    
            this.update = function() {
                ctx = myGameArea.context;
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
            this.newPos = function() {
                this.x += this.speedX;
                this.y += this.speedY;        
            }
        }
        
        function updateGameArea() {
            //sletter alt på brettet
            myGameArea.clear();
            //setter default farten til 0
            myGamePiece.speedX = 0;
            myGamePiece.speedY = 0;    
            //hvis den kanppen som er trykket er en av dusse to so vil den gå opp eller ned
            if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; }
            if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; }
            if (myGameArea.key && myGameArea.key == 65) {myGamePiece.speedY = -1; }
            if (myGameArea.key && myGameArea.key == 99) {myGamePiece.speedY = 1; }
            //så vil den oppdatere posisjonen
            myGamePiece.newPos();    
            myGamePiece.update();
        
        }
        