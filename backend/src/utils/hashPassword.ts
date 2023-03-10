const bcrypt = require("bcrypt");

const hashPassword = (password: string) => {
  bcrypt.hash(password, 10, function (err: any, hash: any) {
    if (err) {
      console.log(err);
    } else {
      return hash;
    }
  });
};
