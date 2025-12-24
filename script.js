function openFeatures() {
  let allElems = document.querySelectorAll(".elem");
  let fullElem = document.querySelectorAll(".fullelems");
  let fullElemCloseBtn = document.querySelectorAll(".fullelems .close-btn");

  // * full page ko show karne wala logic
  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      fullElem[elem.id].style.display = "block";
    });
  });

  // * full page ko close karne wala logic
  fullElemCloseBtn.forEach((back) => {
    back.addEventListener("click", () => {
      // console.log(back.id);
      fullElem[back.id].style.display = "none";
    });
  });
}
openFeatures();

// ^ todo list
function todoList() {
  let taskForm = document.querySelector(".add-task form");
  let taskFormInput = document.querySelector(".add-task form input");
  let taskFormTextarea = document.querySelector(".add-task form textarea");

  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("task list is empty");
  }

  function rendertask() {
    let allTask = document.querySelector(".all-task");

    let sum = ``;
    currentTask.forEach((e, ind) => {
      sum += ` <div class="task">
                        <div class="task-inner">
                            <h2>${e.task}</h2>
                            <p>${e.details}</p>
                        </div>
                        <button id="${ind}">Mark as complete</button>
                    </div>`;
    });

    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    let markBtn = document.querySelectorAll(".task button");
    markBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        currentTask.splice(btn.id, 1);
        rendertask();
      });
    });
  }
  rendertask();

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    currentTask.push({
      task: taskFormInput.value,
      details: taskFormTextarea.value,
    });
    rendertask();
    taskFormInput.value = "";
    taskFormTextarea.value = "";
  });
}
todoList();

// ^daily planner

function dailyPlanner() {
  let dailyPlanner = document.querySelector(".daily-planner-full");

  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  let hours = Array.from({ length: 18 }, (_, ind) => {
    return `${6 + ind}:00 - ${7 + ind}:00`;
  });
  let allHours = ``;
  hours.forEach((elem, ind) => {
    let savedData = dayPlanData[ind] || "";
    allHours += `<div class="timer">
                    <p>${elem}</p>
                    <input id='${ind}' type="text" placeholder="..." value=${savedData}>
                </div>`;
  });
  dailyPlanner.innerHTML = allHours;

  let allIDailyInputs = document.querySelectorAll(".timer input");
  allIDailyInputs.forEach((e) => {
    e.addEventListener("input", () => {
      dayPlanData[e.id] = e.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

// ^ motivational quotes

function motivational() {
  let motiP = document.querySelector(".motivatoin-wrapper p");
  let motiH = document.querySelector(".motivatoin-wrapper h3");
  async function fetchQuote() {
    let motiData = await fetch("https://api.quotable.io/quotes/random");
    let realData = await motiData.json();

    motiP.textContent = realData[0].content;
    motiH.innerHTML = realData[0].author;
  }
  fetchQuote();
}
// motivational();

// ^ pomadoro timer

function pomadoroTime(){
    let timerh1 = document.querySelector(".pomadoro-timer h1");
let startBtn = document.querySelector(".start-timer");
let pauseBtn = document.querySelector(".pause-timer");
let resetBtn = document.querySelector(".reset-timer");

let isWorkSession = true;

let timerInterval = null;

let totalSeconds = 25 * 60;

function updateTimer() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  timerh1.innerHTML = `${String(minutes).padStart("2", "0")}:${String(
    seconds
  ).padStart("2", "0")}`;
}

function startTimer() {
  clearInterval(timerInterval);

  if (isWorkSession) {
    totalSeconds = 25 * 60;
    timerInterval = setInterval(() => {

      if (totalSeconds > 0) {
        totalSeconds--;
        
      } else {
        isWorkSession = false
        clearInterval(timerInterval);
        
        
      }
      updateTimer();
    }, 1000);
  } else {
    totalSeconds = 5 * 60;
    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        
      } else {
        isWorkSession = true
        clearInterval(timerInterval);
        
      }
      
      updateTimer();
    }, 1000);
  }
}


function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  totalSeconds = 25 * 60;
  clearInterval(timerInterval);
  updateTimer();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

}
pomadoroTime()

// ^daily goals
function dailyGoals() {
  let dailyTaskForm = document.querySelector(".daily-task form");
  let dailyTaskFormInput = document.querySelector(".daily-container .daily-task form input");
  let dailyTaskFormTextarea = document.querySelector(".daily-container .daily-task form textarea");

  let dailyGoals = [];

  if (localStorage.getItem("dailyGoals")) {
    dailyGoals = JSON.parse(localStorage.getItem("dailyGoals"));
  } else {
    console.log("task list is empty");
  }

  function rendertask() {
    let dailyAllTask = document.querySelector(".daily-all-task");

    let sum = ``;
    dailyGoals.forEach((e, ind) => {
      sum += ` <div class="task">
                        <div class="task-inner">
                            <h2>${e.task}</h2>
                            <p>${e.details}</p>
                        </div>
                        <button id="${ind}">Mark as complete</button>
                    </div>`;
    });

    dailyAllTask.innerHTML = sum;
    localStorage.setItem("dailyGoals", JSON.stringify(dailyGoals));

    let dailyMarkBtn = document.querySelectorAll(".daily-task button");
    dailyMarkBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        dailyGoals.splice(btn.id, 1);
        rendertask();
      });
    });
  }
  rendertask();

  dailyTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    dailyGoals.push({
      task: dailyTaskFormInput.value,
      details: dailyTaskFormTextarea.value,
    });
    rendertask();
    dailyTaskFormInput.value = "";
    dailyTaskFormTextarea.value = "";
  });
}
dailyGoals()

// ^ weather widget
let key= '87cf32deedd9442793a70453250305'
let city = "nagpur"

let weatherLocation = document.querySelector(".weather-info .location");
let weatherTemp = document.querySelector(".weather-info .temperature");
let weatherCondition = document.querySelector("#weather-cond");
let dataTime = document.querySelector("#date");

async function weatherWidget() {
  let apiKey = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`)
  let realData = await apiKey.json();
  console.log(realData.current.temp_c);
  weatherLocation.innerHTML = `${realData.location.name}, ${realData.location.country}`;
  weatherTemp.innerHTML = `Temperature: ${realData.current.temp_c}&#176;C`;
  weatherCondition.innerHTML = `Condition: ${realData.current.condition.text}`;

}
weatherWidget()

// ^ weather day time 
function dayTime(){
    let now = new Date();  
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  dataTime.innerHTML = `Time: ${strTime}`;
}
setInterval(dayTime, 1000);

