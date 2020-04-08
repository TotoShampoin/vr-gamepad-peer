window.onload=function() {
    gc = document.getElementById('gc');
    w = gc.width; h = gc.height;
    ctx = gc.getContext('2d');

    fs = 0;
    
    setInterval(update,10);
    gc.addEventListener("click",function(){
        if(fs) {
            closeFullscreen(gc);
            fs = 0;
        } else {
            openFullscreen(gc);
            fs = 1;
        }
    });
}

const buttonpos = [
    [600,250],[650,200],[550,200],[600,150],
    [ 50,100],[700,100],[250,100],[500,100],
    [325,200],[425,200],[ 50,300],[600,500],
    [250,350],[250,450],[200,400],[300,400],
    [375,250]];

function update() {
    ctx.fillStyle = "#508";
    ctx.fillRect(0,0,w,h);
    
    ctx.fillStyle = "#F8C";
    ctx.strokeStyle = "#F8C";
    ctx.lineCap = "round";
    ctx.font = "1em Courier";

    plotGamepad(45, 177);
    plotGamepad(835, 177);

}

function line(x1,y1,x2,y2) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}

function circle(x,y,r,type) {
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    if(type%2)
        ctx.stroke();
    if((type-(type%2))/2)
        ctx.fill();
}

function maxAxis(x, y) {
    if(Math.sqrt(x**2+y**2) > 1) {
        var ang = Math.atan2(y,x);
        return [Math.cos(ang), Math.sin(ang)];
    } else {
        return [x, y];
    }
}

function plotGamepad(x, y) {
    /* ctx.lineWidth = 1;
    ctx.strokeRect(x,y,400,300); */
    ctx.scale(.5, .5);
    x = x*2+20; y = y*2;
    var pads = (document.getElementById('pads').innerHTML).split(' ');
    var gp = {};
    gp.axes = [];
    for(var i=0;i<4;i++) {
        gp.axes[i] = Number(pads[i]);
    }
    gp.buttons = [];
    for(var i=0;i<17;i++) {
        gp.buttons[i] = Number(pads[i+4]);
    }
    var axis1 = maxAxis(gp.axes[0], gp.axes[1]);
    var axis2 = maxAxis(gp.axes[2], gp.axes[3]);
    plotStick(x+150,y+200,axis1);
    plotStick(x+500,y+400,axis2);
    
    for(var i=0;i<gp.buttons.length;i++) {
        ctx.lineWidth = "6"; 
        circle(x+buttonpos[i][0],y+buttonpos[i][1], 25,1);
        circle(x+buttonpos[i][0],y+buttonpos[i][1], gp.buttons[i]*20,2);
    }
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function plotStick(x,y,axis) {
    ctx.lineWidth = "6"; 
        circle(x,y, 100,1);
        circle(x+axis[0]*50,y+axis[1]*50, 35,2);
    ctx.lineWidth = "30"; 
        line(x+axis[0]*50,y+axis[1]*50, x,y);
}

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

function closeFullscreen(elem) {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
}