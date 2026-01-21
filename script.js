const tempEl = document.getElementById("temp");
const descEl = document.getElementById("desc");
const timeEl = document.getElementById("time");
const canvas = document.getElementById("weather-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ⭐ ЗВЁЗДЫ
let stars = [];

function createStars() {
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      phase: Math.random() * Math.PI * 2
    });
  }
}
createStars();

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    const alpha = 0.3 + 0.7 * Math.sin(Date.now() / 1200 + s.phase);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

// ⏰ ВРЕМЯ
function updateTime() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  timeEl.textContent = `${h}:${m}`;
}
setInterval(updateTime, 1000);
updateTime();

// 🌅 ФОН ПО ВРЕМЕНИ
function updateBackground() {
  const hour = new Date().getHours();

  if (hour >= 19 || hour < 6) {
    document.body.style.background =
      "linear-gradient(to top, #020111, #0b1d3a)";
    if (!starsRunning) {
      starsRunning = true;
      createStars();
      drawStars();
    }
  } else if (hour >= 6 && hour < 12) {
    document.body.style.background =
      "linear-gradient(to top, #fbc2eb, #a6c1ee)";
    starsRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else if (hour >= 12 && hour < 15) {
    document.body.style.background =
      "linear-gradient(to top, #4facfe, #00f2fe)";
    starsRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    document.body.style.background =
      "linear-gradient(to top, #fa709a, #fee140)";
    starsRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

let starsRunning = false;
updateBackground();
setInterval(updateBackground, 60 * 1000);

let rainDrops = [];

function createRain() {
  rainDrops = [];
  for(let i=0;i<100;i++){
    rainDrops.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      l: Math.random()*20+10,
      speed: Math.random()*4+4
    });
  }
}

function drawRain(){
  if(currentWeather !== "Дождь") return; // рисуем только при дожде
  ctx.clearRect(0,0,canvas.width,canvas.height);
  stars.forEach(s=>{
    const alpha = 0.3 + 0.7 * Math.sin(Date.now() / 1200 + s.phase);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.strokeStyle = "rgba(174,194,224,0.5)";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  rainDrops.forEach(r=>{
    ctx.beginPath();
    ctx.moveTo(r.x,r.y);
    ctx.lineTo(r.x,r.y+r.l);
    ctx.stroke();
    r.y += r.speed;
    if(r.y>canvas.height) r.y = -20;
  });
  if(text === "Дождь") {
  document.body.style.background = "linear-gradient(to top,#6e7f80,#a0a0a0)";
  createRain();
  drawRain();
  currentWeather = "Дождь";
    let currentWeather = "";

}

  requestAnimationFrame(drawRain);
}
