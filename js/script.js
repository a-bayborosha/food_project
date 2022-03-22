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
  const deadLine = "2022-04-16";

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
    // выскакивало 'дефoлтное' значение даты
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

  // calling modal window
  const btnModal = document.querySelectorAll("[data-modal]"),
    modalClose = document.querySelector("[data-close]"),
    modal = document.querySelector(".modal");

  const closeFunc = () => {
    modal.classList.toggle("show");
    document.body.style.overflow = "";
  };

  const openFunc = () => {
    modal.classList.toggle("show");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimingID);
  };

  btnModal.forEach((el) => {
    el.addEventListener("click", openFunc);
  });

  modalClose.addEventListener("click", closeFunc);

  modal.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("modal")) {
      closeFunc();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
      closeFunc();
    }
  });

  //modal by time
  //const modalTimingID = window.setTimeout(openFunc, 5000);

  // modal by scrolling
  const showModalByScroll = () => {
    if (
      document.documentElement.clientHeight + window.pageYOffset ===
      document.documentElement.scrollHeight
    ) {
      openFunc();
      window.removeEventListener("scroll", showModalByScroll);
    }
  };

  window.addEventListener("scroll", showModalByScroll);

  //################# Menu elements with class ##########

  //const container = document.querySelector("container");
  class Menu {
    constructor(src, alt, title, description, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.index = 29;
      this.toUAH();
    }
    toUAH() {
      this.price = this.price * this.index;
    }
    render() {
      const cartElement = document.createElement("div");

      cartElement.innerHTML = `
        <div class="menu__item">
          <img src=${this.src} alt=${this.alt} />
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">
          ${this.description}
          </div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
        </div>
        `;

      //adding a child HTML element into the parent Block
      this.parent.append(cartElement);
    }
  }

  // creating and rendering Class examples
  new Menu(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
  ).render();
  new Menu(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    14,
    ".menu .container"
  ).render();
  new Menu(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    21,
    ".menu .container"
  ).render();
});
