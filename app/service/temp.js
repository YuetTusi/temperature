const BaseService = require("./base");

/**
 * @description 温度表
 */
class TempService extends BaseService {
  constructor(props) {
    super(props);
    this.tableName = "temp";
  }
  /**
   * @description 曲线数据（传房间id和日期泛围）
   */
  async chartData(parameters = {}) {
    let { app } = this;
    const sql = `select id,roomId,high,low,recordDate,state from temp 
      where roomId=?
      and recordDate between ? and ?
      order by recordDate asc;`;

    let r = null;
    try {
      let data = await app.mysql.query(sql, [
        parameters.roomNo,
        parameters.startTime,
        parameters.endTime
      ]);
      r = {
        code: 0,
        data,
        message: "success"
      };
    } catch (error) {
      r = {
        code: 1,
        error,
        message: "failure"
      };
    }

    return r;
  }
}

module.exports = TempService;
