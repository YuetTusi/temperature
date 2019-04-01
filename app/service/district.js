const BaseService = require("./base");

/**
 * @description 小区服务
 */
class DistrictService extends BaseService {
  constructor(props) {
    super(props);
    this.tableName = "district";
  }
  /**
   * 条件查询
   * @param {Object} condition  条件（表单条件&分页&排序）
   */
  async query(condition) {
    const { app } = this;
    const { pageIndex = 1, pageSize = 5 } = condition;
    let r = null;
    let sql = "select SQL_CALC_FOUND_ROWS * from district where 1=1";
    let sqlWhere = [];
    if (condition.name) {
      sql += " and name like ? ";
      sqlWhere.push(`%${condition.name}%`);
    }
    if (condition.address) {
      sql += " and address like ? ";
      sqlWhere.push(`%${condition.address}%`);
    }
    sql += " order by modifyTime desc ";
    try {
      let offset = (pageIndex - 1) * pageSize;
      sql += " limit ? offset ?;";
      sqlWhere.push(Number(pageSize), offset);
      let data = await app.mysql.query(sql, sqlWhere);
      let totalRow = await app.mysql.query(
        "select FOUND_ROWS() as TotalCount;"
      );
      r = {
        code: 0,
        data,
        total: totalRow[0].TotalCount,
        pageIndex,
        pageSize,
        info: "success"
      };
    } catch (error) {
      r = {
        code: 1,
        error,
        info: "failure"
      };
    }
    return r;
  }
  /**
   * @description 查询小区下拉数据
   * @param {String} keywords 关键字
   */
  async queryDistrictSelect(keywords) {
    const { app } = this;
    let result = null;
    let where = [];
    let sql = "select id,name from district where 1=1";
    if (keywords) {
      sql += " and name like ? ";
      where.push(`%${keywords}%`);
    }
    sql += " order by modifyTime desc;";
    try {
      let data = await app.mysql.query(sql, where);
      result = {
        code: 0,
        info: "success",
        data
      };
    } catch (error) {
      result = {
        code: 1,
        info: "failure",
        error
      };
    }
    return result;
  }
  /**
   * @description 查询小区下的楼栋数量
   * @param {String} id 小区id
   */
  async queryBuildingCount(id) {
    const sql = `select count(*) as 'BuildingCount' 
      from building  
      where districtId=?;`;
    const { app } = this;
    let result = null;
    try {
      let data = await app.mysql.query(sql, [id]);
      result = {
        code: 0,
        data: data[0].BuildingCount,
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

module.exports = DistrictService;
