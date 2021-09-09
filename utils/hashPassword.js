const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  password = await bcrypt.hash(password, salt);
  return password;
};

module.exports = hashPassword;
