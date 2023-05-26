import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export function createRepair(src, template, data) {

    var templateItem = template.content;
    var item = templateItem.querySelector('.item');

    var galeryItem = src.querySelector('.galery');
    var galeryItems = src.querySelector('.galery-container');

    var templateSwiper = document.querySelector('#swiper-slide').content;
    var slideT = templateSwiper.querySelector('.swiper-slide');
    var galerySwiper = src.querySelector('.swiper-wrapper');
    const swiper = src.querySelector('.swiper')

    var service_btn = src.querySelector('.button')

    const breakpointSwiper = window.matchMedia('(max-width: 767px)');
    let sliders, galeryWidth, servicesCount

    function findGaleryWidth() {
        if (galeryItems.classList.contains('hidden-element')) {
            galeryWidth = swiper.offsetWidth;
        } else {
            galeryWidth = galeryItem.offsetWidth;
        }
        servicesCount = Math.floor(galeryWidth / 234);
        makeGalery();
    }

    function addService(source) {
        var service = item.cloneNode(true);
        var label = service.querySelector('.item__label');
        if (label) {
            label.textContent = source;
        }
        galeryItem.appendChild(service);
    }

    function addServiceClone() {
        var service = item.cloneNode(true);
        service.classList.add('invisible-element')
        galeryItem.appendChild(service)
    }

    function addSlide(source) {
        var slide = slideT.cloneNode(true);
        var service = item.cloneNode(true);
        var label = service.querySelector('.item__label');
        if (label) {
            label.textContent = source;
        }
        slide.appendChild(service);
        galerySwiper.appendChild(slide);
    }

    function makeGalery() {
        if (breakpointSwiper.matches) {
            if (galerySwiper.children.length == 0) {
                for (var i = 0; i < data.length; i++) {
                    addSlide(data[i]);
                };
            }
            galeryItems.classList.add('hidden-element')
            swiper.classList.remove('hidden-element');
            while (galeryItem.children.length > 0) {
                galeryItem.children[0].remove();
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
                swiper.classList.add('hidden-element')
                galeryItems.classList.remove('hidden-element')
            };
            if (service_btn.textContent != 'Скрыть' && galeryItem.children.length != servicesCount) {
                if (galeryItem.children.length > servicesCount) {
                    while (galeryItem.children.length > servicesCount) {
                        galeryItem.children[galeryItem.children.length - 1].remove();
                    }
                } else {
                    for (var i = galeryItem.children.length; i < servicesCount; i++) {
                        addService(data[i]);
                    };
                }
            }
        }
    };

    findGaleryWidth();

    window.addEventListener('resize', findGaleryWidth)

    service_btn.addEventListener('click', function(evt) {
        if (service_btn.textContent == 'Показать все') {
            for (var i = servicesCount; i < data.length; i++) {
                addService(data[i]);
            };
            if (galeryItem.children.length % (servicesCount) != 0) {
                for (var i = 0; i < galeryItem.children.length % servicesCount; i++) {
                    addServiceClone();
                }
            }
            service_btn.textContent = 'Скрыть';
            service_btn.classList.toggle('reverse-button');
        } else {
            while (galeryItem.children.length > servicesCount) {
                galeryItem.children[galeryItem.children.length - 1].remove();
            }
            service_btn.textContent = 'Показать все';
            service_btn.classList.toggle('reverse-button');
        }
    })
}