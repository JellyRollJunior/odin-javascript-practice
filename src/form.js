export { initForm };

document.addEventListener('DOMContentLoaded', () => {
    const email = initEmail();
    const country = initCountry();
    const zipcode = initZipcode(country);
    const password = initPassword();
    initForm(email, zipcode, password);
});

class ErrorController {
    constructor(errorElement, inputElement) {
        this.errorElement = errorElement;
        this.inputElement = inputElement;
    }

    clearError() {
        this.errorElement.textContent = '';
        this.errorElement.className = 'error';
        this.inputElement.setCustomValidity('');
    }

    activateError() {
        this.errorElement.className = 'error active';
        this.inputElement.setCustomValidity('invalid');
    }
}

const initEmail = () => {
    const email = document.querySelector('#email');
    const emailError = document.querySelector('#email+.error');
    const emailErrorController = new ErrorController(emailError, email);
    const emailConstraint = new RegExp(
        '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$',
        ''
    );

    const isValid = () => {
        const emailAddress = email.value;
        return emailConstraint.test(emailAddress);
    };

    const validateEmail = () => {
        if (isValid()) {
            emailErrorController.clearError();
        } else {
            showError();
        }
    };

    const showError = () => {
        if (email.validity.typeMismatch || email.validity.valueMissing) {
            emailError.textContent =
                'Please enter an email with format mail@example.domain';
        } else if (email.validity.tooShort) {
            emailError.textContent =
                'Please enter an email with at least 5 characters';
        }
        emailErrorController.activateError();
    };

    email.addEventListener('input', () => validateEmail());

    return { isValid, showError };
};

const initCountry = () => {
    const getCountryCode = () => {
        const country = document.querySelector('#country');
        return country.value;
    };

    return { getCountryCode };
};

const initZipcode = (country) => {
    const zipcode = document.querySelector('#zipcode');
    const zipcodeError = document.querySelector('#zipcode+.error');
    const zipcodeErrorController = new ErrorController(zipcodeError, zipcode);
    const constraints = {
        tw: [
            '^[\\d]{3}((-)?[\\d]{2,3})?$',
            'Taiwanese postal codes must have 3, 5, or 6 digits: e.g. 11052 or 111-222',
        ],
        ch: [
            '^(CH-)?\\d{4}$',
            'Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950',
        ],
        fr: [
            '^(F-)?\\d{5}$',
            'French postal codes must have exactly 5 digits: e.g. F-75012 or 75012',
        ],
        de: [
            '^(D-)?\\d{5}$',
            'German postal codes must have exactly 5 digits: e.g. D-12345 or 12345',
        ],
        nl: [
            '^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$',
            'Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS',
        ],
    };

    const isValid = () => {
        const countryCode = country.getCountryCode();
        const zipcodeConstraint = new RegExp(constraints[countryCode][0], '');
        const zipcodeValue = zipcode.value;
        return zipcodeConstraint.test(zipcodeValue);
    };

    const validateZipcode = () => {
        if (isValid()) {
            zipcodeErrorController.clearError();
        } else {
            showError();
        }
    };

    const showError = () => {
        zipcodeErrorController.activateError();
        zipcodeError.textContent = constraints[country.getCountryCode()][1];
    };

    zipcode.addEventListener('input', () => validateZipcode());

    return { isValid, showError };
};

const initPassword = () => {
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirm-password');
    const passwordError = document.querySelector('#password+.error');
    const passwordErrorController = new ErrorController(
        passwordError,
        password
    );
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const passwordConstraint = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
        ''
    );

    const isValid = () => {
        const passwordValue = password.value;
        const confirmValue = confirmPassword.value;
        return (
            passwordConstraint.test(passwordValue) &&
            passwordValue == confirmValue
        );
    };

    const validatePassword = () => {
        if (isValid()) {
            passwordErrorController.clearError();
        } else {
            showError();
        }
    };

    // how do i separate the logic from isPasswordValid and showPasswordError.
    // If i want to change password validation logic, I am forced to change login in showPasswordError as well. Not good
    const showError = () => {
        const passwordValue = password.value;
        const confirmValue = confirmPassword.value;
        if (!passwordConstraint.test(passwordValue)) {
            passwordError.textContent =
                'Passwords require at least eight characters, one uppercase letter, one lowercase letter, one number and one special character';
        } else if (passwordValue != confirmValue) {
            passwordError.textContent = 'Passwords must match';
        }
        passwordErrorController.activateError();
    };

    password.addEventListener('input', () => validatePassword());
    confirmPassword.addEventListener('input', () => validatePassword());

    return { isValid, showError };
};

const initForm = (email, zipcode, password) => {
    const form = document.querySelector('form');
    const output = document.querySelector('output');
    const validators = [email, zipcode, password];

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let allValid = true;
        validators.forEach((validator) => {
            if (!validator.isValid()) {
                validator.showError();
                allValid = false;
            }
        });
        output.textContent = allValid
            ? 'YIPPEE - High five time!'
            : 'Oops, check your fields again!';
    });

    // add "dirty" class to interacted inputs to apply invalid styling
    document.addEventListener('DOMContentLoaded', function () {
        const inputs = document.querySelectorAll('input');

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                input.classList.add('dirty');
            });
        });
    });
};
