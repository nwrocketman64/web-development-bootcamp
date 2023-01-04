const productNameInputElement = document.getElementById('product-name');
const remaingingCharsElement = document.getElementById('remaining-chars');

const maxAllowedChars = productNameInputElement.maxLength;

const updateRemainingCharacters = (event) => {
    const enteredText = event.target.value;
    const enteredTextLength = enteredText.length;

    const remainingCharacters = maxAllowedChars - enteredTextLength;
    remaingingCharsElement.textContent = remainingCharacters;
};

productNameInputElement.addEventListener('input', updateRemainingCharacters);