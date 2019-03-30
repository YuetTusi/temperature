const { Controller } = require("egg");

/**
 * @description 气温
 */
class TempController extends Controller {
  constructor(props) {
    super(props);
  }
  async create() {
    const { ctx, service } = this;
    let r = await service.temp.create(ctx.request.body);
    ctx.body = r;
  }
  async update() {
    const { ctx, service } = this;
    let r = await service.temp.update(ctx.request.body);
    ctx.body = r;
  }
  async list() {
    const { ctx, service } = this;
    let r = await service.temp.list();
    ctx.body = r;
  }
  async del() {
    const { ctx, service } = this;
    let r = await service.temp.del(ctx.params.id);
    ctx.body = r;
  }
}

module.exports = TempController;
