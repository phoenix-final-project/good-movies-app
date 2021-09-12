// checking whether all inputs are correct
// let errors = {};

function ValidationErrorRegistration(values) {
    let errors = {};

    if (!values.username.trim()) {
        errors.username = 'Username is required';
    }

    if (!values.firstname.trim()) {
        errors.firstname = 'firstname is required';
    } 

    if (!values.lastname.trim()) {
        errors.lastname = 'lastname is required';
    } 

    if (!values.email) {
        errors.email = 'email address is required';
    } 

    if (!values.password) {
        errors.password = 'password is required'
    } 

    return errors;
};

export default ValidationErrorRegistration;


export function ValidationErrorLogin(values) {
    let errors = {};

    if (!values.username.trim()) {
        errors.username = 'Username is required';
    }

    if (!values.password) {
        errors.password = 'Password is required'
    } 

    return errors;
};

