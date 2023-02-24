import playList from './playList.js';
console.log(playList);
let arr; // audio player

const langMain = document.querySelector('.lang-main'); // language settings
const langControl = document.querySelector('.lang');  // language settings
const langRu = document.querySelector('.ru');        // language settings
const langEn = document.querySelector('.en')        // language settings

const imgMain = document.querySelector('.img-main');  // image settings
const imgControl = document.querySelector('.img');   // image settings
const imgRss = document.querySelector('.RSS');      // image settings
const imgFlikr = document.querySelector('.Flik');  // image settings
const imgUnspl = document.querySelector('.Unsp'); // image settings

const hideMain = document.querySelector('.hiding-main');           // hiding settings
const hideControl = document.querySelector('.hiding');            // hiding settings
const hideWeather = document.querySelector('.hideWeather');      // hiding settings
const hideTime = document.querySelector('.hideTime');           // hiding settings
const hideDate = document.querySelector('.hideDate');          // hiding settings
const hidePlayer = document.querySelector('.hidePlayer');     // hiding settings
const hideQuote = document.querySelector('.hideQuotes');     // hiding settings
const hideGreet = document.querySelector('.hideGreetings'); // hiding settings

const blockWeather = document.querySelector('.weather');
const blockPlayer = document.querySelector('.player');
const blockDate = document.querySelector('.date');
const blockTime = document.querySelector('.time');
const blockGreet = document.querySelector('.greeting-container');
const blockQuote = document.querySelector('.quote-wrapper');

const tagMain = document.querySelector('.tag-main');          // tag settings
const tagDay = document.querySelector('.daytime-tag');       // tag settings
const tagSpace = document.querySelector('.space-tag');      // tag settings
const tagArt = document.querySelector('.art-tag');         // tag settings
const tagNature = document.querySelector('.nature-tag');  // tag settings
const tagControl = document.querySelector('.tag');       // tag settings

const timeCurrent = document.querySelector('.time-current');   // player track time
const timeTotal = document.querySelector('.time-total');      // player track time
const progressBar = document.querySelector('.progress-bar'); // player progress bar

const volumeRange = document.querySelector('.volume'); // volume settings
const muteBtn = document.querySelector('.unmute')     // volume settings

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

const changeQuoteBtn = document.querySelector('.change-quote')        // quotes
const quoteContent = document.querySelector('.quote')                // quotes
const autorContent = document.querySelector('.author')              // quotes

const controlStop = document.querySelector('.stop')                // audio player
const controlPlay = document.querySelector('.play')               // audio player
const controlPrev = document.querySelector('.play-prev')         // audio player
const controlNext = document.querySelector('.play-next')        // audio player
const playlistContainer = document.querySelector('.play-list') // audio player

let isWeatherHide = false;   // hindng flags
let isDateHide = false;     // hindng flags
let isGreetHide = false;   // hindng flags
let isQuoteHide = false   // hindng flags
let isPlayerHide = false // hindng flags
let isTimeHide = false  // hindng flags

let randNum = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
let language = localStorage.getItem('lang')
let isPlayed = false;
let playNum = 0;

/*Audio Player START*/    

const audio = new Audio();
audio.src = playList[playNum].src;
let duration;
audio.addEventListener("loadeddata", () => { // КЛЮЧ К СПАСЕНИЮ НАЙДЕН
    duration = audio.duration;
    let friendly = (duration - (duration % 60)) / 60
    console.log(`${friendly}:${Math.floor(duration % 60)}`)
});

audio.addEventListener('timeupdate', () => {
    let pattern = String(Math.floor(audio.currentTime / 60)) + ':'+ String(Math.floor(audio.currentTime % 60))
    timeCurrent.textContent = pattern;
    progressBar.value = ((audio.currentTime) / (duration / 100));
    console.log(audio.currentTime)
}) 

progressBar.addEventListener('input', ()=> {
    audio.currentTime =(( progressBar.value) * (duration / 100));
})

