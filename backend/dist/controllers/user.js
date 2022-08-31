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
                    if (data.userId === undefined || typeof data.userId !== "number")
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
                    if (data.usertag === undefined || typeof data.usertag !== "string")
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
function searchUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, both, _a, result, err, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    userId = res.locals.userId;
                    if (userId === undefined)
                        return [2, res.status(404).send({})];
                    data = req.body;
                    if (data.user === undefined || typeof data.user !== "string")
                        return [2, res.status(404).send({})];
                    if (data.user.length === 0 || data.user.length > 32)
                        return [2, res.status(404).send({})];
                    both = !(data.user.length > 16);
                    data.user += "%";
                    return [4, db_1.db.query("\n    SELECT id, username, usertag, date, bio, following_count, follower_count FROM user\n    WHERE username LIKE ? ".concat(both ? "OR usertag LIKE ?" : "", "\n    ORDER BY id DESC\n    LIMIT 10\n  "), [data.user, data.user])];
                case 1:
                    _a = _e.sent(), result = _a.result, err = _a.err;
                    if (err || result.length === 0)
                        return [2, res.status(404).send({})];
                    _c = (_b = res.status(200)).send;
                    _d = {};
                    return [4, normalizeUsers(result, userId)];
                case 2: return [2, _c.apply(_b, [(_d.users = _e.sent(), _d)])];
            }
        });
    });
}
function followUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, state, _a, result1, err1, _b, err2, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    userId = res.locals.userId;
                    if (userId === undefined)
                        return [2, res.status(404).send({})];
                    data = req.body;
                    if (data.userId === undefined || typeof data.userId !== "number")
                        return [2, res.status(404).send({})];
                    if (data.userId === userId)
                        return [2, res.status(404).send({})];
                    return [4, isUserFollowed(userId, data.userId)];
                case 1:
                    state = _d.sent();
                    if (!state) return [3, 3];
                    return [4, db_1.db.query("DELETE FROM follow WHERE follower_id =? AND following_id =? ", [userId, data.userId])];
                case 2:
                    _b = _d.sent();
                    return [3, 5];
                case 3: return [4, db_1.db.query("INSERT INTO follow(follower_id, following_id) VALUES(?, ?)", [userId, data.userId])];
                case 4:
                    _b = _d.sent();
                    _d.label = 5;
                case 5:
                    _a = _b, result1 = _a.result, err1 = _a.err;
                    if (err1 || result1.affectedRows === 0)
                        return [2, res.status(404).send({})];
                    if (!state) return [3, 7];
                    return [4, db_1.db.query("\n      UPDATE user SET follower_count = follower_count - 1 WHERE id =?;\n      UPDATE user SET following_count = following_count - 1 WHERE id =?;\n", [data.userId, userId])];
                case 6:
                    _c = _d.sent();
                    return [3, 9];
                case 7: return [4, db_1.db.query("\n      UPDATE user SET follower_count = follower_count + 1 WHERE id =?;\n      UPDATE user SET following_count = following_count + 1 WHERE id =?;\n", [data.userId, userId])];
                case 8:
                    _c = _d.sent();
                    _d.label = 9;
                case 9:
                    err2 = (_c).err;
                    if (err2)
                        return [2, res.status(404).send({})];
                    return [2, res.status(200).send({ state: !state })];
            }
        });
    });
}
function getUserFollowers(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, values, _a, result, err, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    userId = res.locals.userId;
                    if (userId === undefined)
                        return [2, res.status(404).send({})];
                    data = req.body;
                    if (data.userId === undefined || typeof data.userId !== "number")
                        return [2, res.status(404).send({})];
                    if (data.anchor === undefined || typeof data.anchor !== "number")
                        return [2, res.status(404).send({})];
                    if (data.type === undefined || typeof data.type !== "string")
                        return [2, res.status(404).send({})];
                    values = [data.userId];
                    if (data.anchor !== -1)
                        values.push(data.anchor);
                    return [4, db_1.db.query("\n      SELECT id, username, usertag, date, bio, following_count, follower_count FROM user\n      WHERE id IN(SELECT follower_id FROM follow WHERE following_id =?)\n      ".concat(data.anchor === -1 ? "" : data.type === "newer" ? "AND user.id>?" : "AND user.id<?", "\n      ORDER BY user.id ").concat(data.anchor === -1 ? "DESC" : data.type === "newer" ? "ASC" : "DESC", "\n      LIMIT 25\n  "), values)];
                case 1:
                    _a = _e.sent(), result = _a.result, err = _a.err;
                    if (err)
                        return [2, res.status(404).send({})];
                    _c = (_b = res.status(200)).send;
                    _d = {};
                    return [4, normalizeUsers(result, userId)];
                case 2: return [2, _c.apply(_b, [(_d.users = _e.sent(), _d)])];
            }
        });
    });
}
function getUserFollowings(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, values, _a, result, err, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    userId = res.locals.userId;
                    if (userId === undefined)
                        return [2, res.status(404).send({})];
                    data = req.body;
                    if (data.userId === undefined || typeof data.userId !== "number")
                        return [2, res.status(404).send({})];
                    if (data.anchor === undefined || typeof data.anchor !== "number")
                        return [2, res.status(404).send({})];
                    if (data.type === undefined || typeof data.type !== "string")
                        return [2, res.status(404).send({})];
                    values = [data.userId];
                    if (data.anchor !== -1)
                        values.push(data.anchor);
                    return [4, db_1.db.query("\n      SELECT id, username, usertag, date, bio, following_count, follower_count FROM user\n      WHERE id IN(SELECT following_id FROM follow WHERE follower_id =?)\n      ".concat(data.anchor === -1 ? "" : data.type === "newer" ? "AND user.id>?" : "AND user.id<?", "\n      ORDER BY user.id ").concat(data.anchor === -1 ? "DESC" : data.type === "newer" ? "ASC" : "DESC", "\n      LIMIT 25\n  "), values)];
                case 1:
                    _a = _e.sent(), result = _a.result, err = _a.err;
                    if (err)
                        return [2, res.status(404).send({})];
                    _c = (_b = res.status(200)).send;
                    _d = {};
                    return [4, normalizeUsers(result, userId)];
                case 2: return [2, _c.apply(_b, [(_d.users = _e.sent(), _d)])];
            }
        });
    });
}
function editUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, username, bio, _a, result, err;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.userId;
                    if (userId === undefined)
                        return [2, res.status(404).send({})];
                    data = req.body;
                    if (data.username === undefined || typeof data.username !== "string")
                        return [2, res.status(404).send({})];
                    if (data.bio === undefined || typeof data.bio !== "string")
                        return [2, res.status(404).send({})];
                    username = data.username.trim();
                    bio = data.bio.trim();
                    if (username.length === 0 || username.length > 32)
                        return [2, res.status(404).send({})];
                    if (bio.length > 256)
                        return [2, res.status(404).send({})];
                    return [4, db_1.db.query("\n    UPDATE user SET username =?, bio =? WHERE id =?\n  ", [username, bio, userId])];
                case 1:
                    _a = _b.sent(), result = _a.result, err = _a.err;
                    if (err)
                        return [2, res.status(404).send({})];
                    return [2, res.status(200).send({})];
            }
        });
    });
}
function isUserFollowed(followerId, followingId) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, result, err;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, db_1.db.query("\n    SELECT id FROM follow WHERE follower_id =? AND following_id =?\n  ", [followerId, followingId])];
                case 1:
                    _a = _b.sent(), result = _a.result, err = _a.err;
                    if (err || result.length === 0)
                        return [2, false];
                    return [2, true];
            }
        });
    });
}
function normalizeUsers(users, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var normalized, i, user, _a, _b;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    normalized = [];
                    i = 0;
                    _d.label = 1;
                case 1:
                    if (!(i < users.length)) return [3, 5];
                    user = users[i];
                    _b = (_a = normalized).push;
                    _c = {
                        id: user.id,
                        bio: user.bio,
                        tag: user.usertag,
                        name: user.username,
                        date: user.date,
                        followerCount: user.follower_count,
                        followingCount: user.following_count
                    };
                    return [4, isUserFollowed(userId, user.id)];
                case 2:
                    _c.following = _d.sent();
                    return [4, isUserFollowed(user.id, userId)];
                case 3:
                    _b.apply(_a, [(_c.follower = _d.sent(),
                            _c)]);
                    _d.label = 4;
                case 4:
                    ++i;
                    return [3, 1];
                case 5: return [2, normalized];
            }
        });
    });
}
exports["default"] = {
    getUserById: getUserById,
    getUserByTag: getUserByTag,
    searchUser: searchUser,
    followUser: followUser,
    getUserFollowers: getUserFollowers,
    getUserFollowings: getUserFollowings,
    editUser: editUser
};
