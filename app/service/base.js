const { Service } = require("egg");
const uuid = require("uuid/v1");

class BaseService extends Service {
  constructor(props) {
    super(props);
    this.tableName = null;
  }
  async get(id) {
    const { app, ctx } = this;
    let r = null;
    try {
      let data = await app.mysql.get(this.tableName, { id });
      r = {
        code: 0,
        data,
        info: "success"
      };
    } catch (err) {
      r = {
        code: 0,
        err,
        info: "failure"
      };
    }
    return r;
  }
  async create(entity) {
    const { app, ctx } = this;
    let r = null;
    try {
      entity.id = uuid();
      entity.createTime = ctx.helper.now();
      entity.modifyTime = ctx.helper.now();
      entity.state = 1;

      let data = await app.mysql.insert(this.tableName, entity);
      r = {
        code: 0,
        data,
        info: "success"
      };
    } catch (error) {
      debugger;
      r = {
        code: 1,
        error,
        info: "failure"
      };
    }
    return r;
  }
  async del(id) {
    const { app } = this;
    let r = null;
    try {
      console.log(id);
      let data = await app.mysql.delete(this.tableName, { id });
      r = {
        code: 0,
        data,
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
  async update(entity) {
    const { app, ctx } = this;
    let r = null;
    try {
      let oldEntity = await app.mysql.get(this.tableName, { id: entity.id });
      let newEntity = { ...oldEntity, ...entity };
      newEntity.modifyTime = ctx.helper.now();
      let data = await app.mysql.update(this.tableName, newEntity);
      r = {
        code: 0,
        data,
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
  async list() {
    const { app } = this;
    let r = null;

    try {
      let data = await app.mysql.select(this.tableName, {
        order: [["modifyTime", "desc"]]
      });
      r = {
        code: 0,
        data,
        info: "success"
      };
    } catch (error) {
      console.log(error);
      r = {
        code: 1,
        error,
        info: "failure"
      };
    }
    return r;
  }
}
module.exports = BaseService;
