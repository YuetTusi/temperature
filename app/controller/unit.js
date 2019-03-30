const { Controller } = require("egg");

/**
 * @description 单元
 */
class UnitController extends Controller {
  constructor(props) {
    super(props);
  }
  async query() {
    const { ctx, service } = this;
    let condition = {
      pageIndex: Number.parseInt(ctx.params.pageIndex),
      pageSize: Number.parseInt(ctx.params.pageSize)
    };
    condition = {
      ...condition,
      ...ctx.request.body
    };
    const result = await service.unit.query(condition);
    ctx.body = result;
  }
  async queryById() {
    const { ctx, service } = this;
    let { id } = ctx.params;
    let result = await service.unit.queryById(id);
    ctx.body = result;
  }
  async create() {
    const { ctx, service } = this;
    let r = await service.unit.create(ctx.request.body);
    ctx.body = r;
  }
  async update() {
    const { ctx, service } = this;
    let r = await service.unit.update(ctx.request.body);
    ctx.body = r;
  }
  async list() {
    const { ctx, service } = this;
    let r = await service.unit.list();
    ctx.body = r;
  }
  async del() {
    const { ctx, service } = this;
    let r = await service.unit.del(ctx.params.id);
    ctx.body = r;
  }
}
module.exports = UnitController;
