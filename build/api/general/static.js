"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const path_1 = __importDefault(require("path"));
const v4_1 = __importDefault(require("uuid/v4"));
function getFileUploader(env) {
    switch (env) {
        case "development":
            const fileId = v4_1.default();
            const fileStore = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, path_1.default.resolve("./", "public", "img"));
                },
                filename: function (req, file, cb) {
                    cb(null, fileId + path_1.default.extname(file.originalname));
                }
            });
            return multer({ storage: fileStore }).single('file');
        case "production":
            return (req, res, next) => { next(); };
        default:
            return (req, res, next) => { next(); };
    }
}
exports.getFileUploader = getFileUploader;
