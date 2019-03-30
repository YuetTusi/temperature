const { Controller } = require("egg");

/**
 * @description 房间
 */
class RoomController extends Controller {
  constructor(props) {
    super(props);
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
