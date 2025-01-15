"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomhHash = void 0;
const generateRandomhHash = (len) => {
    let randomString = "qwertyuasdfg2345vbnm12345hjk";
    let length = randomString.length;
    let ans = "";
    for (var i = 0; i < len; i++) {
        ans += randomString[Math.floor((Math.random() * length))];
    }
    return ans;
};
exports.generateRandomhHash = generateRandomhHash;
