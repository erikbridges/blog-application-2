import validator from "validator";

export const validateUsername = username => {
  const checkLength = validator.isLength(username, { min: 3, max: 20 });
  if (!checkLength) {
    return {
      error: true,
      errorMessage: "Username is too long or too short."
    };
  }
  return {
    error: false,
    errorMessage: null
  };
};

export const validateEmail = email => {
  const checkEmail = validator.isEmail(email);
  if (!checkEmail) {
    return {
      error: true,
      errorMessage:
        "Invalid email address. Make sure the email is valid before continuing."
    };
  }
  return {
    error: false,
    errorMessage: null
  };
};

export const validatePass = pass => {
  const checkPass = validator.matches(
    pass,
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,100}$/
  );
  if (!checkPass) {
    return {
      error: true,
      errorMessage: "Password is invalid min 8 character, Max 100 characters"
    };
  }
  return {
    error: false,
    errorMessage: null
  };
};
