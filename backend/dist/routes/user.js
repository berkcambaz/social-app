"use strict";
exports.__esModule = true;
var express = require("express");
var user_1 = require("../controllers/user");
var router = express.Router();
router.post("/followUser", user_1["default"].followUser);
router.post("/getUserById", user_1["default"].getUserById);
router.post("/getUserByTag", user_1["default"].getUserByTag);
exports["default"] = router;
