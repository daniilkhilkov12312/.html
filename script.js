const canvas = document.createElement("canvas");
canvas.id = "weather-canvas";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', ()=>{
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

// Звёзды
function createStars(count){
  const arr = [];
  for(let i=0;i<count;i++){
    arr.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*1.5+0.5,
      phase: Math.random()*Math.PI*2
    });
  }
  return arr;
}

let stars = createStars(200);

function drawStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(s=>{
    const alpha = 0.5 + 0.5*Math.sin(Date.now()/1000 + s.phase); // медленное мерцание
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

// Вызов
function updateBackgroundByTime() {
  const hour = new Date().getHours();

  if (hour >= 19 || hour < 6) {
    // НОЧЬ
    document.body.style.background =
      "linear-gradient(to top, #020111, #0b1d3a)";
    startStars(); // звезды
  } 
  else if (hour >= 6 && hour < 12) {
    // УТРО
    document.body.style.background =
      "linear-gradient(to top, #fbc2eb, #a6c1ee)";
  } 
  else if (hour >= 12 && hour < 15) {
    // ДЕНЬ
    document.body.style.background =
      "linear-gradient(to top, #4facfe, #00f2fe)";
  } 
  else {
    // ВЕЧЕР
    document.body.style.background =
      "linear-gradient(to top, #fa709a, #fee140)";
  }
}

drawStars();

// При обновлении страницы звезды создаются заново, меняя своё положение
updateBackgroundByTime();
setInterval(updateBackgroundByTime, 60 * 1000);
