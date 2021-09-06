
export default function ValidationError(values) {
    // checking whether all inputs are correct
    let errors = {};

    if (!values.username) {
        errors.username = 'Enter a unique username.';
    }

    if (!values.firstname) {
        errors.firstname = 'Enter your first name.';
    }

    if (!values.lastname) {
        errors.lastname = 'Enter your lastname.';
    }

    if (!values.email) {
        errors.email = 'Enter a valid email address.';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid!';
    }

    if (!values.password) {
        errors.password = 'Enter a password'
    } else if (values.password.length < 5) {
        errors.password = 'A strong password must have at least five characters.'
    }

    return errors;
}
