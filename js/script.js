"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsParent = document.querySelector(".tabheader"),
    tabContent = document.querySelectorAll(".tabcontent__descr");

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
});
