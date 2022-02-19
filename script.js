const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const baseX = [];
const baseY = [];
let hue = 250;
function baseData() {
    for (let i = 0; i <= Math.PI * 2; i += 0.03) {
        let m = (16 * Math.sin(i) ** 9);
        baseX.push(m);
        let n = (13 * Math.cos(2*i) - 5 * Math.cos(5 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
        baseY.push(n);
    }
}
baseData();


class Base{
    constructor(x,y,vel,col){
        this.x = x;
        this.y = y;
        this.size = 1.5;
        this.vel = vel;
        this.gravity = -0.01;
        this.color = 'hsl(' +hue+ ',100%,50%)';
        this.alpha = 5;
        this.friction = 0.99;
        this.dt = 0 
    }
    draw(){
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.fillStyle = this.color;       
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill(); 
        ctx.closePath();
        ctx.restore();
    }
    update(){
        this.draw();
        this.alpha -= 0.06;
        this.dt += 0.04
        this.vel.x *= this.friction; 
        this.vel.y *= this.friction; 
        this.vel.y += this.gravity*20*Math.cos(this.dt*0.8); 
        this.x += this.vel.x*1.5*Math.sin(this.dt);
        this.y -= this.vel.y*2*Math.cos(this.dt);
    }

}
let bases = [];
function initbase() {
    let basesNum = baseX.length;
    let speed = 0.2;
    for (let i = 0; i < basesNum; i++) {
        bases.push(new Base(canvas.width*0.5,canvas.height*0.6,{
            x:baseX[i]*speed,
            y:-baseY[i]*speed
        },'blue'))
    }
}

function handelbase() {
    bases.forEach((object,index) => {
        if (object.alpha > 0) {
            object.update();  
        }else{
            bases.splice(index,1);
       }
    });
}

let count1 = 0
function handelbaseInit() {
    if (count1%10==0) {
        initbase() 
    }
    if (count1>1000) {
        count1=0
    }else{
        count1++
    }
}

function clear() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0,0,canvas.width,canvas.height);
    hue+=0.2
}


let butX1 = [];
let butY1 = [];

function butterData() {
    for (let a = 0; a <= Math.PI*3; a += 0.15) {
            butX1.push(Math.sin(a)*Math.sin(7/3*a));
            butY1.push(Math.cos(a)*Math.sin(7/3*a));    
    }
}
butterData();

ctx.fillStyle = 'white';
ctx.font = '30px verdana';
ctx.fillText("\u2665",0,50);
//ctx.globalCompositeOperation = 'destination-over';

class Butterfly{
    constructor(x1,y1,vel){
        this.x = x1;
        this.y = y1
        this.size = 12//Math.random()*20+10;
        this.t = 0;
        this.height = this.size*0.7;
        this.hue = Math.random()*255;

        this.color = 'hsl('+hue+',100%,50%)';
        this.speed = Math.random()*1.1+0.3;
        this.flap = Math.random()*0.05+0.01

        this.vel = vel;
        this.gravity = -0.01;
        this.color = 'hsl(' + hue * 2 + ',100%,60%)';
        this.alpha = 1.5;
       
    }
    draw(){
       
        ctx.fillStyle = 'black'
        ctx.strokeStyle = 'gray'
        ctx.beginPath();
        ctx.shadowBlur = 1;
        
        let rad = this.size;
        
        ctx.beginPath();
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0,0,0,0.6)';

        ctx.fillStyle = this.color;
        for (let i = 0;i<butX1.length;i++) {
            ctx.fillStyle = this.color;
            let x = this.x+rad*butX1[i]//*(Math.abs(Math.sin(this.t))+0.4);
            let y = this.y+rad*butY1[i];    
            ctx.lineTo(x,y);  
        } 
      
        ctx.fill();  
        ctx.closePath();
        ctx.shadowBlur = 0;
      
    }

    update1(){
        this.draw()
        this.t += this.flap*2;
        this.alpha -= 0.1
        this.x += this.vel.x;
        this.y -= this.vel.y;
    }
    
    
}

const heartX = [];
const heartY = [];


