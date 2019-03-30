const Controller = require("egg").Controller;

/**
 * @description 用户
 */
class UserController extends Controller {
  constructor(props) {
    super(props);
    this.tableName = "users";
  }
  async list() {
    const { ctx, service } = this;
    let r = await service.users.list();
    ctx.body = r;
  }
  async create() {
    const { ctx, service } = this;
    const entity = ctx.request.body;
    let r = await service.users.create(entity);
    ctx.body = r;
  }
  async update() {
    const { ctx, service } = this;
    const entity = ctx.request.body;
    let r = await service.users.update(entity);
    ctx.body = r;
  }
  async del() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    let r = await service.users.del(id);
    ctx.body = r;
  }
}

module.exports = UserController;
