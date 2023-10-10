const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        input.addEventListener('input', function (e) {
            switch (selector) {
                case '[name="name"]':
                    input.value = input.value.replace(/([^a-zа-яєїі])/ig, '');
                    break;
                case '[name="message"]':
                    input.value = input.value.replace(/([^a-zа-яєїі,.?!0-9])/ig, '');
                    break;
            }
        });
    });
};

export default checkTextInputs;