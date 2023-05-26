import '../scss/style.scss'
import { services, repairs, prices } from './sources.js'
import { createBrands } from "./createBrands";
import { createRepair } from './createRepair';
import { createPrice } from './createPrices.js';
import { openPopup } from './openPopup';
import { createMenu } from './createMenu';

var services_section = document.querySelector('.services');
var services_section_tmpl = document.querySelector('#services__item');
var repair_section = document.querySelector('.repair');
var repair_section_tmpl = document.querySelector('#repair__item');
var prices_section = document.querySelector('.prices');

var call_popup = document.querySelector('.call');
var feedback_popup = document.querySelector('.feedback');
var call_buttons = document.querySelectorAll('.call-button');
var feedback_buttons = document.querySelectorAll('.feedback-button');

createBrands(services_section, services_section_tmpl, services);
createRepair(repair_section, repair_section_tmpl, repairs);
createPrice(prices_section, prices);

for (let i = 0; i < call_buttons.length; i++) {
    let btn = call_buttons[i];
    btn.addEventListener('click', () => openPopup(call_popup))
}
for (let i = 0; i < feedback_buttons.length; i++) {
    let btn = feedback_buttons[i];
    btn.addEventListener('click', () => openPopup(feedback_popup))
}

createMenu()