progressBar.addEventListener('mousedown', ()=> {
    if(isPlayed == true) {
        audio.pause();
    }
})

progressBar.addEventListener('mouseup', ()=> {
    if(isPlayed == true) {
        audio.play();
    }
})

audio.onended = () => {
    arr[playNum].classList.remove('play-item');
    if(playNum == (playList.length - 1)) {
        playNum = 0
    } else {
        playNum += 1;
    } 
    arr[playNum].classList.add('play-item');
    audio.src = playList[playNum].src;
    getTrackTime();
    audio.play();
    console.log('identical work');
    setMarq()
};

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
    arr[playNum].classList.remove('play-item');
    if(playNum == (playList.length - 1) && direct == '1') {  
        playNum = 0;
    } else if(playNum == 0 && direct == '-1') {
        playNum = (playList.length - 1);
    } else {
        playNum += Number(direct);
    } 
    audio.src = playList[playNum].src;
    setMarq();
    getTrackTime();
}

controlPlay.addEventListener('click', () => {
    audioPlayer();
    controlPlay.classList.toggle('pause');
    setMarq();
})

controlStop.addEventListener('click', () => {
    audio.currentTime = 0;
    if(isPlayed == true) {
        audio.pause();
        isPlayed = false;
        controlPlay.classList.toggle('pause');
        arr.forEach((el) => {
            el.classList.remove('play-item');
        });
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
            } else if(isPlayed == true && playList[playNum].title != playList[i].title) {
                liArr.forEach((el) => {
                    el.classList.remove('play-item');
                });
                li.classList.toggle('play-item');
                audio.src = playList[i].src;
                audio.play();
                playNum = i;
            } else {
                isPlayed = true;
                audio.src = playList[i].src;
                controlPlay.classList.toggle('pause');
                audio.play();
                li.classList.toggle('play-item');
                playNum = i;
            }
            setMarq();
            getTrackTime();
        });
        liArr.push(li);
    });
    getTrackTime()
    return arr = liArr
}
window.addEventListener('load', createPlayList)

function audioPlayer() {
    if(isPlayed == false) {
        audio.play();
        isPlayed = true
    } else {
        audio.pause()
        isPlayed = false
    }
    arr[playNum].classList.toggle('play-item');
    console.log(audio.duration)
    getTrackTime();
}

const marquee = document.querySelector('.player-current_track')
function setMarq() {
    marquee.textContent = playList[playNum].title
}

/*Audio Player END*/

/*Advance Player START (progress bar + volume control)*/

let volume = 1;
volumeRange.addEventListener('change', () => {
    console.log(`${volumeRange.value}`);
    if(volumeRange.value == 0) {
        audio.volume = volumeRange.value / 100;
        muteBtn.classList.add('mute');
        console.log(volume)
    } else {
        audio.volume = volumeRange.value / 100;
        volume = audio.volume;
        muteBtn.classList.remove('mute');
    }
})

muteBtn.addEventListener('click', () => {
    if(audio.volume == 0) {
        muteBtn.classList.remove('mute');
        audio.volume = volume;
        volumeRange.value = volume * 100;
        console.log('un')
    } else {
        muteBtn.classList.add('mute');
        audio.volume = 0;
        volumeRange.value = 0;
        console.log('unmute')
    }
})

function getTrackTime() {
    timeTotal.textContent = `/${playList[playNum].duration}`
}

/*Advance Player END*/

/*Quotes START*/

changeQuoteBtn.addEventListener('click', () => {
    getQuotes()
})

