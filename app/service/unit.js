const BaseService = require("./base");

/**
 * @description 单元Service
 */
class UnitService extends BaseService {
  constructor(props) {
    super(props);
    this.tableName = "unit";
  }

  /**
   * @description 分页查询
   * @param {Object} condition 条件
   */
  async query(condition) {
    const { app } = this;
    let result = null;
    let queryWhere = [];
    let countWhere = [];
    let sqlQuery = `select 
      u.id,d.name as 'districtName',b.no as 'buildingNo',u.name,u.createTime,u.modifyTime,u.state
      from unit u 
      inner join building b on u.buildingId=b.id
      inner join district d on b.districtId=d.id 
      where 1=1 `;
    let sqlCount = `select 
      COUNT(*) as 'TotalRow'
      from unit u 
      inner join building b on u.buildingId=b.id
      inner join district d on b.districtId=d.id 
      where 1=1 `;

    if (condition.buildingId) {
      //所属楼栋
      sqlQuery += " and u.buildingId = ? ";
      sqlCount += " and u.buildingId = ? ";
      queryWhere.push(condition.buildingId);
      countWhere.push(condition.buildingId);
    }
    if (condition.districtId) {
      //所属小区
      sqlQuery += " and b.districtId = ? ";
      sqlCount += " and b.districtId = ? ";
      queryWhere.push(condition.districtId);
      countWhere.push(condition.districtId);
    }
    if (condition.name) {
      //单元名称(模糊查询)
      sqlQuery += " and u.name like ? ";
      sqlCount += "  and u.name like ? ";
      queryWhere.push(`%${condition.name}%`);
      countWhere.push(`%${condition.name}%`);
    }
    sqlQuery += "order by u.modifyTime desc limit ? offset ?;";

    queryWhere.push(
      condition.pageSize,
      (condition.pageIndex - 1) * condition.pageSize
    );

    try {
      let data = await app.mysql.query(sqlQuery, queryWhere);
      let countData = await app.mysql.query(sqlCount, countWhere);
      result = {
        data,
        code: 0,
        totalRow: countData[0].TotalRow,
        info: "success"
      };
    } catch (err) {
      result = {
        code: 1,
        error: err,
        info: "failure"
      };
    }
    return result;
  }

  /**
   * @description 按id查询单元
   * @param {String} id 主键Key
   */
  async queryById(id) {
    let sql = `select 
      d.id as 'districtId',d.name as 'districtName',b.id as 'buildingId',b.no ,
      u.id,u.name,u.createTime,u.modifyTime,u.state
      from unit u
      inner join building b on u.buildingId = b.id
      inner join district d on b.districtId = d.id
      where u.id=?;`;

    const { app } = this;
    let result = null;
    try {
      let data = await app.mysql.query(sql, [id]);
      result = {
        code: 0,
        data: data[0],
        info: "success"
      };
    } catch (error) {
      result = {
        code: 1,
        error,
        info: "failure"
      };
    }
    return result;
  }
}

module.exports = UnitService;
