"use strict";
exports.__esModule = true;
var express = require("express");
var user_1 = require("../controllers/user");
var router = express.Router();
router.post("/getUserFollowers", user_1["default"].getUserFollowers);
router.post("/getUserFollowings", user_1["default"].getUserFollowings);
router.post("/searchUser", user_1["default"].searchUser);
router.post("/followUser", user_1["default"].followUser);
router.post("/getUserById", user_1["default"].getUserById);
router.post("/getUserByTag", user_1["default"].getUserByTag);
router.post("/editUser", user_1["default"].editUser);
exports["default"] = router;
