export { form };

const email = (function email() {
    const email = document.querySelector('#email');
    const emailError = document.querySelector('#email+.error');
    const emailConstraint = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$', '');

    const isEmailValid = () => {
        const emailAddress = email.value;
        return emailConstraint.test(emailAddress);
    }

    const validateEmail = () => {
        if (isEmailValid()) {
            emailError.textContent = '';
            emailError.className = 'error';
        } else {
            showEmailError();
        }
    }

    const showEmailError = () => {
        if (email.validity.typeMismatch || email.validity.valueMissing) {
            emailError.textContent = 'Please enter an email with format mail@example.domain';
        } else if (email.validity.tooShort) {
            emailError.textContent = 'Please enter an email with at least 5 characters';
        }
        emailError.className = 'error active';
    }

    email.addEventListener('input', () => validateEmail());

    return { isEmailValid, };
})();

const form = (function form() {
    const form = document.querySelector('form');
    const output = document.querySelector('output');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (email.isEmailValid()) {
            output.textContent = "YIPPEE - High five time!";
        } else {
            output.textContent = "Oops, check your fields again!";
        }
    });
})();