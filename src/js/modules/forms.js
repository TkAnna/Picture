import { postData } from "../services/requests";
import validateEmail from "./validateEmail";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]');

    const message = {
        loading: 'Завантаження',
        success: `Дякуємо! Скоро ми з вами зв'яжемося`,
        failure: 'Щось пішло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    }

    // const postData = async (url, data) => {
    //     let res = await fetch(url, {
    //         method: 'POST',
    //         body: data
    //     });

    //     return await res.text();
    // };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не вибрано';
        });
    }

    upload.forEach(item => {
        item.addEventListener('input', () => {
            //console.log(item.files[0]);
            let dots;
            const arr = item.files[0].name.split('.');

            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;

        });
    });

    form.forEach(item => {
        if (item.querySelector('.error')) item.querySelector('.error').remove();

        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let name = item.querySelector('[name="name"]');
            let phone = item.querySelector('[name="phone"]');
            let email = item.querySelector('[name="email"]');
            let btn = item.querySelector('.button-order');
            const error = document.createElement('div');
            error.classList.add('error');

            if (name.value.length < 2) {
                if (!item.querySelector('.error')) {
                    error.textContent = `Введіть ім'я`;
                    btn.before(error);
                }
                return;
            } else {
                if (item.querySelector('.error')) item.querySelector('.error').remove();
            }

            if (phone.value.length != 19) {
                if (!item.querySelector('.error')) {
                    error.textContent = 'Не вірний номер телефона';
                    btn.before(error);
                }
                return;
            } else {
                error.remove();
            }

            let noError = validateEmail(email.value);

            if (email.value !== '' && noError) {
                if (item.querySelector('.error')) item.querySelector('.error').remove();

            } else {
                if (!item.querySelector('.error')) {
                    error.textContent = 'Введіть корректний email';
                    btn.before(error);
                }
                return;
            }

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);
            let api;

            if (item.classList.contains('calc-form')) {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            item.closest('.popup-design') || item.classList.contains('calc-form') ?
                api = path.designer : api = path.question;
            console.log(api);

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    if (item.querySelector('.error')) item.querySelector('.error').remove();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });



        });


    });
};

export default forms;