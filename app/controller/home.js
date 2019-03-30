"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { app, ctx } = this;
    let data = await app.mysql.query("select * from users");
    console.log(data);
    ctx.body = "hi, egg";
  }
}

module.exports = HomeController;
