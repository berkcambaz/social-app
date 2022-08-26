"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var bcrypt = require("bcrypt");
var db_1 = require("../db");
var utility_1 = require("../utility");
var email_validator_1 = require("email-validator");
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId;
        return __generator(this, function (_a) {
            userId = res.locals.userId;
            if (userId === undefined)
                return [2, res.status(404).send({})];
            return [2, res.status(200).send({ userId: userId })];
        });
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, usertag, password, _a, result, err, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.userId;
                    if (userId !== undefined)
                        return [2, res.status(404).send({})];
                    data = req.body;
                    if (data.usertag === undefined)
                        return [2, res.status(404).send({})];
                    if (data.password === undefined)
                        return [2, res.status(404).send({})];
                    if (data.usertag.length < 3 || data.usertag.length > 16)
                        return [2, res.status(404).send({})];
                    if (data.password.length < 8)
                        return [2, res.status(404).send({})];
                    usertag = data.usertag;
                    password = data.password;
                    return [4, db_1.db.query("SELECT id, password FROM user WHERE usertag=?", [usertag])];
                case 1:
                    _a = _b.sent(), result = _a.result, err = _a.err;
                    if (result.length === 0 || err)
                        return [2, res.status(404).send({})];
                    return [4, bcrypt.compare((0, utility_1.sha256)(password).toString("base64"), (0, utility_1.fromBinary)(result[0].password, "utf8"))];
                case 2:
                    if (!(_b.sent()))
                        return [2, res.status(404).send({})];
                    return [4, createToken(result[0].id)];
                case 3:
                    token = _b.sent();
                    if (token)
                        setToken(res, token);
                    return [2, res.status(200).send({ userId: result[0].id })];
            }
        });
    });
}
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, usertag, username, email, password, date, _a, result, err, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.userId;
                    if (userId !== undefined)
                        return [2, res.status(404).send({})];
                    data = req.body;
                    if (data.usertag === undefined)
                        return [2, res.status(404).send({})];
                    if (data.email === undefined)
                        return [2, res.status(404).send({})];
                    if (data.password === undefined)
                        return [2, res.status(404).send({})];
                    if (!/^[a-z0-9]*$/.test(data.usertag))
                        return [2, res.status(404).send({})];
                    if (data.usertag.length < 3 || data.usertag.length > 16)
                        return [2, res.status(404).send({})];
                    if (!(0, email_validator_1.validate)(data.email))
                        return [2, res.status(404).send({})];
                    if (data.password.length < 8)
                        return [2, res.status(404).send({})];
                    usertag = data.usertag;
                    username = usertag;
                    email = data.email;
                    return [4, bcrypt.hash((0, utility_1.sha256)(data.password).toString("base64"), 10)];
                case 1:
                    password = _b.sent();
                    date = (0, utility_1.utcTimestamp)();
                    return [4, db_1.db.query("\n     INSERT INTO user (username, usertag, email, password, date, follower_count, following_count, bio)\n     VALUES (?, ?, ?, ?, ?, 0, 0, '')\n   ", [username, usertag, email, password, date])];
                case 2:
                    _a = _b.sent(), result = _a.result, err = _a.err;
                    if (err)
                        return [2, res.status(404).send({})];
                    return [4, createToken(result.insertId)];
                case 3:
                    token = _b.sent();
                    if (token)
                        setToken(res, token);
                    return [2, res.status(200).send({ userId: result.insertId })];
            }
        });
    });
}
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId;
        return __generator(this, function (_a) {
            userId = res.locals.userId;
            if (userId === undefined)
                return [2, res.status(404).send({})];
            clearToken(res);
            return [2, res.status(200).send({})];
        });
    });
}
function getToken(req) {
    return req.cookies["token"] === undefined ? null : req.cookies["token"];
}
function setToken(res, token) {
    res.cookie("token", token, { secure: true, httpOnly: true, sameSite: true });
}
function clearToken(res) {
    res.clearCookie("token");
}
function createToken(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var selector, validator, validatorHash, expires, _a, result, err;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    selector = (0, utility_1.randomBytes)(16);
                    validator = (0, utility_1.randomBytes)(32);
                    validatorHash = (0, utility_1.sha256)(validator);
                    expires = (0, utility_1.utcTimestamp)() + 60 * 60 * 24 * 30;
                    return [4, db_1.db.query("\n    INSERT INTO auth (user_id, selector, validator, expires)\n    VALUES (?, ?, ?, ?)\n  ", [userId, selector, validatorHash, expires])];
                case 1:
                    _a = _b.sent(), result = _a.result, err = _a.err;
                    if (err)
                        return [2, null];
                    return [2, (0, utility_1.fromBinary)(selector, "base64url") + ":" + (0, utility_1.fromBinary)(validator, "base64url")];
            }
        });
    });
}
function parseToken(token) {
    return __awaiter(this, void 0, void 0, function () {
        var splitToken, selector, validator, _a, result, err;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (token === null)
                        return [2, null];
                    splitToken = token.split(":");
                    selector = (0, utility_1.toBinary)(splitToken[0], "base64url");
                    validator = (0, utility_1.toBinary)(splitToken[1], "base64url");
                    return [4, db_1.db.query("\n    SELECT user_id, validator, expires FROM auth WHERE selector=?\n  ", [selector])];
                case 1:
                    _a = _b.sent(), result = _a.result, err = _a.err;
                    if (result.length === 0 || err)
                        return [2, null];
                    if ((0, utility_1.utcTimestamp)() > result[0].expires)
                        return [2, null];
                    if (!(0, utility_1.compareBinary)((0, utility_1.sha256)(validator), result[0].validator))
                        return [2, null];
                    return [2, result[0].user_id];
            }
        });
    });
}
exports["default"] = { auth: auth, login: login, signup: signup, logout: logout, getToken: getToken, parseToken: parseToken };
