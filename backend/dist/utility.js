"use strict";
exports.__esModule = true;
exports.compareBinary = exports.fromBinary = exports.toBinary = exports.convertEncoding = exports.randomBytes = exports.sha256 = exports.utcTimestamp = void 0;
var crypto = require("crypto");
function utcTimestamp() {
    return Math.floor(Date.now() / 1000);
}
exports.utcTimestamp = utcTimestamp;
function sha256(input) {
    return crypto.createHash("sha256").update(input).digest();
}
exports.sha256 = sha256;
function randomBytes(length) {
    return crypto.randomBytes(length);
}
exports.randomBytes = randomBytes;
function convertEncoding(input, from, to) {
    return Buffer.from(input, from).toString(to);
}
exports.convertEncoding = convertEncoding;
function toBinary(input, from) {
    return Buffer.from(input, from);
}
exports.toBinary = toBinary;
function fromBinary(input, to) {
    return input.toString(to);
}
exports.fromBinary = fromBinary;
function compareBinary(a, b) {
    return a.compare(b) === 0;
}
exports.compareBinary = compareBinary;
