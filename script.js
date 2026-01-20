const tempEl = document.getElementById('temp');
const descEl = document.getElementById('desc');
const timeEl = document.getElementById('time');
const body = document.body;

// Очистка анимаций
function clearAnimations() {
  body.className = '';
  const oldCanvas = document.getElementById('weather-canvas');
  if (oldCanvas) oldCanvas.remove();
}

// Canvas для дождя и снега
function createCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'weather-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  body.appendChild(canvas);
  return canvas;
}

// Анимация дождя
function createRain() {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const drops = [];
  for (let i=0;i<200;i++){
    drops.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height, length: Math.random()*20+10, speed: Math.random()*5+4});
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = 'rgba(174,194,224,0.5)';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    for (let i=0;i<drops.length;i++){
      const d = drops[i];
      ctx.beginPath();
      ctx.moveTo(d.x,d.y);
      ctx.lineTo(d.x,d.y+d.length);
      ctx.stroke();
      d.y += d.speed;
      if(d.y>canvas.height) d.y = -20;
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// Анимация снега
function createSnow() {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const flakes = [];
  for (let i=0;i<200;i++){
    flakes.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*4+1, speed: Math.random()*1+0.5});
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    for (let i=0;i<flakes.length;i++){
      const f = flakes[i];
      ctx.moveTo(f.x,f.y);
      ctx.arc(f.x,f.y,f.r,0,Math.PI*2,true);
    }
    ctx.fill();
    for (let i=0;i<flakes.length;i++){
      const f = flakes[i];
      f.y += f.speed;
      if(f.y>canvas.height) f.y = -5;
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// Обновление времени
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2,'0');
  const minutes = String(now.getMinutes()).padStart(2,'0');
  timeEl.innerText = `${hours}:${minutes}`;
}
setInterval(updateTime, 1000);
updateTime();

// Обновление погоды
function updateWeather() {
  fetch('https://wttr.in/Nevodari?format=j1')
    .then(res => res.json())
    .then(data => {
      const temp = data.current_condition[0].temp_C;
      const weatherDesc = data.current_condition[0].weatherDesc[0].value.toLowerCase();

      tempEl.innerText = temp + '°C';
      descEl.innerText = data.current_condition[0].weatherDesc[0].value;

      clearAnimations();

      if (weatherDesc.includes('sun') || weatherDesc.includes('ясно')) {
        body.style.background = 'linear-gradient(to top, #4facfe, #00f2fe)';
      } else if (weatherDesc.includes('cloud') || weatherDesc.includes('облачно')) {
        body.style.background = 'linear-gradient(to top, #bdc3c7, #2c3e50)';
      } else if (weatherDesc.includes('rain') || weatherDesc.includes('дождь')) {
        body.style.background = 'linear-gradient(to top, #4e5d6c, #1c1c1c)';
        createRain();
      } else if (weatherDesc.includes('snow') || weatherDesc.includes('снег')) {
        body.style.background = 'linear-gradient(to top, #a8c0ff, #3f2b96)';
        createSnow();
      } else if (weatherDesc.includes('storm') || weatherDesc.includes('гроза')) {
        body.style.background = 'linear-gradient(to top, #2c3e50, #000000)';
        createRain();
      } else {
        body.style.background = 'linear-gradient(to top, #bdc3c7, #2c3e50)';
      }
    })
    .catch(err => console.log('Ошибка при запросе погоды:', err));
}

// Запуск
updateWeather();
setInterval(updateWeather, 5*60*1000);
