// Weather API Key 98e20b6373849b7ff4b0fd01a78b1a87

const time = document.querySelector('.time'); // time
const actualDate = document.querySelector('.date'); // date 

const greeting = document.querySelector('.greeting'); // Greeting
const userame = document.querySelector('.name'); // local storage
const documentBody = document.querySelector('.body'); // slider

const path = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';

const nextSlide = document.querySelector('.slide-next');
const previousSlide = document.querySelector('.slide-prev');

let randNum = Math.floor(Math.random() * (20 - 1 + 1)) + 1;

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
    }
    if(date.getHours() > 11 && date.getHours() < 17){
        return "afternoon/"
    }
    if(date.getHours() > 16 && date.getHours() < 24){
        return "evening/"
    }
    if(date.getHours() > 23 && date.getHours() < 5){
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
    localStorage.setItem('name', userame.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    userame.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)
/*local storage END*/ 

/*Greeting sequence START*/ 
function showGreeting() {
    const date = new Date();
    if(date.getHours() > 4 && date.getHours() < 12){
        greeting.textContent = "Доброго утра,"
    }
    if(date.getHours() > 11 && date.getHours() < 17){
        greeting.textContent = "Доброго дня,"
    }
    if(date.getHours() > 16 && date.getHours() < 24){
        greeting.textContent = "Доброго вечера,"
    }
    if(date.getHours() > 23 && date.getHours() < 5){
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
