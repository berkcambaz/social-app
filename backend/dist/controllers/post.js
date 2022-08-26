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
var utility_1 = require("../utility");
function postPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, date, _a, result, err, post;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.userId;
                    if (userId === undefined)
                        return [2, res.status(404).send({})];
                    data = req.body;
                    if (data.content === undefined)
                        return [2, res.status(404).send({})];
                    if (data.content.length === 0 || data.content.length > 256)
                        return [2, res.status(404).send({})];
                    date = (0, utility_1.utcTimestamp)();
                    return [4, db_1.db.query("\n      INSERT INTO post (user_id, date, content, like_count)\n      VALUES (?, ?, ?, 0)\n    ", [userId, date, data.content])];
                case 1:
                    _a = _b.sent(), result = _a.result, err = _a.err;
                    if (err)
                        return [2, res.status(404).send({})];
                    post = {
                        id: result.insertId,
                        userId: userId,
                        date: date,
                        content: data.content,
                        likeCount: 0,
                        liked: false,
                        bookmarked: false
                    };
                    return [2, res.status(200).send({ post: post })];
            }
        });
    });
}
function getFeedPosts(req, res, next) {
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
                    if (data.anchor === undefined)
                        return [2, res.status(404).send({})];
                    if (data.type === undefined)
                        return [2, res.status(404).send({})];
                    values = [userId, userId];
                    if (data.anchor !== -1)
                        values.push(data.anchor);
                    return [4, db_1.db.query("\n      SELECT id, user_id, date, content, like_count FROM post\n      WHERE (user_id in (SELECT following_id FROM follow WHERE follower_id=?) OR post.user_id=?)\n      ".concat(data.anchor === -1 ? "" : data.type === "newer" ? "AND post.id>?" : "AND post.id<?", "\n      ORDER BY post.id ").concat(data.anchor === -1 ? "DESC" : data.type === "newer" ? "ASC" : "DESC", "\n      LIMIT 25 \n  "), values)];
                case 1:
                    _a = _e.sent(), result = _a.result, err = _a.err;
                    if (err)
                        return [2, res.status(404).send({})];
                    _c = (_b = res.status(200)).send;
                    _d = {};
                    return [4, normalizePosts(result, userId)];
                case 2: return [2, _c.apply(_b, [(_d.posts = _e.sent(), _d)])];
            }
        });
    });
}
function getUserPosts(req, res, next) {
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
                    if (data.userId === undefined)
                        return [2, res.status(404).send({})];
                    if (data.anchor === undefined)
                        return [2, res.status(404).send({})];
                    if (data.type === undefined)
                        return [2, res.status(404).send({})];
                    values = [data.userId];
                    if (data.anchor !== -1)
                        values.push(data.anchor);
                    return [4, db_1.db.query("\n      SELECT id, user_id, date, content, like_count FROM post\n      WHERE user_id=?\n      ".concat(data.anchor === -1 ? "" : data.type === "newer" ? "AND post.id>?" : "AND post.id<?", "\n      ORDER BY post.id ").concat(data.anchor === -1 ? "DESC" : data.type === "newer" ? "ASC" : "DESC", "\n      LIMIT 25 \n  "), values)];
                case 1:
                    _a = _e.sent(), result = _a.result, err = _a.err;
                    if (err)
                        return [2, res.status(404).send({})];
                    _c = (_b = res.status(200)).send;
                    _d = {};
                    return [4, normalizePosts(result, userId)];
                case 2: return [2, _c.apply(_b, [(_d.posts = _e.sent(), _d)])];
            }
        });
    });
}
function likePost(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, state, _a, result, err, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    userId = res.locals.userId;
                    if (userId === undefined)
                        return [2, res.status(404).send({})];
                    data = req.body;
                    if (data.postId === undefined)
                        return [2, res.status(404).send({})];
                    return [4, isPostLiked(userId, data.postId)];
                case 1:
                    state = _c.sent();
                    if (!state) return [3, 3];
                    return [4, db_1.db.query("\n      DELETE FROM post_like WHERE user_id=? AND post_id=?;\n      UPDATE post SET like_count=like_count-1 WHERE id=?;\n    ", [userId, data.postId, data.postId])];
                case 2:
                    _b = _c.sent();
                    return [3, 5];
                case 3: return [4, db_1.db.query("\n      INSERT INTO post_like (user_id, post_id) VALUES (?, ?);\n      UPDATE post SET like_count=like_count+1 WHERE id=?;\n    ", [userId, data.postId, data.postId])];
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
function bookmarkPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, state, _a, result, err, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    userId = res.locals.userId;
                    if (userId === undefined)
                        return [2, res.status(404).send({})];
                    data = req.body;
                    if (data.postId === undefined)
                        return [2, res.status(404).send({})];
                    return [4, isPostBookmarked(userId, data.postId)];
                case 1:
                    state = _c.sent();
                    if (!state) return [3, 3];
                    return [4, db_1.db.query("\n      DELETE FROM post_bookmark WHERE user_id=? AND post_id=?;\n    ", [userId, data.postId])];
                case 2:
                    _b = _c.sent();
                    return [3, 5];
                case 3: return [4, db_1.db.query("\n      INSERT INTO post_bookmark (user_id, post_id) VALUES (?, ?);\n    ", [userId, data.postId])];
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
function deletePost(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, _a, result, err;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.userId;
                    if (userId === undefined)
                        return [2, res.status(404).send({})];
                    data = req.body;
                    if (data.postId === undefined)
                        return [2, res.status(404).send({})];
                    return [4, db_1.db.query("\n    DELETE FROM post WHERE id=? AND user_id=?\n  ", [data.postId, userId])];
                case 1:
                    _a = _b.sent(), result = _a.result, err = _a.err;
                    if (err)
                        return [2, res.status(404).send({})];
                    return [2, res.status(200).send({})];
            }
        });
    });
}
function isPostLiked(userId, postId) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, result, err;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, db_1.db.query("\n    SELECT id FROM post_like WHERE user_id=? AND post_id=?\n  ", [userId, postId])];
                case 1:
                    _a = _b.sent(), result = _a.result, err = _a.err;
                    if (err || result.length === 0)
                        return [2, false];
                    return [2, true];
            }
        });
    });
}
function isPostBookmarked(userId, postId) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, result, err;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, db_1.db.query("\n    SELECT id FROM post_bookmark WHERE user_id=? AND post_id=?\n  ", [userId, postId])];
                case 1:
                    _a = _b.sent(), result = _a.result, err = _a.err;
                    if (err || result.length === 0)
                        return [2, false];
                    return [2, true];
            }
        });
    });
}
function normalizePosts(posts, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var normalized, i, post, _a, _b;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    normalized = [];
                    i = 0;
                    _d.label = 1;
                case 1:
                    if (!(i < posts.length)) return [3, 5];
                    post = posts[i];
                    _b = (_a = normalized).push;
                    _c = {
                        id: post.id,
                        userId: post.user_id,
                        date: post.date,
                        content: post.content,
                        likeCount: post.like_count
                    };
                    return [4, isPostLiked(userId, post.id)];
                case 2:
                    _c.liked = _d.sent();
                    return [4, isPostBookmarked(userId, post.id)];
                case 3:
                    _b.apply(_a, [(_c.bookmarked = _d.sent(),
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
    getFeedPosts: getFeedPosts,
    getUserPosts: getUserPosts,
    postPost: postPost,
    likePost: likePost,
    bookmarkPost: bookmarkPost,
    deletePost: deletePost
};
