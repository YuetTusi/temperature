"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get("/", controller.home.index);

  //用户
  router.get("/users", controller.users.list);
  router.post("/users", controller.users.create);
  router.post("/users/login", controller.users.login);
  router.put("/users", controller.users.update);
  router.delete("/users/:id", controller.users.del);
  //小区
  router.get("/district/name", controller.district.queryDistrictName);
  router.get("/district/:id/building", controller.district.queryBuildingCount); //查小区下的楼栋数量(删除前判断用)
  router.get("/district/:id", controller.district.get);
  router.get("/district", controller.district.list);
  router.post("/district/:pageSize/:pageIndex", controller.district.query);
  router.post("/district", controller.district.create);
  router.put("/district", controller.district.update);
  router.delete("/district/:id", controller.district.del);
  //楼宇
  router.get("/building", controller.building.list);
  router.get("/building/:id", controller.building.queryById);
  router.get("/building/:id/district", controller.building.queryByDistrictId); //查询小区下的楼栋
  router.post("/building/:pageSize/:pageIndex", controller.building.query);
  router.post("/building", controller.building.create);
  router.put("/building", controller.building.update);
  router.delete("/building/:id", controller.building.del);
  //单元
  router.get("/unit", controller.unit.list);
  router.get("/unit/:id/building", controller.unit.queryByBuilding); //查询楼栋下的单元
  router.get("/unit/:id", controller.unit.queryById);
  router.post("/unit/:pageSize/:pageIndex", controller.unit.query);
  router.post("/unit", controller.unit.create);
  router.put("/unit", controller.unit.update);
  router.delete("/unit/:id", controller.unit.del);
  //房间
  router.get("/room", controller.room.list);
  router.get("/room/:id", controller.room.queryById);
  router.get("/room/:id/unit", controller.room.queryByUnit);
  router.post("/room/:pageSize/:pageIndex", controller.room.query); //分页查询
  router.post("/room", controller.room.create);
  router.put("/room", controller.room.update);
  router.delete("/room/:id", controller.room.del);
  //气温
  router.get("/temp", controller.temp.list);
  router.post("/temp", controller.temp.create);
  router.post("/temp/:room", controller.temp.chart); //曲线数据
  router.put("/temp", controller.temp.update);
  router.delete("/temp/:id", controller.temp.del);
};
