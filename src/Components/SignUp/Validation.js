export const Validate = (
  username,
  email,
  firstName,
  lastName,
  password,
  role
) => {
  var validRegexEmail =
    /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
  var validRegexUsername =
    /^[a-zA-Z0-9]([.-](?![.-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
  var validRegexPassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  var validRegexName = /^[a-zA-Z]+$/;

  //   console.log(password);
  if (!username.match(validRegexUsername)) {
    return {
      username:
        "username must be of 3 to 18 characters and should not contain spaces",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      role: "",
    };
  } else if (!firstName.match(validRegexName)) {
    return {
      username: "",
      email: "",
      firstName:
        "First name must not contains digits, special characters and free spaces",
      lastName: "",
      password: "",
      role: "",
    };
  } else if (!lastName.match(validRegexName)) {
    return {
      username: "",
      email: "",
      firstName: "",
      lastName:
        "Last name must not contains digits, special characters and free spaces",
      password: "",
      role: "",
    };
  } else if (!email.match(validRegexEmail)) {
    return {
      username: "",
      email: "Please enter valid email",
      firstName: "",
      lastName: "",
      password: "",
      role: "",
    };
  } else if (!password.match(validRegexPassword)) {
    return {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password:
        "password must be of minimum 8 in length, At least one upper case, one lower case, one digit and one special character",
      role: "",
    };
  } else if (role.length === 0) {
    return {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      role: "Please select role",
    };
  } else {
    return true;
  }
};
