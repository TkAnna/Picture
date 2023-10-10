const modals = () => {
    let btnPressed;

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        trigger.forEach(item => {

            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    item.remove();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                });


                // if (e.target.classList.contains('popup_calc_btn') ||
                //     e.target.classList.contains('popup_engineer_btn') ||
                //     e.target.classList.contains('phone_link')) {
                //     showModal();
                // }


                // if (e.target.classList.contains('popup_calc_button')) {
                //     if (!state.width || !state.height) {
                //         addError('Введіть ширину і довжину вікна');
                //     } else {
                //         document.querySelector('.popup_calc').style.display = 'none';
                //         showModal();
                //     }
                // }

                // if (e.target.classList.contains('popup_calc_profile_button')) {
                //     if (!state.profile) {
                //         addError('Введіть тип скління');
                //     } else {
                //         document.querySelector('.popup_calc_profile').style.display = 'none';
                //         showModal();
                //     }
                // }

                showModal();

                function showModal() {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scroll}px`;
                }

                // function addError(text) {
                //     const err = document.createElement('div');
                //     err.style.color = 'red';
                //     err.classList.add('error');
                //     err.textContent = text;

                //     if (!item.parentElement.children[item.parentElement.children.length - 1].classList.contains('error')) {
                //         item.parentElement.append(err);
                //     }
                // }

                // modal.style.display = 'block';
                // document.body.style.overflow = 'hidden';
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            hideModal();

        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });
                hideModal();
            }
        });

        function hideModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
            if (document.querySelector('.fixed-gift')) {
                document.querySelector('.fixed-gift').style.right = `2rem`;
            }
        }
    }

    function showModalByTime(selector, time) {
        setTimeout(function () {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
                document.querySelector('.fixed-gift').style.right = `calc(2rem + ${scroll}px)`;
            }

        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflow = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.scrollHeight); // to support older browsers

            if (!btnPressed && (window.scrollY + document.documentElement.clientHeight >= scrollHeight - 1)) {

                document.querySelector(selector).click();
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    //showModalByTime('.popup-consultation', 60000);

}

export default modals;