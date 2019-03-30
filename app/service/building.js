const BaseService = require("./base");

class BuildingService extends BaseService {
  constructor(props) {
    super(props);
    this.tableName = "building";
  }
  /**
   * @description 分页查询
   * @param {Object} condition 查询条件
   */
  async query(condition) {
    let r = null;
    const { app } = this;
    let where = [];
    let countWhere = [];
    let sql = `select
        b.id,b.districtId,d.name,b.no,b.createTime,b.modifyTime,b.state
        from building b inner join district d
        on b.districtId = d.id
        where 1=1 `;
    let sqlCount = `select
      count(*) as RowTotal
      from building b inner join district d
      on b.districtId = d.id
      where 1=1 `;

    if (condition.districtId) {
      sql += " and b.districtId = ?";
      sqlCount += " and b.districtId = ?";
      where.push(condition.districtId);
      countWhere.push(condition.districtId);
    }
    if (condition.no) {
      sql += " and no like ? ";
      sqlCount += " and no like ? ";
      where.push(`%${condition.no}%`);
      countWhere.push(`%${condition.no}%`);
    }
    sql += " order by b.modifyTime desc limit ? offset ?;";
    let pageIndex = condition.pageIndex;
    let pageSize = condition.pageSize;
    where.push(Number(pageSize), (pageIndex - 1) * pageSize);
    try {
      let data = await app.mysql.query(sql, where);
      let foundRows = await app.mysql.query(sqlCount, countWhere);
      r = {
        data,
        code: 0,
        info: "success",
        total: foundRows[0].RowTotal
      };
    } catch (error) {
      r = {
        error,
        code: 1,
        info: "failure"
      };
    }
    return r;
  }

  /**
   * @description 按id查询楼宇以及关联小区数据
   * @param {Object} condition 条件
   */
  async queryById(id) {
    const { app } = this;
    let result = null;
    let sql = `select b.id,b.districtId,b.no,b.createTime,b.modifyTime,b.state,d.name
      from building b 
      inner join district d 
      on b.districtId = d.id 
      where b.id = ?`;
    try {
      let data = await app.mysql.query(sql, [id]);
      result = {
        code: 0,
        info: "success",
        data: data ? data[0] : null
      };
    } catch (error) {
      result = {
        code: 0,
        info: "success",
        error
      };
    }

    return result;
  }

  /**
   * @description 查询小区下的所有楼栋数据
   * @param {String} id 小区id
   */
  async queryByDistrictId(id) {
    const { app } = this;
    let result = null;
    let sql =
      "select id,no from building where districtId=? and state=1 order by modifyTime desc;";

    try {
      let data = await app.mysql.query(sql, [id]);
      result = {
        data,
        code: 0,
        info: "success"
      };
    } catch (error) {
      console.log(error);
      result = {
        error,
        code: 1,
        info: "failure"
      };
    }

    return result;
  }
}

module.exports = BuildingService;
