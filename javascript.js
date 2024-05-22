'use strict';

const submit = document.querySelector('button[type="submit"]');
submit.addEventListener('click', () => ensurePasswordsMatch());

const inputs = document.querySelectorAll('input');
inputs.forEach((input) => {
    input.addEventListener('blur', () => {
        input.classList.add('clicked');
    });
});

function ensurePasswordsMatch() {
    console.log("Placeholder");
}
