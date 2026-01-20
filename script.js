const lat = 44.3167;
const lon = 28.6000;
const widget = document.getElementById("widget");

fetch(https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true)
  .then(r => r.json())
  .then(data => {
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
      rain();
    }

    if ([71,73,75].includes(code)) {
      type = "snowy";
      text = "Снег";
      snow();
    }

    widget.className = "widget " + type;
    document.getElementById("desc").innerText = text;
  });

function rain() {
  for (let i = 0; i < 25; i++) {
    const d = document.createElement("div");
    d.className = "rain";
    d.style.left = Math.random() * 100 + "%";
    d.style.animationDuration = 0.5 + Math.random() + "s";
    widget.appendChild(d);
  }
}

function snow() {
  for (let i = 0; i < 18; i++) {
    const s = document.createElement("div");
    s.className = "snow";
    s.style.left = Math.random() * 100 + "%";
    s.style.animationDuration = 3 + Math.random() * 3 + "s";
    widget.appendChild(s);
  }
}
