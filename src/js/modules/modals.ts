import {closeModalWindow} from "./closeModal"; 
export const modals = () => {
    interface IBindModal {
        triggerSelector: string,
        modalSelector: string,
        closeSelector: string,
        closeClickOverlay?: boolean
    }
    const bindModal = ({triggerSelector, modalSelector, closeSelector, closeClickOverlay = true}:IBindModal) =>{
        const triggers  = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector) as HTMLDivElement;
        const close = document.querySelector(closeSelector) as HTMLButtonElement;
        const windows: NodeListOf<HTMLElement> = document.querySelectorAll('[data-modal]');

        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                windows.forEach(window => {
                    closeModalWindow(window);
                });

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(window => {
                closeModalWindow(window);
            });

            closeModalWindow(modal);
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay === true) {
                windows.forEach(window => {
                    closeModalWindow(window);
                });

                closeModalWindow(modal);
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && modal.style.display == 'block') {
                closeModalWindow(modal);
            }
        });
    }  

    const showModalByTime = ((selector: string , time: number) => {
        setTimeout(() => {
            let display;

            document.querySelectorAll('[data-modal]').forEach(modalWindow => {
                if (getComputedStyle(modalWindow).display !== 'none') {
                    display = 'block;'
                }
            });

            if (!display) {
                const modal = document.querySelector(selector) as HTMLDivElement;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }, time);
    });

    bindModal({
        triggerSelector: '.button-design', 
        modalSelector: '.popup-design', 
        closeSelector: '.popup-design .popup-close',
        closeClickOverlay: true
    });  
    bindModal({
        triggerSelector: '.button-consultation', 
        modalSelector: '.popup-consultation', 
        closeSelector: '.popup-consultation .popup-close',
        closeClickOverlay: true
    }); 
    showModalByTime('.popup-consultation', 60000);
};                            

