"use strict";

window.addEventListener('DOMContentLoaded', () => {

    const tabContent = document.querySelectorAll('.tabcontent'),
        itemsList = document.querySelectorAll('.tabheader__item'),
        itemsListDiv = document.querySelector('.tabheader__items');


    // Hide Content
    function hideTabContent(elementList_1, elementList_2) {
        elementList_1.forEach(el => {
            el.classList.add('hide');
            el.classList.remove('show', 'fade');

        });
        elementList_2.forEach(el => {
            el.classList.remove('tabheader__item_active');
        })


    }
    hideTabContent(tabContent, itemsList);

    // Show content
    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        itemsList[i].classList.add('tabheader__item_active');
    }
    showTabContent();


    itemsListDiv.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('tabheader__item')) {
            itemsList.forEach((el, i) => {
                if (event.target == el) {
                    hideTabContent(tabContent, itemsList);
                    showTabContent(i);
                }
            })

        }
    })



    // countdown 

    const deadLine = '2022-04-14';

    const addingZero = (num) => {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function createDataObject(endDate) {
        const commonTime = Date.parse(endDate) - Date.parse(new Date()),
            days = Math.floor(commonTime / (1000 * 60 * 60 * 24)),
            hours = Math.floor(commonTime / (1000 * 60 * 60) % 24),
            minutes = Math.floor(commonTime / (1000 * 60) % 60),
            seconds = Math.floor((commonTime / 1000) % 60);
        return {
            commonTime,
            days,
            hours,
            minutes,
            seconds
        }

    }

    function getTimerBlock(qSelector, endDate) {

        const timer = document.querySelector(qSelector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timing = setInterval(startCountdown, 1000);

        startCountdown();

        function startCountdown() {
            const t = createDataObject(endDate);
            days.innerHTML = addingZero(t.days);
            hours.innerHTML = addingZero(t.hours);
            minutes.innerHTML = addingZero(t.minutes);
            seconds.innerHTML = addingZero(t.seconds);
            if (t.commonTime <= 0) {
                clearInterval(timing);
            }
        }

    }

    getTimerBlock('.timer', deadLine);

    //###### modal window ########################################

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modalWIndow = document.querySelector('.modal'),
        closeModal = document.querySelector('[data-close]');

    //open modal window by click
    modalTrigger.forEach(el => {
        el.addEventListener('click', () => {
            modalWIndow.classList.toggle('show');
            document.body.style.overflow = 'hidden'


        });
    });
    // closing
    const closeWindow = () => {
        modalWIndow.classList.toggle('show');
        document.body.style.overflow = ''
    }

    // by clicking on the croos
    closeModal.addEventListener('click', closeWindow);
    // by clicking on the fild
    modalWIndow.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeWindow();
        }
    });
    // by pressing 'escape'
    document.addEventListener('keydown', (event) => {
        if (event.code == 'Escape') {
            closeWindow();
        }
    })

    //#############################################################


})