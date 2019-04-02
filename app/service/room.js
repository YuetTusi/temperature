const BaseService = require("./base");
/**
 * @description 房间
 */
class RoomService extends BaseService {
  constructor(props) {
    super(props);
    this.tableName = "room";
  }
  /**
   * @description 分页查询
   * @param {Object} condition 查询条件
   */
  async query(condition = {}) {
    let result = {};
    try {
      let data = await preQuerySql.call(this, condition);
      let count = await preSqlCount.call(this, condition);
      result = {
        code: 0,
        data,
        info: "success",
        totalRow: count ? count[0].totalRow : 0
      };
    } catch (error) {
      result = {
        code: 1,
        error: error.message,
        info: "failure"
      };
    }
    return result;
  }
  /**
   * @description 按id查询详情
   * @param {String} id 主键
   */
  async queryById(id) {
    let result = null;
    const sql = `select r.id,r.no,r.createTime,r.modifyTime,r.state,
     d.name as 'districtName',d.id as 'districtId',b.id as 'buildingId',b.no as 'buildingNo',
      u.id as 'unitId', u.name as 'unitName'
      from room r 
      inner join unit u 
      on r.unitId=u.id
      inner join building b
      on u.buildingId=b.id
      inner join district d
      on b.districtId=d.id
      where r.id=?
      order by r.modifyTime desc;`;
    const { app } = this;
    try {
      let data = await app.mysql.query(sql, [id]);
      result = {
        code: 0,
        data,
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

function preQuerySql(parameters) {
  let { app } = this;
  let sqlWhere = [];
  let sql = `select 
      r.id,r.no,r.createTime,r.modifyTime,r.state,
        u.id as 'unitId',u.name as 'unitName',
      b.id as 'buildingId',b.no as 'buildingNo',
        d.id as 'districtId',d.name as 'districtName'
    from room r
    inner join unit u 
    on r.unitId = u.id
    inner join building b
    on u.buildingId = b.id
    inner join district d
    on b.districtId = d.id
    where 1=1 `;

  if (parameters.districtId) {
    sqlWhere.push(parameters.districtId);
    sql += " and d.id = ?";
  }
  if (parameters.buildingId) {
    sqlWhere.push(parameters.buildingId);
    sql += " and b.id = ?";
  }
  if (parameters.unitId) {
    sqlWhere.push(parameters.unitId);
    sql += " and u.id = ?";
  }
  if (parameters.no) {
    sqlWhere.push(`%${parameters.no}%`);
    sql += " and r.no like ?";
  }
  sql += " order by r.modifyTime desc limit ? offset ?;";
  sqlWhere.push(
    parameters.pageSize,
    (parameters.pageIndex - 1) * parameters.pageSize
  );
  return app.mysql.query(sql, sqlWhere);
}

function preSqlCount(parameters) {
  let sqlWhere = [];
  let sqlCount = `select count(*) as totalRow 
    from room r 
    inner join unit u on r.unitId=u.id 
    inner join building b on u.buildingId = b.id 
    inner join district d on b.districtId=d.id 
    where 1=1 `;
  if (parameters.districtId) {
    sqlWhere.push(parameters.districtId);
    sqlCount += " and d.id=?";
  }
  if (parameters.buildingId) {
    sqlWhere.push(parameters.buildingId);
    sqlCount += " and b.id=?";
  }
  if (parameters.unitId) {
    sqlWhere.push(parameters.unitId);
    sqlCount += " and u.id=?";
  }
  if (parameters.no) {
    sqlWhere.push(`%${parameters.no}%`);
    sqlCount += " and r.no like ?";
  }

  return this.app.mysql.query(sqlCount, sqlWhere);
}

module.exports = RoomService;
