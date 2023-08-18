const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`;
// const img_url= `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

const form = document.querySelector("form");
const weather = document.querySelector("#weather");
const search = document.querySelector("#search");
const body = document.querySelector("body");

const getweather = async (city) => {
    weather.innerHTML=`Loading...`
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return showweather(data);
};

const showweather = (data) => {
    if(data.cod=="404"){
        weather.innerHTML= `
        "City not found!"
        `
        return;
    }
  weather.innerHTML = `
    <div>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
    </div>
    <h2>${data.main.temp}℃ </h2>
    <h4><br>${data.weather[0].main}</h4>

`;
if(data.main.temp >40)
    weather.style.backgroundImage = " linear-gradient(rgb(240, 25, 17),#ecac4b)";
else if(data.main.temp >30 && data.main.temp <40)
    weather.style.backgroundImage = " linear-gradient(rgb(238, 155, 32),#f1d349)";
else if(data.main.temp >20 && data.main.temp <30)
    weather.style.backgroundImage = " linear-gradient(rgb(240, 221, 52),#9ee9e5)";
else if(data.main.temp >10 && data.main.temp <20)
    weather.style.backgroundImage = " linear-gradient(rgb(52, 240, 193),#e9f0b0)";
else if(data.main.temp >-5 && data.main.temp <10)
    weather.style.backgroundImage = " linear-gradient(rgb(35, 112, 131),#b0f0e5)";
else
    weather.style.backgroundImage = " linear-gradient(rgb(37, 95, 129),#b6ddf3)";

};

form.addEventListener("submit", function (event) {
  getweather(search.value);
  event.preventDefault(); //form's default nature is to reload as u submit
});
