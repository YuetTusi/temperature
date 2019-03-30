const BaseService = require("./base");

/**
 * @description 温度表
 */
class TempService extends BaseService {
  constructor(props) {
    super(props);
    this.tableName = "temp";
  }
}

module.exports = TempService;
