const passwordsEquality = (newPass, oldPass) => (newPass !== oldPass ? 'Passwords should be equal' : undefined);

export const required = (value) =>
    (value ? undefined : 'Required');

export const number = (value) =>
    (value && isNaN(Number(value)) ? 'Must be a number' : undefined);

export const email = (value) =>
    (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined);

export const passwordLength = (value) =>
    (value && value.length >= 6 ? undefined : 'Ensure this field has at least 6 characters.');



export const validatePasswords = (values) => {
    const errors = {};
    errors.password2 = passwordsEquality(values.password1, values.password2);
    return errors;
};


