// координаты Нэводари
const lat = 44.3167;
const lon = 28.6;

// находим виджет
const widget = document.getElementById("widget");

// fetch для Open-Meteo
fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current_weather=true")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const temp = Math.round(data.current_weather.temperature);
    const code = data.current_weather.weathercode;

    document.getElementById("temp").innerText = temp + "°C";

    let type = "clear";
    let text = "Ясно";

    if ([1,2,3].includes(code)) {
      type = "clouds";
      text = "Облачно";
    }

    if ([51,53,55,61,63,65].includes(code)) {
      type = "rainy";
      text = "Дождь";
      makeRain();
    }

    if ([71,73,75].includes(code)) {
      type = "snowy";
      text = "Снег";
      makeSnow();
    }

    widget.className = "widget " + type;
    document.getElementById("desc").innerText = text;
  })
  .catch(function(err){
    console.log("Ошибка fetch:", err);
    document.getElementById("desc").innerText = "Ошибка загрузки";
  });

// функции генерации дождя
function makeRain() {
  for (let i = 0; i < 25; i++) {
    const d = document.createElement("div");
    d.className = "rain";
    d.style.left = Math.random() * 100 + "%";
    d.style.animationDuration = 0.5 + Math.random() + "s";
    widget.appendChild(d);
  }
}

// функции генерации снега
function makeSnow() {
  for (let i = 0; i < 18; i++) {
    const s = document.createElement("div");
    s.className = "snow";
    s.style.left = Math.random() * 100 + "%";
    s.style.animationDuration = 3 + Math.random() * 3 + "s";
    widget.appendChild(s);
  }
}
const now = new Date();
const hour = now.getHours(); // 0-23

// Если ночь (например 19:00 - 6:00)
if (hour >= 19 || hour < 6) {
  widget.classList.add("night");
  createStars(50); // создаём 50 звёзд
}

function createStars(count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDuration = (1 + Math.random() * 2) + "s"; // разное мерцание
    widget.appendChild(star);
  }
}
