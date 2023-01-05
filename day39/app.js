const productNameInputElement = document.getElementById('product-name');
const remaingingCharsElement = document.getElementById('remaining-chars');

const maxAllowedChars = productNameInputElement.maxLength;

const updateRemainingCharacters = (event) => {
    const enteredText = event.target.value;
    const enteredTextLength = enteredText.length;

    const remainingCharacters = maxAllowedChars - enteredTextLength;
    remaingingCharsElement.textContent = remainingCharacters;

    if (remainingCharacters === 0) {
        remaingingCharsElement.classList.add('error');
        productNameInputElement.classList.add('error');
    } else if (remainingCharacters <= 10) {
        remaingingCharsElement.classList.add('warning');
        productNameInputElement.classList.add('warning');
    } else {
        remaingingCharsElement.classList.remove('error');
        productNameInputElement.classList.remove('error');
        remaingingCharsElement.classList.remove('warning');
        productNameInputElement.classList.remove('warning');
    };
};

productNameInputElement.addEventListener('input', updateRemainingCharacters);