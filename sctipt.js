import playList from './playList.js';
console.log(playList);
let arr;

const time = document.querySelector('.time');        // time
const actualDate = document.querySelector('.date'); // date 
const API_KEY = '98e20b6373849b7ff4b0fd01a78b1a87';

const greeting = document.querySelector('.greeting');    // Greeting
const userName = document.querySelector('.name');       // local storage
const userCity = document.querySelector('.city');      // local storage
const documentBody = document.querySelector('.body'); // slider

const path = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';

const nextSlide = document.querySelector('.slide-next');      // slider
const previousSlide = document.querySelector('.slide-prev'); // slider

const weatherIcon = document.querySelector('.weather-icon');                 // weather
const temperature = document.querySelector('.temperature');                 // weather
const weatherDescription = document.querySelector('.weather-description'); // weather
const errorMsg = document.querySelector('.weather-error')                 // weather
const wind = document.querySelector('.wind')                             // weather
const humidity = document.querySelector('.humidity')                    // weather

const changeQuoteBtn = document.querySelector('.change-quote')  // quotes
const quoteContent = document.querySelector('.quote')          // quotes
const autorContent = document.querySelector('.author')        // quotes

const controlStop = document.querySelector('.stop')          // audio player
const controlPlay = document.querySelector('.play')         // audio player
const controlPrev = document.querySelector('.play-prev')   // audio player
const controlNext = document.querySelector('.play-next')  // audio player
const playlistContainer = document.querySelector('.play-list')    // audio player


let randNum = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
let language = 'ru'
let isPlayed = false;
let playNum = 0;

/*Audio Player START*/    

const audio = new Audio();
audio.src = playList[playNum].src;

audio.onended = () => {
    if(playNum == (playList.length - 1)) {
        arr[playNum].classList.remove('play-item');
        playNum = 0
        arr[playNum].classList.add('play-item');
        audio.src = playList[playNum].src;
        audio.play();
        console.log('end and next should be first');
    } else {
        arr[playNum].classList.remove('play-item');
        playNum += 1;
        arr[playNum].classList.add('play-item');
        audio.src = playList[playNum].src;
        audio.play();
        console.log(`next is ${playNum}`);
    } 

};

// 1) сделать перелистывание << >> DONE
// 2) формирование плейлиста через JS  
// 3) добавление новых треков
// 4) cделать шкалу прогресса через ползунок, с ежесекундным обновлением
// 5) На него ухо и функцию, которая переводит длительность в проценты или как то так
// 6) сделать бегущую строку как в AIMP
controlPrev.addEventListener('click', () => {
    if(isPlayed == true) {
        isPlayed = false;
        controlPlay.classList.toggle('pause');
        nextTrack('-1');
    } else {
        nextTrack('-1');
    }
    console.log(playNum);
})
controlNext.addEventListener('click', () => {
    if(isPlayed == true) {
        isPlayed = false;
        controlPlay.classList.toggle('pause');
        nextTrack('1');
    } else {
        nextTrack('1');
    }
    console.log(playNum);
})

function nextTrack(direct) {
    if(playNum == (playList.length - 1) && direct == '1') {  
        arr[playNum].classList.remove('play-item');
        playNum = 0;
        audio.src = playList[playNum].src;
    } else if(playNum == 0 && direct == '-1') {
        arr[playNum].classList.remove('play-item');
        playNum = (playList.length - 1);
        audio.src = playList[playNum].src;
    } else {
        arr[playNum].classList.remove('play-item');
        playNum += Number(direct);
        audio.src = playList[playNum].src;
    } 
}

controlPlay.addEventListener('click', () => {
    audioPlayer();
    controlPlay.classList.toggle('pause');
})

controlStop.addEventListener('click', () => {
    if(isPlayed == true) {
        audio.currentTime = 0;
        audio.pause();
        isPlayed = false;
        controlPlay.classList.toggle('pause');
        arr.forEach((el) => {
            el.classList.remove('play-item');
        });
    } else {
        audio.currentTime = 0;
    }
})



function createPlayList() {
    let liArr = [];
    playList.forEach((el, i) => {
        const li = document.createElement('li');
        li.textContent = `${i + 1}) ${playList[i].title}`;
        li.classList.add('player-item');
        playlistContainer.appendChild(li);

        li.addEventListener('click', ()=> {
             if(li.classList.contains('play-item')) { 
                audio.src = playList[i].src;
                li.classList.toggle('play-item');
                isPlayed = false;
                controlPlay.classList.toggle('pause');
                console.log(`same , index = ${playList[playNum].title} and current = ${playList[i].title} ${isPlayed}`);
            } else if(isPlayed == true && playList[playNum].title != playList[i].title) {
                liArr.forEach((el) => {
                    el.classList.remove('play-item');
                });
                li.classList.toggle('play-item');
                audio.src = playList[i].src;
                audio.play();
                playNum = i;
                console.log(`different, index = ${playList[playNum].title} and current = ${playList[i].title} ${isPlayed}`);
            } else {
                isPlayed = true;
                audio.src = playList[i].src;
                controlPlay.classList.toggle('pause');
                audio.play();
                li.classList.toggle('play-item');
                playNum = i;
                console.log(`false, index = ${playList[playNum].title} and current = ${playList[i].title} ${isPlayed}`);
            }
        });
        liArr.push(li);
    });
    return arr = liArr
}
window.addEventListener('load', createPlayList)

function audioPlayer() {
    if(isPlayed == false) {
        audio.play();
        isPlayed = true
        arr[playNum].classList.toggle('play-item');
    } else {
        audio.pause()
        isPlayed = false
        arr[playNum].classList.toggle('play-item');
    }
}
/*Audio Player END*/

/*Quotes START*/

changeQuoteBtn.addEventListener('click', () => {
    getQuotes()
})

async function getQuotes() {  
    let random = Math.floor(Math.random() * (14 - 1 + 1)) + 1;
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    quoteContent.textContent = data[random].text
    autorContent.textContent = data[random].author
  }
  getQuotes();

/*Quotes END*/

/*Weather START*/
userCity.addEventListener('change', () => {
    localStorage.setItem('city', userCity.value);
    getWeather();
})

let weatherArr = [temperature, weatherDescription, humidity, wind]

async function getWeather() {
    let city = localStorage.getItem('city');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language}&appid=${API_KEY}&units=metric`
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
