const bouncezone = document.getElementById('showing_part');
const ctx = bouncezone.getContext('2d');


bouncezone.width = bouncezone.clientWidth
bouncezone.height = bouncezone.clientHeight

const bouncezone_width = bouncezone.width
const bouncezone_height = bouncezone.height

let boxvx = 8
let boxvy = 8

let ballvx = -8
let ballvy = -8


const box = {
    x: Math.floor(Math.random()*(1100) + 20),
    y: Math.floor(Math.random()*(500) + 20),
    width : 80,
    height : 80,
    drawBox() {
        ctx.fillStyle ='#E50046'
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


const ball = {
    x: Math.floor(Math.random()*(1100) + 20),
    y: Math.floor(Math.random()*(500) + 20),
    radius : 120,
    drawball() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#FBF3B9'
        ctx.stroke();
    }
    
}

function changedirection() {
    if(box.x > bouncezone_width - box.width || box.x < 0) {
        boxvx *= -1
    } else if(box.y > bouncezone_height - box.height || box.y < 0) {
        boxvy *= -1
    } else {
        boxvx *= 1
        boxvy *= 1
    }

    if(ball.x > bouncezone_width - ball.radius || ball.x < ball.radius) {
        ballvx *= -1
    } else if(ball.y > bouncezone_height - ball.radius || ball.y < ball.radius) {
        ballvy *= -1
    } else {
        ballvx *= 1
        ballvy *= 1
    }
}

// 구석에 닿았을 떄의 정의 필요

function collision() {
    if((ball.x >= box.x+box.width && ball.x <= box.x + box.width + ball.radius*2 
        && ball.y >= box.y - box.height/2 && ball.y <= box.y + box.height*1.5)
        || (ball.x >= box.x - ball.radius*2 && ball.x <= box.x 
            && ball.y >= box.y - box.height/2 && ball.y <= box.y + box.height*1.5)) 
    {
        boxvx *= -1
        ballvx *= -1
    } else if ((ball.y >= box.y - ball.radius*2 && ball.y <= box.y
        && ball.x >= box.x - box.width/2 && ball.x <= box.x + box.width*1.5)
        || (ball.y >= box.y + box.height && ball.y <= box.y + box.height + ball.radius*2
            && ball.x >= box.x - box.width/2 && ball.x <= box.x + box.width*1.5))
    {
        boxvy *= -1
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
    ball.drawball();
    ball.x += ballvx;
    ball.y += ballvy;
    box.drawBox();
    box.x += boxvx;
    box.y += boxvy;
    changedirection();
    // collision();
    requestAnimationFrame(boxmoving)
}

document.querySelector('.explain_area').innerHTML 
= bouncezone_width + "/" + bouncezone_height + "/" + bouncezone.clientWidth + "/" + bouncezone.clientHeight
document.querySelector('.explain_area2').innerHTML = box.x + "/" + box.y + "/" + boxvx


boxmoving();










//////////////////////////////////////////////////////////////////
