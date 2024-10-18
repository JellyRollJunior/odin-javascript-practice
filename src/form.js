export { form };

const form = (function form() {
    const form = document.querySelector('form');
    const email = document.querySelector('#email');
    const emailError = document.querySelector('#email+.error');
    
    const emailConstraint = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$', '');

    const validateEmail = () => {
        const emailAddress = email.value;
        if (emailConstraint.test(emailAddress)) {
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
    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });
})();