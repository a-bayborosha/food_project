"use strict";
window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsParent = document.querySelector(".tabheader"),
    tabContent = document.querySelectorAll(".tabcontent");

  function hideElement() {
    tabContent.forEach((element) => {
      element.classList.add("hide");
      element.classList.remove("show");
    });
    tabs.forEach((element) => {
      element.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideElement();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("tabheader__item")) {
      tabs.forEach((tab, i) => {
        if (tab == event.target) {
          hideElement();
          showTabContent(i);
        }
      });
    }
  });

  // countdown
  const deadLine = "2022-03-16";

  //ф-я высчитывающая (ЕДИНОРАЗОВО) сколько осталось общего времени и возвращающая объект
  function timeRemains(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / (1000 * 60)) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  // HELPING FUNCTION
  // adding a zero in front of numbers are less then 10
  const addZero = (num) => {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };
  // getting acsess to DOM elements
  function setTime(element, endTime) {
    const time = document.querySelector(element),
      days = time.querySelector("#days"),
      hours = time.querySelector("#hours"),
      minutes = time.querySelector("#minutes"),
      seconds = time.querySelector("#seconds"),
      timing = setInterval(updateTimer, 1000);
    // calling f() для того чтобы при загрузке страницы не
    // выскакивало дефалтное значение даты
    updateTimer();
    //
    function updateTimer() {
      const t = timeRemains(endTime);

      days.innerHTML = addZero(t.days);
      hours.innerHTML = addZero(t.hours);
      minutes.innerHTML = addZero(t.minutes);
      seconds.innerHTML = addZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timing);
      }
    }
  }

  setTime(".timer", deadLine);
});