function HeartData() {
    for (let i = 0; i <= Math.PI * 2; i += 0.07) {
        let m = (16 * Math.sin(i) ** 3);
        heartX.push(m);
        let n = -(13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
        heartY.push(n);
    }
}
HeartData();

let hearts = [];
function initheart() {
    let heartsNum = heartX.length;
    let speed = 0.62;
    for (let i = 0; i < heartsNum; i++) {
        hearts.push(new Butterfly( canvas.width * 0.5, canvas.height * 0.34, {
            x: heartX[i] * speed,
            y: -heartY[i] * speed
        }))
    }
}

function handelheart() {
    hearts.forEach((object, index) => {
        object.update1()
        
        if (object.alpha<0) {
            hearts.splice(index,1)
        }
    });
}

let count = 0
function handelHeartInit() {
    if (count % 10 == 0) {
        initheart()
    }
    if (count > 1000) {
        count = 0
    } else {
        count++
    }
}





let bubbles = [];
let bgbubbles = [];

function addBubble() {
    bubbles.push(new Bubble('rgb(185,224,254)',2.05));
}
function addBgBubble() {
    bgbubbles.push(new Bubble('rgb(156,221,255)',2.0));
}

class Bubble{
    constructor(color,ySpeed){
        this.radius = (Math.random()*150) + 30;
        this.life = true;
        this.x = (Math.random()*window.innerWidth);
        this.y = (Math.random()*20)+window.innerHeight+this.radius;
        this.vy = (Math.random()*0.002+0.001)+ySpeed;
        this.vr = 0;
        this.color = color;
        this.vx = (Math.random()*4)-2;
    }
    update(){
        this.vy += 0.00001;
        this.vr += 0.02;
        this.y -= this.vy;
        this.x += this.vx;
        if (this.radius > 1) {
            this.radius -= this.vr;
        }
        if (this.radius <= 1) {
            this.life = false;
        }
    }
    draw(currentCanvas){
        currentCanvas.beginPath();
        currentCanvas.arc(this.x,this.y,this.radius,0,Math.PI*2);
        currentCanvas.fillStyle = this.color;
        currentCanvas.fill();

    }
}

function handleBubbles() {
    for (let i = bubbles.length-1; i >= 0 ; i--) {
       bubbles[i].update();
       if (!bubbles[i].life) {
           bubbles.splice(i,1);
       }
    }
    for (let i = bgbubbles.length-1; i >= 0 ; i--) {
        bgbubbles[i].update();
        if (!bgbubbles[i].life) {
            bgbubbles.splice(i,1);
        }
     }
     if (bubbles.length < (window.innerWidth/4)) {
         addBubble();
     }
     if (bgbubbles.length < (window.innerWidth/12)) {
        addBgBubble();
    }
}



class Circle {
    constructor(x1, y1) {
        this.x = x1;
        this.y = y1;
        this.size = Math.random() * 0.5 + 0.1;
        this.t = 0;
        this.r = Math.random()*10;
        this.ang = 0;
    }
    draw() {
        ctx.fillStyle = 'lightblue';
        ctx.lineWidth = 0;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        this.ang += 1;
        this.x += 0.05
        this.y += 0.02
        if (this.x>canvas.width) {
            this.x = 0;
        }
        if (this.y>canvas.height) {
            this.y = 0;
        }
    }
}
let cir = [];
function Cir() {
    for (let i = 0; i < 256; i++) {
        cir.push(new Circle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}
Cir();
function handlecircle() {
    for (let i = 0; i < cir.length; i++) {
        cir[i].draw();
        cir[i].update();
    }
}



function animate() {
     clear();
     handlecircle() 
     handelheart()
     handelHeartInit()
     handelbase()
     handelbaseInit()
      
    handleBubbles();
    for (let i = bubbles.length-1; i >= 0 ; i--) {
        bubbles[i].draw(ctx);
     }
     for (let i = bgbubbles.length-1; i >= 0 ; i--) {
         bgbubbles[i].draw(ctx);
      }
     requestAnimationFrame(animate)
 }
 
animate()



