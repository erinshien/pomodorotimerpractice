const controlBtn = document.querySelector(".control-btn");
const workTimer = document.querySelector("#workTimer");
const breakTimer = document.querySelector("#breakTimer");
const addTimeBtn = document.querySelector("#addTimeBtn");
const circle = document.querySelector("#circleTimer");
const image = document.querySelector("#image");
const workSeconds = 1500;
const breakSeconds = 300;
const increment = 60;
const circumference = 2 * Math.PI * 50;

let isPaused,
  timerInterval,
  currentSeconds,
  currentTimer,
  isWorkPhase,
  currentTotal;

isPaused = true;
isWorkPhase = true;
currentSeconds = workSeconds;
currentTotal = workSeconds;
currentTimer = workTimer;
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

updateTimer(workTimer, workSeconds);
updateTimer(breakTimer, breakSeconds);

function updateTimer(timer, numSeconds) {
  const minutes = Math.floor(numSeconds / 60);
  const seconds = numSeconds % 60;
  const formattedSeconds = seconds.toString().padStart(2, "0");
  timer.innerText = `${minutes}:${formattedSeconds}`;
}

let isFirstClick = true;

controlBtn.addEventListener("click", () => {
  isPaused = !isPaused;

  controlBtn.classList.toggle("control-btn--pause", isPaused);

  if (isFirstClick) {
    controlBtn.style.backgroundImage = 'url("images/pause.svg")';
    image.src = "images/tomato_8629993.png";
    isFirstClick = false;
  } else {
    controlBtn.style.backgroundImage = isPaused
      ? 'url("images/play.svg")'
      : 'url("images/pause.svg")';
  }

  if (isPaused) {
    clearInterval(timerInterval);
  } else {
    timerInterval = setInterval(decrement, 1000);
  }
});

function decrement() {
  if (isPaused) return;

  currentSeconds--;

  updateTimer(currentTimer, currentSeconds);

  const percentage = (currentTotal - currentSeconds) / currentTotal;
  setProgress(percentage);

  if (currentSeconds === 0) {
    clearInterval(timerInterval);
    if (isWorkPhase) {
      isWorkPhase = false;
      image.src = "images/tomato_8629969.png";
      currentSeconds = breakSeconds;
      currentTimer = breakTimer;
      workTimer.classList.remove("timer--active");
      breakTimer.classList.add("timer--active");
      document.body.classList.add("break-phase");
      timerInterval = setInterval(decrement, 1000);
    } else {
      controlBtn.classList.remove("control-btn--pause");
      controlBtn.setAttribute("disabled", "disabled");
      addTimeBtn.setAttribute("disabled", "disabled");
    }
  }
}

function setProgress(newPercentageValue) {
  const offset = circumference - newPercentageValue * circumference;
  circle.style.strokeDashoffset = offset;
}

addTimeBtn.addEventListener("click", () => {
  if (!isPaused) {
    currentSeconds += 60;
    currentTotal += 60;
    updateTimer(currentTimer, currentSeconds);

    const percentage = (currentTotal - currentSeconds) / currentTotal;
    setProgress(percentage);
  }
});

document.addEventListener("DOMContentLoaded", initialDisplayedContent);

function initialDisplayedContent() {
  image.src = "images/tomato_8629896.png";
}
