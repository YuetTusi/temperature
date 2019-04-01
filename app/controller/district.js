const { Controller } = require("egg");

/**
 * @description 小区
 */
class DistrictController extends Controller {
  constructor(props) {
    super(props);
  }
  async get() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    let r = await service.district.get(id);
    ctx.body = r;
  }
  async query() {
    const { ctx, service } = this;
    const { pageIndex = 1, pageSize = 5 } = ctx.params;
    const condition = ctx.request.body;
    let r = await service.district.query({ ...condition, pageIndex, pageSize });
    ctx.body = r;
  }
  async queryDistrictName() {
    const { ctx, service } = this;
    const { keywords } = ctx.request.query;
    let r = await service.district.queryDistrictSelect(keywords);
    ctx.body = r;
  }
  async queryBuildingCount() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    let r = await service.district.queryBuildingCount(id);
    ctx.body = r;
  }
  async list() {
    const { ctx, service } = this;
    let r = await service.district.list();
    ctx.body = r;
  }
  async create() {
    const { ctx, service } = this;
    const entity = ctx.request.body;
    let r = await service.district.create(entity);
    ctx.body = r;
  }
  async update() {
    const { ctx, service } = this;
    const entity = ctx.request.body;
    let r = await service.district.update(entity);
    ctx.body = r;
  }
  async del() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    let r = await service.district.del(id);
    ctx.body = r;
  }
}

module.exports = DistrictController;
