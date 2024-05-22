'use strict';
const submit = document.querySelector('button[type="submit"]');
submit.addEventListener('click', e => submitCheck(e));

const inputs = document.querySelectorAll('input');
inputs.forEach((input) => {
    input.addEventListener('blur', () => inputClicked(input));
});

const passFieldOne = document.querySelector('#pass');
const passFieldTwo = document.querySelector('#confirmpass');

function submitCheck(event) {
    event.preventDefault();
    inputs.forEach(input => inputClicked(input));
    if (ensurePasswordsMatch()) {
        event.currentTarget.closest('form').submit();
    } else {
        showPasswordMismatchError();
    }
}

function ensurePasswordsMatch() {
    return passFieldOne.value === passFieldTwo.value;
}

function showPasswordMismatchError() {
    let existingInfo = passFieldTwo.nextElementSibling;
    if (existingInfo && existingInfo.classList.contains('input-info')) {
        existingInfo.remove();
    }

    const info = document.createElement('p');
    info.classList.add('input-info');
    info.textContent = '* Passwords do not match';
    passFieldTwo.after(info);
}

function inputClicked(input) {
    input.classList.add('clicked');

    let existingInfo = input.nextElementSibling;
    if (existingInfo && existingInfo.classList.contains('input-info')) {
        existingInfo.remove();
    }

    if (!input.validity.valid) {
        const info = document.createElement('p');
        info.classList.add('input-info');

        if (input.validity.valueMissing) {
            info.textContent = '* Field is required';
        } else {
            info.textContent = '* Invalid input';
        }
        input.after(info);
    }
}
