"use strict";
// exports.mysql = {
//   enable: true,
//   package: "egg-mysql"
// };

module.exports = {
  cors: {
    enable: true,
    package: "egg-cors",
    credentials: true
  },
  mysql: {
    enable: true,
    package: "egg-mysql"
  }
};
