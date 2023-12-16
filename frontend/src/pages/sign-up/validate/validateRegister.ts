export const validateRegister = (email: string, accountName: string, password: string, repeatPassword: string) => {
    const errors: any = {};

    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const nameFormat = /^\d*[a-zA-Z][a-zA-Z\d]*$/;
    if (!email || email === "" || !email.match(emailFormat)) errors.email = "Invalid email"

    if (
      !accountName ||
      accountName.length < 3 ||
      !accountName.match(nameFormat)
    )  errors.accountName = "Invalid accountname"

    if (!accountName || accountName.length === 0) errors.accountName = "Account name required";
    else if (accountName.length < 3 || !accountName.match(nameFormat)) errors.accountName = "Account name invalid";
      
    if (password !== repeatPassword) {
        errors.password = "Passwords must match";
        errors.repeatPassword = "Passwords must match";
    }

    if (!password || password.length < 8)
      errors.password = "Passwords must have at least 8 letters";

    return errors;
}