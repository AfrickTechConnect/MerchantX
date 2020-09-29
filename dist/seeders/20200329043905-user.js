"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _default = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      firstname: 'Adeyemi',
      lastname: 'Adekorede',
      email: 'adekorede@mailinator.com',
      type: 'admin',
      avatarUrl: 'https://res.cloudinary.com/teamrambo50/image/upload/v1565160704/avatar-1577909_1280_xsoxql.png',
      password: _bcryptjs["default"].hashSync('password@5', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstname: 'Adeyemi',
      lastname: 'korede',
      type: 'user',
      email: 'ade@mailinator.com',
      avatarUrl: 'https://res.cloudinary.com/teamrambo50/image/upload/v1565160704/avatar-1577909_1280_xsoxql.png',
      password: _bcryptjs["default"].hashSync('password@5', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
exports["default"] = _default;