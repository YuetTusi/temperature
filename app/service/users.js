const BaseService = require("./base");
const jwt = require("jsonwebtoken");
/**
 * @description 用户管理
 */
class UesrsService extends BaseService {
  constructor(props) {
    super(props);
    this.tableName = "users";
  }
  async login(name, password) {
    const { app } = this;
    let result = null;
    try {
      let data = await app.mysql.select(this.tableName, {
        where: {
          password,
          name
        },
        limit: 1,
        offset: 0
      });
      if (data.length === 0) {
        result = {
          code: 0,
          data,
          token: null,
          message: "login_failure"
        };
      } else {
        result = {
          code: 0,
          data,
          token: jwt.sign({ ...data[0] }, app.config.JWT_KEY), //使用密钥进行JWT签名，生成Token
          //展开对象的目的是sign方法要求传入一个普通JS对象（plain object）
          message: "login_success"
        };
      }
    } catch (error) {
      result = {
        code: 1,
        error,
        message: "failure"
      };
    }
    return result;
  }
}

module.exports = UesrsService;
