
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height= window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createStars(count){
    stars = []
    for (let i = 0; i< count; i++){
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius:Math.random() *1.5 + 0.5,
            speed: Math.random() *0.5 + 0.1,
            angle: Math.random() * 2 * Math.PI,
            alpha: Math.random() *0.5 + 0.5
        });
    }
}
createStars(80);

function animateStars(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {

    //twinkle effect
    star.alpha += (Math.random() -0.5) * 0.05;
    star.alpha = Math.max(0.5, Math.min(1, star.alpha));
    


        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;


        if (star.x < 0) star.x =canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y =  canvas.height;
        if (star.y > canvas.height) star.y =0;


        ctx.save();
        ctx.globalAlpha = star.alpha;
        let gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 4);
        gradient.addColorStop(0, "#fff");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 4, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();

    }
    requestAnimationFrame(animateStars);

}
animateStars();


