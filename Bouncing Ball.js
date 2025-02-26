const bouncezone = document.getElementById('showing_part');
const ctx = bouncezone.getContext('2d');


bouncezone.width = bouncezone.clientWidth
bouncezone.height = bouncezone.clientHeight

const bouncezone_width = bouncezone.width
const bouncezone_height = bouncezone.height

const minX = 0
const minY = 0
const maxX = bouncezone_width
const maxY = bouncezone_height

let boxvx = 4
let boxvy = 4

let ballvx = -7
let ballvy = -6


const box = {
    width : 80,
    height : 80,
    x: Math.ceil(Math.random()*(bouncezone_width - 80 - 0)) + 0,
    y: Math.ceil(Math.random()*(bouncezone_height - 80 - 0)) + 0,
    drawBox() {
        ctx.fillStyle ='#E50046'
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


const ball = {
    x: Math.ceil(Math.random() * (bouncezone_width - 120 - 120)) + 120,
    y: Math.ceil(Math.random() * (bouncezone_height - 120 - 120)) + 120,
    //Math.ceil(Math.random() * (max-min)) + min 이게 공식임
    radius : 120,
    drawball() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#FBF3B9'
        ctx.fill();
        ctx.closePath();
    }
    
}

function changedirection() {
    if(ball.x < minX+ball.radius) {
        ball.x = minX+ball.radius
        ballvx *= -1
    }
    if(ball.x > maxX-ball.radius) {
        ball.x = maxX-ball.radius
        ballvx *= -1
    }
    if(ball.y < minY+ball.radius) {
        ball.y = minY+ball.radius
        ballvy *= -1
    }
    if(ball.y > maxY-ball.radius) {
        ball.y = maxY-ball.radius
        ballvy *= -1
    }

    if(box.x < minX) {
        box.x = minX
        boxvx *= -1
    }
    if(box.x > maxX-box.width) {
        box.x = maxX-box.width
        boxvx *= -1
    }
    if(box.y < minY) {
        box.y = minY
        boxvy *= -1
    }
    if(box.y > maxY-box.height) {
        box.y = maxY-box.height
        boxvy *= -1
    }
}




function collision() {
    if(ball.x >= box.x-ball.radius && ball.x <= box.x+box.width+ball.radius
        && ball.y >= box.y-ball.radius && ball.y <= box.y+box.height+ball.radius) 
    {
        boxvx *= -1
        boxvy *= -1
        ballvx *= -1
        ballvy *= -1
    }
    
    
    else {
        boxvx *= 1
        boxvy *= 1
        ballvx *= 1
        ballvy *= 1
    }
    
    
} 

function boxmoving() {
    ctx.clearRect(0, 0, bouncezone_width, bouncezone_height)
    changedirection();
    collision();
    ball.x += ballvx;
    ball.y += ballvy;
    ball.drawball();
    
    box.x += boxvx;
    box.y += boxvy;
    box.drawBox();
    
    document.querySelector('.explain_area2').innerHTML = (ball.x-120) + "/" + (ball.y-120)
    requestAnimationFrame(boxmoving)
}

document.querySelector('.explain_area').innerHTML 
= bouncezone_width + "/" + bouncezone_height + "/" + bouncezone.clientWidth + "/" + bouncezone.clientHeight
document.querySelector('.explain_area2').innerHTML = box.x + "/" + box.y + "/" + boxvx


boxmoving();
