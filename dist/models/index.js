"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _dotenv = require("dotenv");

var dbData = _interopRequireWildcard(require("../config/config"));

(0, _dotenv.config)();

var base = _path["default"].basename(__filename);

var env = process.env.NODE_ENV;
var db = {};
var dbUrl = dbData[env];
var sequelize = new _sequelize["default"](process.env[dbUrl.use_env_variable], dbUrl);

_fs["default"].readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== base && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize["import"](_path["default"].join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = _sequelize["default"];
var _default = db;
exports["default"] = _default;