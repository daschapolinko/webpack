import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { openPopup } from './openPopup';

export function createPrice(src, data) {

    let table = src.querySelector('table');

    let galerySwiper = src.querySelector('.swiper-wrapper');
    const swiper = src.querySelector('.swiper');
    let keys = Object.keys(data[0]);

    const breakpointSwiper = window.matchMedia('(max-width: 767px)');
    let sliders

    function makeElement(tagName, className, text) {
        let element = document.createElement(tagName);
        if (className) {
            element.classList.add(className);
        };
        if (text) {
            element.textContent = text;
        };
        return element;
    };

    function buttonClick() {
        var call = document.querySelector('.call')
        openPopup(call)
    }

    function addSlide(source) {
        let price = makeElement('swiper-slide', 'swiper-slide');
        let item = makeElement('div', 'prices__item');
        item.classList.add('p-item');
        item.classList.add('item');
        for (let i = 0; i < 3; i++) {
            let div = makeElement('div', 'swiper-prices__group');
            let property = makeElement('div', 'swiper-prices__label', keys[i]);
            property.classList.add('swiper-prices__label--property');
            let value = makeElement('div', 'swiper-prices__label', source[keys[i]]);
            div.appendChild(property);
            div.appendChild(value);
            if (i == 2) {
                let button = makeElement('button', 'prices__button', 'Заказать');
                button.classList.add('swiper-prices__button');
                button.classList.add('popup-button');
                button.addEventListener('click', buttonClick);
                div.appendChild(button);
            }
            item.appendChild(div);
        }
        price.appendChild(item)
        galerySwiper.appendChild(price);
    };

    function addHead() {
        let head = makeElement('tr');
        for (let i = 0; i < keys.length; i++) {
            let cell = makeElement('th', '', keys[i]);
            head.appendChild(cell);
        };
        head.appendChild(makeElement('th'));
        table.appendChild(head);
    }

    function addRow(source) {
        var row = makeElement('tr');
        for (let i = 0; i < keys.length; i++) {
            let cell = makeElement('td', '', source[keys[i]]);
            row.appendChild(cell);
        };
        let cell = makeElement('td');
        let button = makeElement('button', 'prices__button', 'Заказать');
        button.classList.add('popup-button');
        button.addEventListener('click', buttonClick);
        cell.appendChild(button);
        row.appendChild(cell);
        table.appendChild(row);
    }

    function createPrices() {
        if (breakpointSwiper.matches) {
            if (galerySwiper.children.length == 0) {
                for (var i = 0; i < data.length; i++) {
                    addSlide(data[i]);
                };
            }
            table.classList.add('hidden-element')
            swiper.classList.remove('hidden-element');
            while (table.children.length > 0) {
                table.children[0].remove();
            }
            sliders = new Swiper('.swiper', {
                direction: 'horizontal',
                spaceBetween: 240,
                slidesPerView: 2,
                initialSlide: 0,
                watchOverflow: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                }
            });
        } else {
            if (swiper.classList.contains('swiper-initialized')) {
                for (let i = 0; i < sliders.length; i++) {
                    let sl = sliders[i]
                    if (sl.slides > 0) {
                        for (slider of sl.slides) {
                            slider.remove()
                        };
                    }
                    sl.destroy(false, false);
                }
            };
            if (table.children.length == 0) {
                addHead();
                for (let i = 0; i < data.length; i++) {
                    addRow(data[i]);
                }
            }
            swiper.classList.add('hidden-element')
            table.classList.remove('hidden-element')
        }
    };
    createPrices();

    window.addEventListener('resize', createPrices)
}