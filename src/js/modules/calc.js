const calc = (size, material, options, promocode, result, state) => {
    const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);

    let sum = 0;

    const calcFunction = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = 'Виберіть розмір і матеріал картини';
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            state.size = textOfSelectedItem(sizeBlock);
            state.material = textOfSelectedItem(materialBlock);
            resultBlock.textContent = Math.round(sum * 0.7);
            state.promocode = true;
            state.result = Math.round(sum * 0.7);

        } else {
            state.size = textOfSelectedItem(sizeBlock);
            state.material = textOfSelectedItem(materialBlock);
            resultBlock.textContent = sum;
            state.promocode = false;
            state.result = sum;
        }

        if (optionsBlock.value !== '0') {
            state.options = textOfSelectedItem(optionsBlock);
        }

        function textOfSelectedItem(selectElem) {
            const currentIndex = selectElem.options.selectedIndex;
            return selectElem.options[currentIndex].text;
        }

        console.log(state);

    };

    sizeBlock.addEventListener('change', calcFunction);
    materialBlock.addEventListener('change', calcFunction);
    optionsBlock.addEventListener('change', calcFunction);
    promocodeBlock.addEventListener('input', calcFunction);





}

export default calc;