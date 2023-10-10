import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";
import showMoreStyles from "./modules/showMoreStyles";
import calc from "./modules/calc";
import filter from "./modules/filter";
import pictureSize from "./modules/pictureSize";
import collapseBlock from "./modules/collapseBlock";
import burger from "./modules/burger";
import scrolling from "./modules/scrolling";
import drop from "./modules/drop";
//import validateEmail from "./modules/validateEmail";

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const state = {};

    modals();
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
    forms(state);
    mask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');
    showMoreStyles('.button-styles', '#styles .row');
    calc('#size', '#material', '#options', '.promocode', '.calc-price', state);
    filter();
    pictureSize('.sizes-block');
    collapseBlock('.accordion-heading');
    burger('.burger-menu', '.burger');
    scrolling('.pageup');
    drop();

});