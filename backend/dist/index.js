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
exports.server = void 0;
var fastify_1 = require("fastify");
var cookie_1 = require("@fastify/cookie");
var static_1 = require("@fastify/static");
var path = require("path");
var db_1 = require("./db");
var config_1 = require("./config");
var auth_1 = require("./controllers/auth");
var auth_2 = require("./routes/auth");
var user_1 = require("./routes/user");
var post_1 = require("./routes/post");
db_1.db.init();
exports.server = (0, fastify_1.fastify)();
exports.server.register(cookie_1.fastifyCookie, { hook: "preHandler" });
exports.server.register(static_1.fastifyStatic, {
    root: path.join(__dirname, "../../frontend/dist"),
    preCompressed: true
});
exports.server.setNotFoundHandler(function (_req, res) { res.sendFile("index.html"); });
exports.server.addHook("preHandler", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                res.locals = Object.create(null);
                return [4, auth_1["default"].parseToken(res, auth_1["default"].getToken(req))];
            case 1:
                token = _a.sent();
                res.locals.userId = token === null ? undefined : token.userId;
                res.locals.tokenId = token === null ? undefined : token.tokenId;
                next();
                return [2];
        }
    });
}); });
exports.server.register(auth_2["default"], { prefix: "api/auth" });
exports.server.register(user_1["default"], { prefix: "api/user" });
exports.server.register(post_1["default"], { prefix: "api/post" });
exports.server.listen({ host: "0.0.0.0", port: config_1.config.port }, function (err, address) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log("Server has started on ".concat(address));
});
