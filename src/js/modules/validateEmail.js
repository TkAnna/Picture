const validateEmail = (emailInputValue) => {
    const regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let notError;

    regx.test(emailInputValue) ? notError = true : notError = false;

    return notError;

};

export default validateEmail;