const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const time = document.getElementById("time");
const { app, Menu, Tray } = require("electron");
let timer; // setInterval 아이디 저장용
let running; // 시계 동작중 여부

// clock

let timeObj = {
  tt: 0,
  mm: 0,
  ss: 0,
};

let strTimeObj = {
  str_tt: "00",
  str_mm: "00",
  str_ss: "00",
};

const notification = {
  title: "temp",
  body: "조금만 더 파이팅!",
};

const run = () => {
  let studyTime = document.getElementById("study").value;
  let restTime = document.getElementById("rest").value;

  if (running) return -1;
  timer = setInterval(() => {
    timeObj.ss++;
    strTimeObj.str_ss =
      timeObj.ss < 10 ? "0" + timeObj.ss.toString() : timeObj.ss.toString();
    strTimeObj.str_mm =
      timeObj.mm < 10 ? "0" + timeObj.mm.toString() : timeObj.mm.toString();
    strTimeObj.str_tt =
      timeObj.tt < 10 ? "0" + timeObj.tt.toString() : timeObj.tt.toString();
    time.innerHTML = `${strTimeObj.str_tt} : ${strTimeObj.str_mm} : ${strTimeObj.str_ss}`;

    if (timeObj.ss === 59) {
      if (timeObj.mm === 59) {
        timeObj.tt++;
        timeObj.mm = 0;
        timeObj.ss = -1;
      } else {
        timeObj.mm++;
        timeObj.ss = -1;
      }
    }

    if (
      timeObj.ss === 0 &&
      timeObj.mm !== 0 &&
      timeObj.mm % parseInt(studyTime) === 0
    ) {
      const myNotification = new window.Notification(
        `${timeObj.mm} 분 경과`,
        notification
      );
      pause();
      setTimeout(() => {
        run();
      }, parseInt(restTime) * 60000);
      myNotification.onclick = () => {
        console.log("Notification clicked");
      };
    }
  }, 1000);
  running = 1;
};

const pause = () => {
  //window.open("settings.html", "_blank", "nodeIntegration=no");
  clearInterval(timer);
  running = 0;
};

startBtn.addEventListener("click", () => {
  run();
});
pauseBtn.addEventListener("click", () => {
  pause();
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  running = 0;
  time.innerHTML = "00 : 00 : 00";
  timeObj.tt = 0;
  timeObj.mm = 0;
  timeObj.ss = 0;
  timer = 0;
});
