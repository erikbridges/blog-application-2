import validator from "validator";
import axios from "axios";
export const validateEmail = async email => {
  // Check if email is valid
  const isEmailValid = validator.isEmail(email);
  if (!isEmailValid) {
    return {
      error: true,
      errorMessage: "Your email is invalid. Please enter in a valid email."
    };
  }
  // Check if disposible
  const isDisposibleEmail = await axios.get(
    `https://www.validator.pizza/email/${email}`
  );
  const { disposable } = await isDisposibleEmail.data;
  if (disposable) {
    return {
      error: true,
      errorMessage: "No disposible emails allowed. Please enter a valid email."
    };
  }
  return {
    error: false,
    errorMessage: null
  };
};
export const validateUsername = username => {
  // Check Valid Length
  const isValidLength = validator.isLength(username, { min: 4, max: 20 });
  if (!isValidLength) {
    return {
      error: true,
      errorMessage:
        "Not a valid username. Must be at least 4 characters long. Cannot be longer than 20 characters long."
    };
  }
  // Check Valid Username
  //  Min 8 Max 30 cannot contain a _ or . at the beginning, middle nor the end. letters and numbers are allowed
  const isValidChar = validator.matches(
    username,
    /^(?=.{8,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
  );
  if (!isValidChar) {
    return {
      error: true,
      errorMessage: "Not a valid username. 3 special characters"
    };
  }
  return {
    error: false,
    errorMessage: null
  };
};

export const validatePassword = password => {
  // Check if password is valid
  // Minimum eight and maximum 100 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const passwordMatches = validator.matches(
    password,
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,100}$/
  );
  return passwordMatches
    ? {
        error: false,
        errorMessage: null
      }
    : {
        error: true,
        errorMessage:
          "Invalid password. Make sure you check the password rules. "
      };
};

/* ***  BLOG VALIDATORS *** 
_________________________________________*/

/*  === Title Validate === */

export const validateTitle = title => {
  // Check Limit
  const checkLimit = validator.isLength(title, { min: 3, max: 20 });
  if (!checkLimit) {
    return {
      error: true,
      errorMessage:
        "Invalid blog title. 3 characters minimum. 20 characters long. "
    };
  }
  return {
    title: validator.escape(title)
  };
};
/*  === Post Validate === */
export const validatePost = post => {
  // Check Limit
  const checkLimit = validator.isLength(post, { min: 10, max: 5000 });
  if (!checkLimit) {
    return {
      error: true,
      errorMessage:
        "Your blog post is too long or too short. Please limit between 10 and 5000 characters."
    };
  }
  return {
    post: validator.escape(post)
  };
};
export const validateComment = comment => {
  // Check Limit
  const checkLimit = validate.isLength(comment, { min: 3, max: 1000 });
  if (!checkLimit) {
    return {
      error: true,
      errorMessage:
        "Your comment post is too long or too short. Please limit between 3 and 1000 characters."
    };
  }
  return {
    comment: validator.escape(comment)
  };
};
// TITLE VALIDATE
export const validateUserTitle = title => {
  const checkLimit = validator.isLength(title, { max: 30 });
  if (!checkLimit) {
    return {
      error: true,
      errorMessage:
        "Your title is too long. Please limit to only 30 characters."
    };
  }
  return {
    title: validator.escape(title)
  };
};
// CAPTCHA VALIDATE
export const validateCaptcha = async captcha => {
  const validCaptcha = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${
      process.env.CAPTCHA_SECRET
    }&response=${captcha}`
  );
  const { data } = validCaptcha;
  if (!data.success) {
    return {
      error: true,
      errorMessage: "Captcha is invalid please try again."
    };
  }
  return {
    error: false,
    errorMessage: null
  };
};
