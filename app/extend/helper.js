const moment = require("moment");
module.exports = {
  /**
   * 返回当前日期
   * @param {String} formatString  格式化字串
   */
  now: function(formatString = "YYYY-MM-DD HH:mm:ss") {
    return moment().format(formatString);
  }
};
