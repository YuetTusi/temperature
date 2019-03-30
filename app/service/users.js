const BaseService = require("./base");

/**
 * @description 用户管理
 */
class UesrsService extends BaseService {
  constructor(props) {
    super(props);
    this.tableName = "users";
  }
}

module.exports = UesrsService;
