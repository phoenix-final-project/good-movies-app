
export default function ValidationError(values) {
    // checking whether all inputs are correct
    let errors = {};

    if (!values.username.trim()) {
        errors.username = 'Enter a unique username.';
    }

    if (!values.firstname.trim()) {
        errors.firstname = 'Enter your first name.';
    }

    if (!values.lastname.trim()) {
        errors.lastname = 'Enter your lastname.';
    }

    if (!values.email) {
        errors.email = 'Enter a valid email address.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Email address is invalid!';
    }

    if (!values.password) {
        errors.password = 'Enter a password'
    } else if (values.password.length < 5) {
        errors.password = 'A strong password must have at least five characters or more.'
    }

    return errors;
}
