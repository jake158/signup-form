'use strict';

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

function setupEventListeners() {
    const submit = document.querySelector('button[type="submit"]');
    submit.addEventListener('click', handleSubmit);

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.addEventListener('blur', () => validateInput(input)));
}

function handleSubmit(event) {
    event.preventDefault();

    if (validateAllInputs()) {
        submitForm(event);
    }
}

function validateAllInputs() {
    const inputs = document.querySelectorAll('input');
    let allValid = true;

    inputs.forEach(input => {
        if (!validateInput(input)) {
            allValid = false;
        }
    });
    if (!arePasswordsMatching()) {
        displayPasswordMismatchError();
        allValid = false;
    }

    return allValid;
}

function validateInput(input) {
    input.classList.add('clicked');
    removeExistingErrorMessage(input);

    if (!input.validity.valid) {
        displayErrorMessage(input, getErrorMessage(input));
        return false;
    }
    return true;
}

function removeExistingErrorMessage(input) {
    const existingInfo = input.nextElementSibling;
    if (existingInfo && existingInfo.classList.contains('input-info')) {
        existingInfo.remove();
    }
}

function getErrorMessage(input) {
    if (input.validity.valueMissing) {
        return '* Field is required';
    } else {
        return '* Invalid input';
    }
}

function displayErrorMessage(input, message) {
    const info = document.createElement('p');
    info.classList.add('input-info');
    info.textContent = message;
    input.after(info);
}

function arePasswordsMatching() {
    const passFieldOne = document.querySelector('#pass');
    const passFieldTwo = document.querySelector('#confirmpass');
    return passFieldOne.value === passFieldTwo.value;
}

function displayPasswordMismatchError() {
    const passFieldTwo = document.querySelector('#confirmpass');
    removeExistingErrorMessage(passFieldTwo);

    const info = document.createElement('p');
    info.classList.add('input-info');
    info.textContent = '* Passwords do not match';
    passFieldTwo.after(info);
}

function submitForm(event) {
    // event.currentTarget.closest('form').submit();
    if (!document.querySelector('.submitted-info')) {
        const p = document.createElement('p');
        p.classList.add('submitted-info');
        p.textContent = 'Form submitted!';
        p.setAttribute('style',
            'color: green; position: absolute; bottom:50px;');
        document.querySelector('.login-text').after(p);
    }
}
