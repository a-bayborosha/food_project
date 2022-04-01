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

    //###### modal window functionality #################################

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modalWIndow = document.querySelector('.modal');
    //closeModal = document.querySelector('[data-close]');

    // open modal
    const openModal = () => {
            modalWIndow.classList.add('show');
            modalWIndow.classList.remove('hide');
            document.body.style.overflow = 'hidden'
            clearInterval(modalTimerId);
        }
        // closing
    const closeWindow = () => {
        modalWIndow.classList.toggle('show');
        document.body.style.overflow = ''
    }

    //open modal window by click
    modalTrigger.forEach(el => {
        el.addEventListener('click', openModal);
    });

    // by clicking on the cross
    // closeModal.addEventListener('click', closeWindow);

    // by clicking on the fild
    modalWIndow.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal') || event.target.getAttribute('data-close') == '') {
            closeWindow();
        }
    });

    // by pressing 'escape'
    document.addEventListener('keydown', (event) => {
        if (event.code == 'Escape') {
            closeWindow();
        }
    })

    //modal on time
    const modalTimerId = setTimeout(openModal, 100000);

    //modal by scrolldown

    const showModalByScrollDown = () => {
        if (document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScrollDown);
        }
    }

    window.addEventListener('scroll', showModalByScrollDown);
    //#############################################################

    // Menu cards with class concept

    class menuCard {
        constructor(src, alt, title, description, price, parentalBlock) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parentalBlock);
            this.index = 29;
        }

        convertToUAH() {
            this.price = this.price * this.index;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }

    }

    new menuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

    new menuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render();

    new menuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render();

    // FORMS

    const forms = document.querySelectorAll('form');

    forms.forEach(el => {
        postData(el);
    });

    const message = {
        loading: '/img/form/spinner.svg',
        success: 'Thanks! Wie will call you soon',
        failure: 'Something gone wrong...'
    }

    function postData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;

            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(statusMessage);
            //form.insertAdjacentElement('afterend', statusMessage);

            const theUrl = 'server.php';
            const request = new XMLHttpRequest();
            request.open('POST', theUrl);
            // когда мы используем связку new XMLHttpRequest()/new FormData(), то заголовок устанавливать не нужно!!!
            // щт устанавливается автоматически;
            //request.setRequestHeader('Content-type', 'multipart/form-data');

            // при отправке серверу данные не в обычном формате, а в формате JSON, нужен заголовок
            const formData = new FormData(form);
            request.setRequestHeader('Content-type', 'application/json');

            const object = {};
            formData.forEach((key, value) => {
                object[key] = value;
            })
            const jsonData = JSON.stringify(object);

            //request.send(formData);
            request.send(jsonData);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000)
                } else {
                    showThanksModal(message.failure);
                }
            })
        })
    }

    function showThanksModal(message) {
        const previousModalDialog = document.querySelector('.modal__dialog');
        previousModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
        <div data-close class="modal__close">×</div>
        <div class="modal__title">${message}</div>
        </div>
        `
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            previousModalDialog.classList.add('show');
            previousModalDialog.classList.remove('hide');
            closeWindow();
        }, 4000)
    }











































})