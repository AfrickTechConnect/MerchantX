"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.production = exports.test = exports.development = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var development = {
  use_env_variable: 'DB_URL_DEV',
  dialect: 'postgres'
};
exports.development = development;
var test = {
  use_env_variable: process.env.HEROKU_POSTGRESQL_TEAL_URL,
  dialect: 'postgres'
};
exports.test = test;
var production = {
  use_env_variable: process.env.HEROKU_TEST_TEAL_URL,
  dialect: 'postgres'
};
exports.production = production;