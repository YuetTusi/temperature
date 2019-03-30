const BaseService = require("./base");

class RoomService extends BaseService {
  constructor(props) {
    super(props);
    this.tableName = "room";
  }
}

module.exports = RoomService;
