"use strict";

window.addEventListener('DOMContentLoaded', () => {

    const tabContent = document.querySelectorAll('.tabcontent'),
        itemsList = document.querySelectorAll('.tabheader__item'),
        itemsListDiv = document.querySelector('.tabheader__items');

    console.dir(tabContent);
    //######################################################
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
    //_______________________________________________________
    //######################################################
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

})