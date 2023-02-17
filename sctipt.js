// Weather API Key 98e20b6373849b7ff4b0fd01a78b1a87
//https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=98e20b6373849b7ff4b0fd01a78b1a87&units=metric
const time = document.querySelector('.time'); // time
const actualDate = document.querySelector('.date'); // date 

const greeting = document.querySelector('.greeting'); // Greeting
const userName = document.querySelector('.name'); // local storage
const userCity = document.querySelector('.city'); // local storage
const documentBody = document.querySelector('.body'); // slider

const path = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';

const nextSlide = document.querySelector('.slide-next');
const previousSlide = document.querySelector('.slide-prev');

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const errorMsg = document.querySelector('.weather-error')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')

let randNum = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
let language = 'ru'

userCity.addEventListener('change', () => {
    localStorage.setItem('city', userCity.value);
    getWeather();
})

/*Weather START*/

let weatherArr = [temperature, weatherDescription, humidity, wind]

async function getWeather() {
    let city = localStorage.getItem('city');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language}&appid=98e20b6373849b7ff4b0fd01a78b1a87&units=metric`
    const res = await fetch(url);
    const data = await res.json(); 
    if( data.cod == "404") {
        console.log('Error caught!')
        weatherIcon.className = 'weather-icon owf';
        weatherArr.forEach((el) => el.textContent = '')
        errorMsg.textContent = data.message;
    } else if(data.cod == "400") {
        console.log('Error caught!')
        weatherIcon.className = 'weather-icon owf';
        errorMsg.textContent = 'Enter City name';
        weatherArr.forEach((el) => el.textContent = '')
    } else {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        humidity.textContent = `Влажность: ${data.main.humidity} %`
        wind.textContent = `Ветер: ${Math.round(data.wind.speed)} м/с`;
        errorMsg.textContent = '';
    }
}   


/*Weather END*/

/*Slider START*/ 

nextSlide.addEventListener('click', () => {
    slideMoving('1');
    console.log(randNum)
});

previousSlide.addEventListener('click', () => {
    slideMoving('-1');
    console.log(randNum)
});

function slideMoving (slide) {
    if(randNum == 20 && slide == '1') {
        randNum = 1
    } else if(randNum == 1 && slide == '-1') {
        randNum = 20
    } else {
        randNum += Number(slide)
    }
    return setBg()
}

function getTimeOfDay() {
    const date = new Date();
    if(date.getHours() > 4 && date.getHours() < 12){
        return "morning/"
    } else if(date.getHours() > 11 && date.getHours() < 17){
        return "afternoon/"
    } else if(date.getHours() > 16 && date.getHours() < 23){
        return "evening/"
    } else {
        return "night/"
    }
}

function setBg() {  
    const img = new Image();
    let dayTime = getTimeOfDay();
    if(String(randNum).length < 2) {
        img.src = `${path}${dayTime}${'0'+randNum}.jpg`
    } else {
        img.src = `${path}${dayTime}${randNum}.jpg`
    }
    img.onload = () => {      
        documentBody.style.backgroundImage = `url(${img.src})`;
    }; 
  }
setBg()
/*Slider END*/

/*local storage START*/ 
function setLocalStorage() {
    localStorage.setItem('name', userName.value);
    localStorage.setItem('city', userCity.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    userName.value = localStorage.getItem('name');
  }

  if(localStorage.getItem('city') == null || localStorage.getItem('city') == '') {
    localStorage.setItem('city', `Minsk`);
    getWeather();
  } 

  if(localStorage.getItem('city')) {
    userCity.value = localStorage.getItem('city');
  } 
  getWeather()
}
window.addEventListener('load', getLocalStorage)
/*local storage END*/ 

/*Greeting sequence START*/ 
function showGreeting() {
    const date = new Date();
    if(date.getHours() > 4 && date.getHours() < 12){
        greeting.textContent = "Доброго утра,"
    } else if (date.getHours() > 11 && date.getHours() < 17){
        greeting.textContent = "Доброго дня,"
    } else if (date.getHours() > 16 && date.getHours() < 23){
        greeting.textContent = "Доброго вечера,"
    } else {
        greeting.textContent = "Доброй ночи,"
    }
}
showGreeting()
/*Greeting sequence END*/ 


/*Date START*/ 
function showDate() {
    const date = new Date();
    const options = {weekday: 'long', day: 'numeric', month: 'long',  timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('ru-Ru', options);
    actualDate.textContent = currentDate;
    setTimeout(showDate,1000)
}
showDate();
/*Date END*/


/*Time START*/ 
function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime,1000)
  }
  showTime();

  /*Time END*/ 
