window.onload=function() {
    gc = document.getElementById('gc');
    w = gc.width; h = gc.height;
    ctx = gc.getContext('2d');

    pads = document.getElementById('pads');
    
    setInterval(update,10);
}

const buttonpos = [
    [600,250],[650,200],[550,200],[600,150],
    [ 50,100],[700,100],[250,100],[500,100],
    [325,200],[425,200],[ 50,300],[600,500],
    [250,350],[250,450],[200,400],[300,400],
    [375,250]];

function update() {
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#000";
    ctx.lineCap = "round";
    ctx.font = "1em Courier";

    var gamepads = navigator.getGamepads();
    var padid = Number(document.getElementById('padid').value);

    if(gamepads.length>0){
        var gp = gamepads[padid]
        var text = "";
        if(gp!=null) {
            for(var i=0;i<4;i++) {
                var txt = gp.axes[i];
                text += `${txt} `
            }
            for(var i=0;i<gp.buttons.length;i++) {
                var txt = gp.buttons[i].value;
                text += `${txt} `
            }
            pads.innerHTML = text;
            
                ctx.clearRect(0,0,w,h);
            var axis1 = maxAxis(gp.axes[0], gp.axes[1]);
            var axis2 = maxAxis(gp.axes[2], gp.axes[3]);
            ctx.lineWidth = "2"; 
                circle(150,200, 100,1);
                circle(150+axis1[0]*50,200+axis1[1]*50, 30,2);
            ctx.lineWidth = "30"; 
                line(  150+axis1[0]*50,200+axis1[1]*50, 150,200);
            ctx.lineWidth = "2"; 
                circle(500,400, 100,1);
                circle(500+axis2[0]*50,400+axis2[1]*50,30,2);
            ctx.lineWidth = "30"; 
                line(  500+axis2[0]*50,400+axis2[1]*50, 500,400);
            
            for(var i=0;i<gp.buttons.length;i++) {
                ctx.lineWidth = "2"; circle(buttonpos[i][0],buttonpos[i][1],25,1);
                circle(buttonpos[i][0],buttonpos[i][1],gp.buttons[i].value*20,2);
            }
        }
    }

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