//------------------------------1
const time = document.querySelector('.time')
const date = document.querySelector('.date')

function showTime() {
  const timeStamp = new Date()
  const currentDate  = timeStamp.toLocaleTimeString()
  
  time.textContent = currentDate
  setTimeout(showTime, 1000)
  checkBgUpdate()
  showDate()
}

function showDate() {
  const timeStamp = new Date()
  const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
  const currentDate = timeStamp.toLocaleDateString('ru-RU', options)

  date.textContent = currentDate
}

showTime()

//------------------------------2

const greeting = document.querySelector('.greeting')
const hours = new Date().getHours()

function getTimeOfDay() {
  const dayTimeArr = ['night', 'morning', 'afternoon', 'evening']
  const currentDayTime = dayTimeArr[ Math.floor( hours / 6 ) ]

  greeting.textContent = `Good ${currentDayTime},`
  return currentDayTime
}

getTimeOfDay()

const inputUserName = document.querySelector('.greeting-container .name')

function setLocalStorage() {
  localStorage.setItem('name', inputUserName.value)
}

window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    inputUserName.value = localStorage.getItem('name')
  }
}

window.addEventListener('load', getLocalStorage)

//------------------------------3

const body = document.body

function getRandomNum(maxImageCount = 21) {
  let number = Math.floor( Math.random() * maxImageCount)
  return number
} 

let randomNum = getRandomNum()

function setBg(randomNum) {
  if (randomNum === 0) randomNum = 1

  const timeOfDay = getTimeOfDay()
  const bgNum = randomNum <= 9 ? `0${randomNum}` : randomNum
  const src = `url('https://raw.githubusercontent.com/CloseEnoth/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`

  body.style.backgroundImage = src
}

function checkBgUpdate() {
  const date = new Date()

  if(date.getHours() % 6 === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) {
    setBg(randomNum)
  }
}

setBg(randomNum)


const slidePrevBtn = document.querySelector('.slider-icons .slide-prev')
const slideNextBtn = document.querySelector('.slider-icons .slide-next')

function getSlidePrev() {
  if(randomNum == 1) {
    randomNum = 20
    setBg(String(randomNum))
  } else {
    randomNum -= 1
    setBg(String(randomNum))
  }
}

function getSlideNext() {
  if(randomNum == 20) {
    randomNum = 1
    setBg(String(randomNum))
  } else {
    randomNum += 1
    setBg(String(randomNum))
  }
}

slidePrevBtn.addEventListener('click', getSlidePrev)
slideNextBtn.addEventListener('click', getSlideNext)

//------------------------------4

const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const weatherError = document.querySelector('.weather-error')

let inputUserCity = false
const city = document.querySelector('input.city')
city.addEventListener('change', getWeather)

async function getWeather() {
  if (city.value === '' && inputUserCity === false) city.value = 'Minsk'
/*   https://api.openweathermap.org/data/2.5/weather?q=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA&lang=en&appid=43b82b0206e9f8658b953c065b8f8c05&units=metric */
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=43b82b0206e9f8658b953c065b8f8c05&units=metric`
  const res = await fetch(url)
  const data = await res.json()

  if (data.cod === '404' || city.value === '') {
    weatherError.textContent = data.message
    temperature.textContent = ''
    wind.textContent = ''
    humidity.textContent = ''
    weatherDescription.textContent = ''
    inputUserCity = true
    return
  } 
  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${data.weather[0].id}`)
  temperature.textContent = `${data.main.temp} °C`
  weatherDescription.textContent = data.weather[0].description
  wind.textContent = `${data.wind.speed} m/s`
  humidity.textContent = `${data.main.humidity} %`
  inputUserCity = true
}

getWeather()

//------------------------------5

const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')

async function getQuotes() {  
  const quotes = './json/enData.json'
  const res = await fetch(quotes)
  const data = await res.json()
  const currentQuoteNum = getRandomNum(data.length)

  quote.textContent = data[currentQuoteNum].text
  author.textContent = data[currentQuoteNum].author

}
getQuotes()

