import {modals} from './modules/modals';
import {sliders} from './modules/sliders';
import {forms} from './modules/forms';

window.addEventListener('DOMContentLoaded', () => {
    'usestrict'
    forms();
    modals();
    sliders({
        slidesSelector:'.feedback-slider-item', 
        pos: '', 
        prev:'.main-prev-btn', 
        next:'.main-next-btn'
    });
    sliders({
        slidesSelector:'.main-slider-item', 
        pos: 'vertical', 
        prev:'', 
        next:'',
    });
});

