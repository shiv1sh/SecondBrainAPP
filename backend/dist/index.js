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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const midddleware_1 = require("./midddleware");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(3000, () => {
    console.log("Started running on port 3000");
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName;
    const password = req.body.password;
    try {
        yield db_1.UserModel.create({ userName, password });
        res.json({
            message: "User Signed up successfully"
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server error"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName;
    const password = req.body.password;
    try {
        const existingUser = yield db_1.UserModel.findOne({ userName, password });
        if (existingUser) {
            const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, config_1.JWT_SECRET);
            res.status(200).json({
                token
            });
        }
        else {
            res.status(403).json({
                message: "Wrong email or password"
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Something went wrong",
            error: e
        });
    }
}));
app.post("/api/v1/createContent", midddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const link = req.body.link;
    try {
        const added = yield db_1.ContentModel.create({
            title: title,
            link: link,
            tags: req.body.tags,
            userId: req.userId
        });
        if (added) {
            res.status(200).json({
                message: "Content added"
            });
        }
        else {
            res.json({
                message: "Something went wrong"
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Internal Server error",
            error: e.message
        });
    }
}));
app.get("/api/v1/getContent", midddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const content = yield db_1.ContentModel.find({
            userId: userId
        });
        if (content) {
            res.json({
                content
            });
        }
        else {
            res.json({
                message: "No content is found for the given user"
            });
        }
    }
    catch (e) {
        res.json({
            message: "An error occured",
            error: e
        });
    }
}));
app.delete("/api/v1/deleteContent", midddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.ContentModel.deleteMany({
            userId: req.userId
        });
        res.status(200).json({
            message: "Deleted the content"
        });
    }
    catch (e) {
        res.json({
            message: "Error occured",
            error: e.message
        });
    }
}));
app.post("/api/v1/brain/share", midddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.status(200).json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.generateRandomhHash)(10);
        try {
            yield db_1.LinkModel.create({
                hash: hash,
                userId: req.userId
            });
            res.status(200).json({
                message: "Link created successfully",
                hash: hash
            });
        }
        catch (e) {
            res.json({
                message: "An error occired while creating the link in the DB",
                error: e
            });
        }
    }
    else {
        try {
            yield db_1.LinkModel.deleteOne({
                userId: req.userId
            });
            res.json({
                message: "Link deleted successfully"
            });
        }
        catch (e) {
            res.json({
                message: "An error occured while deleting the link from DB",
                error: e
            });
        }
    }
}));
app.get("/api/v1/getBrain/:hash", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.hash;
    console.log(hash);
    const Link = yield db_1.LinkModel.findOne({
        hash: hash
    });
    if (!Link) {
        res.status(411).json({
            message: "Can not find any link with this hash"
        });
        return;
    }
    const userId = Link.userId;
    const content = yield db_1.ContentModel.findOne({
        userId: userId
    });
    const user = yield db_1.UserModel.findOne({
        _id: userId
    });
    if (!user) {
        res.json({
            message: "There is no user associated to given hash"
        });
        return;
    }
    if (content) {
        res.json({
            userName: user.userName,
            content: content
        });
    }
    else {
        res.status(401).json({
            message: "Can not find any contnent"
        });
    }
}));
