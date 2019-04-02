const { Controller } = require("egg");

/**
 * @description 房间
 */
class RoomController extends Controller {
  constructor(props) {
    super(props);
  }
  async query() {
    const { ctx, service } = this;
    let condition = {
      ...ctx.request.body,
      pageIndex: ctx.params.pageIndex
        ? Number.parseInt(ctx.params.pageIndex)
        : 1,
      pageSize: ctx.params.pageSize ? Number.parseInt(ctx.params.pageSize) : 5
    };
    let result = await service.room.query(condition);
    ctx.body = result;
  }
  async queryById() {
    const { ctx, service } = this;
    let { id } = ctx.params;
    let result = await service.room.queryById(id);
    ctx.body = result;
  }
  async create() {
    const { ctx, service } = this;
    let r = await service.room.create(ctx.request.body);
    ctx.body = r;
  }
  async update() {
    const { ctx, service } = this;
    let r = await service.room.update(ctx.request.body);
    ctx.body = r;
  }
  async list() {
    const { ctx, service } = this;
    let r = await service.room.list();
    ctx.body = r;
  }
  async del() {
    const { ctx, service } = this;
    let r = await service.room.del(ctx.params.id);
    ctx.body = r;
  }
}
module.exports = RoomController;
