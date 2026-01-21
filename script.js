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

// 🌦 ПОГОДА (НЕВОДАРИ)
function updateWeather() {
  fetch("https://api.open-meteo.com/v1/forecast?latitude=44.3167&longitude=28.6&current_weather=true&temperature_unit=celsius")
    .then(r => r.json())
    .then(data => {
      const w = data.current_weather;
      tempEl.textContent = `${Math.round(w.temperature)}°C`;

      const code = w.weathercode;
      let text = "Облачно";

      if (code === 0) text = "Ясно";
      else if (code < 3) text = "Малооблачно";
      else if (code < 60) text = "Дождь";
      else if (code < 80) text = "Снег";
      else text = "Гроза";

      descEl.textContent = text;
    })
    .catch(() => {
      descEl.textContent = "Ошибка погоды";
    });
}

updateWeather();
setInterval(updateWeather, 5 * 60 * 1000);
