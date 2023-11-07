"Use Strict";
const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temparature = document.querySelector(".temparature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

async function checkweather(city) {
  const api_key = `2368171d6fa4272e08194da2b8c04d2e`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if (weather_data.cod === `404`) {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";

    return;
  }
  location_not_found.style.display = "none";
  weather_body.style.display = "flex";

  temparature.innerHTML = `${Math.round(
    weather_data.main.temp - 273.15
  )}<sup>°C</sup>`;
  console.log(weather_data);
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "img/cloud.png";
      break;
    case "Clear":
      weather_img.src = "img/clear.png";
      break;
    case "Rain":
      weather_img.src = "/img/rain.png";
      break;
    case "Mist":
      weather_img.src = "/img/mist.png";
      break;
    case "Snow":
      weather_img.src = "/img/snow.png";
      break;
  }
}

searchBtn.addEventListener("click", () => {
  checkweather(inputBox.value);
});
