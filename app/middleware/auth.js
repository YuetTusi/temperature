const jwt = require("jsonwebtoken");

module.exports = function(options, app) {
  return async function(ctx, next) {
    const token = ctx.get("authorization");

    try {
      jwt.verify(token, app.config.JWT_KEY);
      await next();
    } catch (error) {
      ctx.body = "登录 Token 验证失败";
      ctx.status = 401;
    }
  };
};
