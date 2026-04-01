const apiKey = "a52b5a90d76db0234793a1650f4507f8";

let historyList = [];

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (city === "") {
    alert("Enter city name");
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("API error");
    }

    const data = await response.json();

   
    document.getElementById("weatherResult").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡 Temperature: ${data.main.temp} °C</p>
      <p>🤒 Feels like: ${data.main.feels_like} °C</p>
      <p>🌤 Condition: ${data.weather[0].main}</p>
      <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
    `;

 
    if (!historyList.includes(city)) {
      historyList.push(city);
      updateHistory();
    }

  } catch (error) {
    document.getElementById("weatherResult").innerHTML =
      "❌ City not found or API issue";
    console.error(error);
  }
}


function updateHistory() {
  const historyEl = document.getElementById("history");
  historyEl.innerHTML = "";

  historyList.forEach((city) => {
    const li = document.createElement("li");
    li.innerText = city;
    li.style.cursor = "pointer";


    li.onclick = () => {
      document.getElementById("cityInput").value = city;
      getWeather();
    };

    historyEl.appendChild(li);
  });
}