async function getQuotes() {  
    let random;
    if(localStorage.getItem('lang') == 'ru') {
        random = Math.floor(Math.random() * (14 - 1 + 1)) + 1;
    } else {
        random = Math.floor(Math.random() * (24 - 15 + 1)) + 15;
    }
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
    weatherIcon.className = 'weather-icon owf';
    if( data.cod == "404") {
        console.log('Error caught!')
        weatherArr.forEach((el) => el.textContent = '')
        errorMsg.textContent = data.message;
    } else if(data.cod == "400") {
        console.log('Error caught!')
        if(language == 'ru') {
            errorMsg.textContent = 'Ведите название города';
        } else {
            errorMsg.textContent = 'Enter City name';
        }
        weatherArr.forEach((el) => el.textContent = '')
    } else {
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        if(language == 'ru'){
            humidity.textContent = `Влажность: ${data.main.humidity} %`
            wind.textContent = `Ветер: ${Math.round(data.wind.speed)} км/ч`;
        } else {
            humidity.textContent = `Humidity: ${data.main.humidity} %`
            wind.textContent = `Wind: ${Math.round(data.wind.speed)} km/h`;
        }
        errorMsg.textContent = '';
    }
}   

/*Weather END*/

/*Slider START*/ 
nextSlide.addEventListener('click', () => {
    if(imgMain.textContent == 'Unsplash') {
        getUnsplLinkToImage();
    } else if(imgMain.textContent == 'Flikr') {
        getFlikrLinkToImage();
    } else {
        slideMoving('1');
        console.log(randNum);
    }
});

