export const Validate = (username, password) => {
  var validRegexUsername =
    /^[a-zA-Z0-9]([.-](?![.-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
  var validRegexPassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  if (username === "") {
    return {
      username: "Please enter username",
      password: "",
    };
  } else if (password === "") {
    return {
      username: "",
      password: "Please enter password",
    };
  } else if (!username.match(validRegexUsername)) {
    return {
      username:
        "username must be of 3 to 18 characters and should not contain spaces",
      password: "",
    };
  } else if (!password.match(validRegexPassword)) {
    return {
      username: "",
      password:
        "password must be of minimum 8 in length, At least one upper case, one lower case, one digit and one special character",
    };
  } else {
    return true;
  }
};
