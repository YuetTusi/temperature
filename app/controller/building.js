const { Controller } = require("egg");

/**
 * @description 楼宇
 */
class BuildingController extends Controller {
  constructor(props) {
    super(props);
  }
  async query() {
    const { ctx, service } = this;
    const { pageIndex = 1, pageSize = 5 } = ctx.params;
    let condition = ctx.request.body;
    condition = {
      ...condition,
      pageIndex: Number(pageIndex),
      pageSize: Number(pageSize)
    };
    ctx.body = await service.building.query(condition);
  }
  async get() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    ctx.body = await service.building.get(id);
  }
  async queryById() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    ctx.body = await service.building.queryById(id);
  }
  async list() {
    const { ctx, service } = this;
    let r = await service.building.list();
    ctx.body = r;
  }
  async create() {
    const { ctx, service } = this;
    let r = await service.building.create(ctx.request.body);
    ctx.body = r;
  }
  async update() {
    const { ctx, service } = this;
    let r = await service.building.update(ctx.request.body);
    ctx.body = r;
  }
  async del() {
    const { ctx, service } = this;
    let r = await service.building.del(ctx.params.id);
    ctx.body = r;
  }
}

module.exports = BuildingController;
