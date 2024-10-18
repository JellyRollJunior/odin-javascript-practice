export { form };

const email = (function email() {
    const email = document.querySelector('#email');
    const emailError = document.querySelector('#email+.error');
    const emailConstraint = new RegExp(
        '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$',
        ''
    );

    const isEmailValid = () => {
        const emailAddress = email.value;
        return emailConstraint.test(emailAddress);
    };

    const validateEmail = () => {
        if (isEmailValid()) {
            emailError.textContent = '';
            emailError.className = 'error';
        } else {
            showEmailError();
        }
    };

    const showEmailError = () => {
        if (email.validity.typeMismatch || email.validity.valueMissing) {
            emailError.textContent =
                'Please enter an email with format mail@example.domain';
        } else if (email.validity.tooShort) {
            emailError.textContent =
                'Please enter an email with at least 5 characters';
        }
        emailError.className = 'error active';
    };

    email.addEventListener('input', () => validateEmail());

    return { isEmailValid, showEmailError };
})();

const country = (function country() {
    
    const getCountryCode = () => {
        const country = document.querySelector('#country');
        return country.value;
    }

    return { getCountryCode };
})();

const zipcode = (function zipcode() {
    const zipcode = document.querySelector('#zipcode');
    const zipcodeError = document.querySelector('#zipcode+.error');
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


    const isZipcodeValid = () => {
        const countryCode = country.getCountryCode();
        const zipcodeConstraint = new RegExp(constraints[countryCode][0], '');
        const zipcodeValue = zipcode.value;
        return zipcodeConstraint.test(zipcodeValue);
    };

    const validateZipcode = () => {
        if (isZipcodeValid()) {
            zipcodeError.textContent = '';
            zipcodeError.className = 'error';
        } else {
            showZipcodeError();
        }
    }

    const showZipcodeError = () => {
        zipcodeError.className = 'error active';
        zipcodeError.textContent = constraints[country.getCountryCode()][1];
    }

    zipcode.addEventListener('input', () => validateZipcode());

    return { isZipcodeValid, showZipcodeError }
})();

const password = (function password() {
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirm-password');
    const passwordError = document.querySelector('#password+.error');
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const passwordConstraint = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$', '');

    const isPasswordValid = () => {
        // check passwords match
        // check they follow constraint
        const passwordValue = password.value;
        const confirmValue = confirmPassword.value 
        console.log(passwordConstraint.test(passwordValue));
        console.log((passwordValue == confirmValue));
        return passwordConstraint.test(passwordValue) && (passwordValue == confirmValue);
    }

    password.addEventListener('input', () => isPasswordValid());
    confirmPassword.addEventListener('input', () => isPasswordValid());

    return { isPasswordValid };
})();

const form = (function form() {
    const form = document.querySelector('form');
    const output = document.querySelector('output');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (email.isEmailValid() && zipcode.isZipcodeValid()) {
            output.textContent = 'YIPPEE - High five time!';
        } else {
            output.textContent = 'Oops, check your fields again!';
            email.showEmailError();
            zipcode.showZipcodeError();
        }
    });
})();
