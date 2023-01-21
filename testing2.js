const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');

const circle = {
    x: 200,
    y: 200,
    size: 30,
    dx: 5,
    dy: 4
}

const player = {
    w: 50,
    h: 70,
    x: 20,
    y: 200,
    speed: 5,
    dx: 0,
    dy: 0,
    color: red
}

function drawcircle(){
    ctx.beginpath();
    ctx.arc(circle.x, circle.y, cirlce.size, 0, Math.pi*2);
    ctx.fillstyle = 'blue';
    ctx.fill();
}

function drawplayer(){
    ctx.drawImage(player.x, player.y, player.color, player.w, player.h);

}

function clear(){
    ctx.clearReact(0, 0, canvas.width, canvas.height);
}

function newPost(){
    player.x += player.dx;
    player.y += player.dy;

    detectWalls();
}

function detectWalls(){
    //opp
    if(player.y<0){
        player.y = 0;
    }

    //bunn
    if(player.y + player.h > canvas.height) {
        player.y = canvas.height - player.h;
    }
}

function update(){
    //ctx.clearReact(0,0, canvas.Width, canvsa.height);

    clear();
    drawplayer();
    newPost();

    drawcircle();

    //tegner på nytt
    circle.x += circle.dx

    //kolisjon sider
    if(circle.x + circle.size > canvas.Width || circle.x - circle.size < 0) {
        circle.dx *= -1 
    }

    //kolisjon top og bunn
    if(circle.y +circle.size > canvas.height || circle.y - circle.size < 0){
        circle.dy *-1;
    }

    requestAnimationFrame(update);
}

function moveUp(){
    player.dy = -player.speed
}

function moveDown(){
    player.dy = player.speed
}

function keydown(e){
    if(e.key == 'ArrowUp'  || e.key == 'Up'){
        moveUp();
    } else if (e.key == 'ArrowDown' || e.key == 'Down'){
        moveDown();
    }
}

function keyup (e) {
    if(
        e.key == 'Up' ||
        e.key == 'ArrowUp' ||
        e.key == 'Down' ||
        e.key == 'ArrowDown' 
    )
    {
        player.dx = 0;
        player.dy = 0;
    }
}

update();

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);