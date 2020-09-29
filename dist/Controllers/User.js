"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _models = _interopRequireDefault(require("../models"));

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var User = _models["default"].User;
/**
 * @export
 * @class Users
 */

var Users = /*#__PURE__*/function () {
  function Users() {
    (0, _classCallCheck2["default"])(this, Users);
  }

  (0, _createClass2["default"])(Users, null, [{
    key: "create",

    /**
       * @name create
       * @async
       * @static
       * @memberof Users
       * @param {Object} req express request object
       * @param {Object} res express response object
       * @returns {JSON} JSON object with details of new user
       */
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var hashedPassword, user, id, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return User.findByEmail(req.body.email);

              case 3:
                if (!_context.sent) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", (0, _helpers.serverResponse)(res, 409, {
                  error: 'email has already been taken'
                }));

              case 5:
                _context.next = 7;
                return _bcryptjs["default"].hash(req.body.password, 10);

              case 7:
                hashedPassword = _context.sent;
                _context.next = 10;
                return User.create(_objectSpread({}, req.body, {
                  password: hashedPassword
                }));

              case 10:
                user = _context.sent;
                id = user.id;
                delete user.password;
                token = (0, _helpers.generateToken)({
                  id: id
                }, '24h');
                res.set('Authorization', token);
                return _context.abrupt("return", (0, _helpers.serverResponse)(res, 201, {
                  message: 'successful',
                  data: _objectSpread({}, user.dataValues, {
                    token: token
                  })
                }));

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  error: _context.t0
                }));

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 18]]);
      }));

      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
    /**
     * Method for handling signin route(POST api/v1/auth/login)
     * @param {object} request - the request object
     * @param {object} response  - object
     * @return { json }  - the response json
     */

  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response) {
        var _request$body, email, password, user, verifyPassword, id, dataValues, token;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _request$body = request.body, email = _request$body.email, password = _request$body.password;
                _context2.prev = 1;
                _context2.next = 4;
                return User.findOne({
                  where: {
                    email: email
                  }
                });

              case 4:
                user = _context2.sent;

                if (user) {
                  verifyPassword = _bcryptjs["default"].compareSync(password, user.password);
                }

                if (!(!user || !verifyPassword)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", (0, _helpers.serverResponse)(response, 401, {
                  message: 'username or password is incorrect'
                }));

              case 8:
                id = user.id, dataValues = user.dataValues;
                token = (0, _helpers.generateToken)({
                  id: id
                }, '24h');
                delete dataValues.password;
                return _context2.abrupt("return", (0, _helpers.serverResponse)(response, 200, {
                  message: 'login successful',
                  data: _objectSpread({}, dataValues, {
                    token: token
                  })
                }));

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", (0, _helpers.serverError)(request, response, _context2.t0));

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 14]]);
      }));

      function login(_x3, _x4) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
    /**
     * Method for handling signin route(POST api/v1/auth/login)
     * @param {object} request - the request object
     * @param {object} response  - object
     * @return { json }  - the response json
     */

  }, {
    key: "getUser",
    value: function () {
      var _getUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(request, response) {
        var user, token;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                user = request.user;
                token = response.locals.token;
                delete user.dataValues.password;
                return _context3.abrupt("return", (0, _helpers.serverResponse)(response, 200, {
                  user: _objectSpread({}, user.dataValues),
                  token: token
                }));

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", (0, _helpers.serverError)(request, response, _context3.t0));

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function getUser(_x5, _x6) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }()
  }]);
  return Users;
}();

var _default = Users;
exports["default"] = _default;