changeQuote.addEventListener('click', getQuotes)

//------------------------------6

let isPlay = false
let playNum = 0

//const audio = document.querySelector('.audio')
const audio = new Audio(`${playList[playNum].src}`)
//audio.onloadeddata = () => console.log(audio.duration)
const play = document.querySelector('.play')
const playPrevBtn = document.querySelector('.play-prev')
const playNextBtn = document.querySelector('.play-next')

function playAudio() {
  audio.play()
  isPlay = true
  console.log(audio.duration)
}

function stopAudio() {
  audio.pause()
  isPlay = false
}

function changeBtn() {
  play.classList.toggle('pause')
}

function playPause() {
  if (isPlay === false) {
    playAudio()
    changeBtn()
  } else {
    stopAudio()
    changeBtn()
  }
}

function playPrev() {
  if (playNum === 0) {
    playNum = playList.length - 1
    audio.src = playList[playNum].src
    if (isPlay === true) {
      playAudio()
      highlightLi()
    } else {
      highlightLi()
    }
  } else {
    playNum -= 1
    audio.src = playList[playNum].src
    if (isPlay === true) {
      playAudio()
      highlightLi()
    } else {
      highlightLi()
    }
  }
}

function playNext() {
  if (playNum === playList.length - 1) {
    playNum = 0
    audio.src = playList[playNum].src
    if (isPlay === true) {
      playAudio()
      highlightLi()
    } else {
      highlightLi()
    }
  } else {
    playNum += 1 
    audio.src = playList[playNum].src
    if (isPlay === true) {
      playAudio()
      highlightLi()
    } else {
      highlightLi()
    }
  }
}

play.addEventListener('click', playPause)
playPrevBtn.addEventListener('click', playPrev)
playNextBtn.addEventListener('click', playNext)

import playList from './playList.js'

const playListContainer = document.querySelector('.play-list')

function addLi(el, i) {
  const li = document.createElement('li')
  li.classList.add('play-item')
  li.textContent = playList[i].title
  playListContainer.append(li)
}

playList.forEach((item, index) => addLi(item, index))


const ul = Array.from(document.querySelectorAll('.play-item'))

function highlightLi() {
  ul.forEach(el => el.style.color = 'rgba(255, 255, 255, .3)')
  const currentLi = ul[playNum]
  currentLi.style.color = 'rgba(255, 255, 255, 1)'
}
  
highlightLi()

//------------------------------7

const player = document.querySelector('.player')

audio.addEventListener('loadeddata', () => {
  player.querySelector('.player-time .length').textContent = getAudioDuration(audio.duration)
  audio.volume = .75
  
})

function getAudioDuration(audio) {
  let songDur = audio
  let seconds = String(Math.floor(songDur % 60))
  let mins = String(Math.floor(songDur / 60))
  
  if (seconds.length === 1) seconds = `0${seconds}`

  return `${mins}:${seconds}`
}

const timeline = document.querySelector('.player-timeline')
console.log(timeline)
timeline.addEventListener('click', e => {
  const timelineWidth = window.getComputedStyle(timeline).width
  const timeToSeek =   e.offsetX / parseInt(timelineWidth) * audio.duration
  audio.currentTime = timeToSeek
})

function updateProgress() {
  const progress = player.querySelector('.progress')
  progress.style.width = audio.currentTime / audio.duration * 100 + '%'
  document.querySelector('.current').textContent = getAudioDuration(audio.currentTime)
  setTimeout( updateProgress, 500 )
  console.log(progress.style.width)
}

updateProgress()

console.log(audio.duration)
console.log(audio)

function isSongEnded() {
  if (audio.duration === audio.currentTime) playNext()
  setTimeout( isSongEnded, 1000 )
}

isSongEnded()

//------------------------------8

const greetingTranslation = {
  'ru': ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'],
  'en': ['Good night', 'Good morning', 'Good afternoon', 'Good evening']
}

//------------------------------9

