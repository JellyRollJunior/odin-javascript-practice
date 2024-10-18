export { form };

const form = (function form() {
    const form = document.querySelector('form');
    const email = document.querySelector('#email');
    
    const emailConstraint = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$', '');

    const validateEmail = () => {
        const emailAddress = email.value;

        if (emailConstraint.test(emailAddress)) {
            email.setCustomValidity("");
        } else if (email.validity.typeMismatch) {
            email.setCustomValidity("Please enter an email with format email@example.com")
        } else if (email.validity.tooShort) {
            email.setCustomValidity("Please enter an email with at least 5 characters")
        }
    }

    email.addEventListener('input', () => validateEmail());
    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });
})();