previousSlide.addEventListener('click', () => {
    if(imgMain.textContent == 'Unsplash') {
        getUnsplLinkToImage();
    } else if(imgMain.textContent == 'Flikr') {
        getFlikrLinkToImage();
    } else {
        slideMoving('-1');
        console.log(randNum);
    }
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
    localStorage.setItem('imgSourse', imgMain.textContent);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    loadHideState()
  if(localStorage.getItem('name')) {
    userName.value = localStorage.getItem('name');
  }

  if(localStorage.getItem('lang') == null || localStorage.getItem('lang') == '') {
    localStorage.setItem('lang', 'ru');
    langMain.textContent = 'РУ';
  } else if(localStorage.getItem('lang') == 'en') {
    langMain.textContent = 'EN'
  } else {
    langMain.textContent = 'РУ';
  }
  changeTagOptions()
  changeLang(localStorage.getItem('lang'));

  if(localStorage.getItem('imgSourse') == null || localStorage.getItem('imgSourse') == '') {
    localStorage.setItem('imgSourse', 'RSS Github');
    imgMain.textContent = 'RSS Github';
  } else {
    imgMain.textContent = localStorage.getItem('imgSourse');
    changeImage(localStorage.getItem('imgSourse'))
  }

  if(localStorage.getItem('tag') == null || localStorage.getItem('tag') == '') {
    if(localStorage.getItem('lang') == 'ru') {
        tagMain.textContent = 'время дня';
    } else {
        tagMain.textContent = 'daytime';
    }
    localStorage.setItem('tag', 'daytime');
  } else { 
    if(localStorage.getItem('lang') == 'ru') {
        tagMain.textContent = changeLangTag(localStorage.getItem('tag'));
    } else {
        tagMain.textContent = localStorage.getItem('tag');
        changeImage(localStorage.getItem('imgSourse'))
    }
    
  }
  

  if(localStorage.getItem('city') == null || localStorage.getItem('city') == '') {
    if(language == 'ru') {
        localStorage.setItem('city', `Минск`);
    } else {
        localStorage.setItem('city', `Minsk`);
    }
    getWeather();
  }

  if(localStorage.getItem('city')) {
    userCity.value = localStorage.getItem('city');
  } 
//hiding options
  if(localStorage.getItem('isWeatherHide') == null || localStorage.getItem('isWeatherHide') == '') {
    localStorage.setItem('isWeatherHide', 'false');
  }
  if(localStorage.getItem('isDateHide') == null || localStorage.getItem('isDateHide') == '') {
    localStorage.setItem('isDateHide', 'false');
  }
  if(localStorage.getItem('isGreetHide') == null || localStorage.getItem('isGreetHide') == '') {
    localStorage.setItem('isGreetHide', 'false');
  }
  if(localStorage.getItem('isQuoteHide') == null || localStorage.getItem('isQuoteHide') == '') {
    localStorage.setItem('isQuoteHide', 'false');
  }
  if(localStorage.getItem('isPlayerHide') == null || localStorage.getItem('isPlayerHide') == '') {
    localStorage.setItem('isPlayerHide', 'false');
  }
  if(localStorage.getItem('isTimeHide') == null || localStorage.getItem('isTimeHide') == '') {
    localStorage.setItem('isTimeHide', 'false');
  }
  getWeather();
}
window.addEventListener('load', getLocalStorage) ////////////////////////////////////////////////////////
/*local storage END*/ 

/*Greeting sequence START*/ 
function showGreeting() {
    const date = new Date();
    if(language == 'ru') {
        if(date.getHours() > 4 && date.getHours() < 12){
            greeting.textContent = "Доброго утра,"
        } else if (date.getHours() > 11 && date.getHours() < 17){
            greeting.textContent = "Доброго дня,"
        } else if (date.getHours() > 16 && date.getHours() < 23){
            greeting.textContent = "Доброго вечера,"
        } else {
            greeting.textContent = "Доброй ночи,"
        }
    } else {
        if(date.getHours() > 4 && date.getHours() < 12){
            greeting.textContent = "Good morning,"
        } else if (date.getHours() > 11 && date.getHours() < 17){
            greeting.textContent = "Good day,"
        } else if (date.getHours() > 16 && date.getHours() < 23){
            greeting.textContent = "Good evening,"
        } else {
            greeting.textContent = "Good night,"
        }
    }
    
}
showGreeting()
/*Greeting sequence END*/ 


/*Date START*/ 
function showDate() {
    const date = new Date();
    const options = {weekday: 'long', day: 'numeric', month: 'long',  timeZone: 'UTC'};
    let currentDate;
    if(language == 'ru') {
        currentDate = date.toLocaleDateString('ru-Ru', options);
    } else {
        currentDate = date.toLocaleDateString('en-Gb', options);
    }
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
  
/*lang func START*/
function placeHolderLang() {
    if(language == 'ru') {
        document.getElementsByName('holder')[0].placeholder='[Введите имя]';
    } else {
        document.getElementsByName('holder')[0].placeholder='[Enter your name]';
    }
}
placeHolderLang()


langControl.addEventListener('click', () => {
    langControl.classList.toggle('open')
})

langRu.addEventListener('click', () => {
    if(localStorage.getItem('lang') == 'en') {
        langMain.textContent = 'РУ'
        changeLang('ru')
    }
})

langEn.addEventListener('click', () => {
    if(localStorage.getItem('lang') == 'ru') {
        langMain.textContent = 'EN'
        changeLang('en')
    }
})

function changeLangBtn() {
    if(localStorage.getItem('lang') == 'ru') {
        langRu.textContent = 'РУ'
        langEn.textContent = 'АНГ'
    } else {
        langRu.textContent = 'RU'
        langEn.textContent = 'EN'
    }
}

function changeLang(lang) {
    language = lang;
    localStorage.setItem('lang', `${lang}`);
    placeHolderLang();
    showGreeting();
    getWeather();
    setLnagStorage(lang);
    getQuotes();
    settingsBtn();
    changeLangBtn();
    changeTagOptions();
    changeTagMain();
    changeLangHide();
}

function setLnagStorage(lang) {
    if(lang == 'ru' && localStorage.getItem('city') == 'Minsk') {
        localStorage.setItem('city', ``);
        userCity.value = 'Минск';
        localStorage.setItem('city', `Минск`);
    } else if(lang == 'en' && localStorage.getItem('city') == 'Минск') {
        userCity.value = 'Minsk';
        localStorage.setItem('city', `Minsk`);
    }
}

function changeTagOptions() {
    if(localStorage.getItem('lang') == 'ru') {
        tagDay.textContent = 'время дня';
        tagArt.textContent = 'арт';
        tagNature.textContent = 'природа';
        tagSpace.textContent = 'космос';
    } else {
        tagDay.textContent = 'daytime';
        tagArt.textContent = 'art';
        tagNature.textContent = 'nature';
        tagSpace.textContent = 'space';
    }
}

function changeTagMain() {
    if(localStorage.getItem('lang') == 'ru') {
        if(tagMain.textContent == 'nature') {
            tagMain.textContent = 'природа'
        } else if(tagMain.textContent == 'art') {
            tagMain.textContent = 'арт'
        } else if(tagMain.textContent == 'space') {
            tagMain.textContent = 'космос'
        } else if(tagMain.textContent == 'daytime') {
            tagMain.textContent = 'время дня'
        }
    } else if(localStorage.getItem('lang') == 'en') {
        if(tagMain.textContent == 'природа') {
            tagMain.textContent = 'nature'
        } else if(tagMain.textContent == 'арт') {
            tagMain.textContent = 'art'
        } else if(tagMain.textContent == 'космос') {
            tagMain.textContent = 'space'
        } else if(tagMain.textContent == 'время дня') {
            tagMain.textContent = 'daytime'
        }
    }
}


function changeLangTag(value) {
    let result;
    if(value == 'nature') {
        result = 'природа'
    } else if(value == 'art') {
        result = 'арт'
    } else if(value == 'space') {
        result = 'космос'
    } else if(value == 'daytime') {
        result = 'время дня'
    }
    console.log(result)
    return result
}

/*lang func END*/

/*API img func START*/
const FLIKR_KEY = 'd6c7a5956282ffb214b0bc95cc8e43d5';
const UNSPLASH_KEY = 'v24yI7eSpsnACDdfGhvqlOoRAjUKuK6GijDEVUxZ80Q';
//let apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLIKR_KEY}&tags=nature&extras=url_l&format=json&nojsoncallback=1`

imgControl.addEventListener('click', () => {
    imgControl.classList.toggle('open')
})

imgRss.addEventListener('click', () => {
    imgMain.textContent = 'RSS github'
    setBg()
})

imgFlikr.addEventListener('click', () => {
    imgMain.textContent = 'Flikr'
    getFlikrLinkToImage();
})

imgUnspl.addEventListener('click', () => {
    imgMain.textContent = 'Unsplash'
    getUnsplLinkToImage();
})

function changeImage(item) {
    if (item == 'Flikr') {
        getFlikrLinkToImage();
    } else if (item == 'Unsplash') {
        getUnsplLinkToImage();
    } else {
        setBg;
    }
}

async function getFlikrLinkToImage() {
    let tag = getTag();
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLIKR_KEY}&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    let randomImg = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    img.src = data.photos.photo[randomImg].url_l;
    img.onload = () => {      
        documentBody.style.backgroundImage = `url(${img.src})`;
    };
}

async function getUnsplLinkToImage() {
    let tag = getTag();
    const url = `https://api.unsplash.com/photos/random?query=${tag}&client_id=${UNSPLASH_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = data.urls.regular;
    img.onload = () => {      
        documentBody.style.backgroundImage = `url(${img.src})`;
    };
}

/*API img func END*/

/*Settings Start*/

const cogBtn = document.querySelector('.cog');
const settingsMenu = document.querySelector('.settings-wrapper');

tagControl.addEventListener('click', () => {
    tagControl.classList.toggle('open');
})

tagDay.addEventListener('click', () => {
    if(localStorage.getItem('lang') == 'ru') {
        tagMain.textContent = 'время дня';
    } else {
    tagMain.textContent = 'daytime';
    }
    changeTag('daytime');
})

tagSpace.addEventListener('click', () => {
    if(localStorage.getItem('lang') == 'ru') {
        tagMain.textContent = 'космос';
    } else {
        tagMain.textContent = 'space';
    }
    changeTag('space');
})

tagArt.addEventListener('click', () => {
    if(localStorage.getItem('lang') == 'ru') {
        tagMain.textContent = 'арт';
    } else {
        tagMain.textContent = 'art';
    }
    changeTag('art');
})

tagNature.addEventListener('click', () => {
    if(localStorage.getItem('lang') == 'ru') {
        tagMain.textContent = 'природа';
    } else {
        tagMain.textContent = 'nature';
    }
    changeTag('nature');
})

cogBtn.addEventListener('click', () => {
    settingsMenu.classList.toggle('opened');
    settingsBtn();
    changeLangHide();
})

function changeTag(tag) {
    localStorage.setItem('tag', `${tag}`);
    changeImage(localStorage.getItem('imgSourse'));
}

function getTag(){
    if(tagMain.textContent == 'art' || tagMain.textContent == 'арт') {
        return 'art'
    } else if(tagMain.textContent == 'nature' || tagMain.textContent == 'природа') {
        return 'nature'
    } else if(tagMain.textContent == 'space' || tagMain.textContent == 'космос') {
        return 'space'
    } else {
        return getTimeOfDay()
    }
}

hideControl.addEventListener('click', () => {
    hideControl.classList.toggle('open');
})

function settingsBtn() {
    if(localStorage.getItem('lang') == 'ru') {
        hideMain.textContent = 'Скрыть'
    } else {
        hideMain.textContent = 'Hide'
    }
}

hideWeather.addEventListener('click', () => {
    hideOptionsSave(blockWeather, 'isWeatherHide');
    blockWeather.classList.toggle('timeToHide')
})

hideDate.addEventListener('click', () => {
    hideOptionsSave(blockDate, 'isDateHide');
    blockDate.classList.toggle('timeToHide')
})

hideGreet.addEventListener('click', () => {
    hideOptionsSave(blockGreet, 'isGreetHide');
    blockGreet.classList.toggle('timeToHide')
})

hideQuote.addEventListener('click', () => {
    hideOptionsSave(blockQuote, 'isQuoteHide');
    blockQuote.classList.toggle('timeToHide')
})

hidePlayer.addEventListener('click', () => {
    hideOptionsSave(blockPlayer, 'isPlayerHide');
    blockPlayer.classList.toggle('timeToHide')
})

hideTime.addEventListener('click', () => {
    hideOptionsSave(blockTime, 'isTimeHide');
    blockTime.classList.toggle('timeToHide');
})

function loadHideState() { 
    if(localStorage.getItem('isWeatherHide') == 'true') {
        blockWeather.classList.add('timeToHide');
    }
    if(localStorage.getItem('isDateHide') == 'true') {
        blockDate.classList.toggle('timeToHide')
    }
    if(localStorage.getItem('isGreetHide') == 'true') {
        blockGreet.classList.toggle('timeToHide')
    }
    if(localStorage.getItem('isQuoteHide') == 'true') {
        blockQuote.classList.toggle('timeToHide')
    }
    if(localStorage.getItem('isPlayerHide') == 'true') {
        blockPlayer.classList.toggle('timeToHide')
    }
    if(localStorage.getItem('isTimeHide') == 'true') {
        blockTime.classList.toggle('timeToHide');
    }
}

function hideOptionsSave(block, flag) {
    if(block.classList.contains('timeToHide') == false) {
        localStorage.setItem(`${flag}`, 'true');
    } else {
        localStorage.setItem(`${flag}`, 'false')
    }
}

function changeLangHide() {
    if (localStorage.getItem('lang') == 'ru') {
        hideWeather.textContent = 'погоду'
        hideDate.textContent = 'дату'
        hideGreet.textContent = 'приветствие'
        hideQuote.textContent = 'цитаты'
        hidePlayer.textContent = 'плеер'
        hideTime.textContent = 'время'
    } else if (localStorage.getItem('lang') == 'en') {
        hideWeather.textContent = 'weather'
        hideDate.textContent = 'data'
        hideGreet.textContent = 'greetings'
        hideQuote.textContent = 'quotes'
        hidePlayer.textContent = 'player'
        hideTime.textContent = 'time'
    }
}



/*Settings END*/

// доп фунционал будет скорее всего список ссылок(закладки)