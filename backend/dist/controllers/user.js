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
var db_1 = require("../db");
function getUserById(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, _a, result, err, user;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    userId = res.locals.userId;
                    if (userId === undefined)
                        return [2, res.status(404).send({})];
                    data = req.body;
                    if (data.userId === undefined)
                        return [2, res.status(404).send({})];
                    return [4, db_1.db.query("\n    SELECT id, username, usertag, date, bio, following_count, follower_count FROM user WHERE id=?\n  ", [data.userId])];
                case 1:
                    _a = _c.sent(), result = _a.result, err = _a.err;
                    if (result.length === 0 || err)
                        return [2, res.status(404).send({})];
                    _b = {
                        id: result[0].id,
                        name: result[0].username,
                        tag: result[0].usertag,
                        date: result[0].date,
                        bio: result[0].bio,
                        followingCount: result[0].following_count,
                        followerCount: result[0].follower_count
                    };
                    return [4, isUserFollowed(userId, result[0].id)];
                case 2:
                    _b.following = _c.sent();
                    return [4, isUserFollowed(result[0].id, userId)];
                case 3:
                    user = (_b.follower = _c.sent(),
                        _b);
                    return [2, res.status(200).send({ user: user })];
            }
        });
    });
}
function getUserByTag(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, _a, result, err, user;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    userId = res.locals.userId;
                    if (userId === undefined)
                        return [2, res.status(404).send({})];
                    data = req.body;
                    if (data.usertag === undefined)
                        return [2, res.status(404).send({})];
                    return [4, db_1.db.query("\n    SELECT id, username, usertag, date, bio, following_count, follower_count FROM user WHERE usertag=?\n  ", [data.usertag])];
                case 1:
                    _a = _c.sent(), result = _a.result, err = _a.err;
                    if (result.length === 0 || err)
                        return [2, res.status(404).send({})];
                    _b = {
                        id: result[0].id,
                        name: result[0].username,
                        tag: result[0].usertag,
                        date: result[0].date,
                        bio: result[0].bio,
                        followingCount: result[0].following_count,
                        followerCount: result[0].follower_count
                    };
                    return [4, isUserFollowed(userId, result[0].id)];
                case 2:
                    _b.following = _c.sent();
                    return [4, isUserFollowed(result[0].id, userId)];
                case 3:
                    user = (_b.follower = _c.sent(),
                        _b);
                    return [2, res.status(200).send({ user: user })];
            }
        });
    });
}
function followUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, state, _a, result, err, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    userId = res.locals.userId;
                    if (userId === undefined)
                        return [2, res.status(404).send({})];
                    data = req.body;
                    if (data.userId === undefined)
                        return [2, res.status(404).send({})];
                    return [4, isUserFollowed(userId, data.userId)];
                case 1:
                    state = _c.sent();
                    if (!state) return [3, 3];
                    return [4, db_1.db.query("\n      DELETE FROM follow WHERE follower_id=? AND following_id=?;\n      UPDATE user SET follower_count=follower_count-1 WHERE id=?;\n      UPDATE user SET following_count=following_count-1 WHERE id=?;\n    ", [userId, data.userId, data.userId, userId])];
                case 2:
                    _b = _c.sent();
                    return [3, 5];
                case 3: return [4, db_1.db.query("\n      INSERT INTO follow (follower_id, following_id) VALUES (?, ?);\n      UPDATE user SET follower_count=follower_count+1 WHERE id=?;\n      UPDATE user SET following_count=following_count+1 WHERE id=?;\n    ", [userId, data.userId, data.userId, userId])];
                case 4:
                    _b = _c.sent();
                    _c.label = 5;
                case 5:
                    _a = _b, result = _a.result, err = _a.err;
                    if (err)
                        return [2, res.status(404).send({})];
                    return [2, res.status(200).send({ state: !state })];
            }
        });
    });
}
function isUserFollowed(followerId, followingId) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, result, err;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, db_1.db.query("\n    SELECT id FROM follow WHERE follower_id=? AND following_id=?\n  ", [followerId, followingId])];
                case 1:
                    _a = _b.sent(), result = _a.result, err = _a.err;
                    if (err || result.length === 0)
                        return [2, false];
                    return [2, true];
            }
        });
    });
}
exports["default"] = {
    getUserById: getUserById,
    getUserByTag: getUserByTag,
    followUser: followUser
};
