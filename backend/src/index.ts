import express from 'express';
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from './db';
import { JWT_SECRET } from './config';
import { userMiddleware } from './midddleware';
import { generateRandomhHash } from './utils';
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log("Started running on port 3000");
})

app.post("/api/v1/signup", async (req, res) => {
    console.log(req.body)
    const userName = req.body.userName;
    const password = req.body.password;
    console.log(userName+" "+password)
    try {
        await UserModel.create({ userName, password });
        res.json({
            message: "User Signed up successfully"
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Internal Server error"
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    console.log(userName + " "+ password);

    try {
        const existingUser = await UserModel.findOne({ userName, password });
        if (existingUser) {
            const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
            res.status(200).json({
                token
            })
        } else {
            res.status(403).json({
                message: "Wrong email or password"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong",
            error: e
        })
    }
})

app.post("/api/v1/createContent", userMiddleware, async (req, res) => {
    const title = req.body.title;
    const link = req.body.link;

    try {
        const added = await ContentModel.create({
            title: title,
            link: link,
            type: req.body.type,
            userId: req.userId
        })
        if (added) {
            res.status(200).json({
                message: "Content added"
            })
        } else {
            res.json({
                message: "Something went wrong"
            })
        }
    } catch (e: any) {
        res.status(500).json({
            message: "Internal Server error",
            error: e.message
        })
    }
})

app.get("/api/v1/getContent", userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const content = await ContentModel.find({
            userId: userId
        })
        if (content) {
            res.json({
                content
            })
        } else {
            res.json({
                message: "No content is found for the given user"
            })
        }
    } catch (e) {
        res.json({
            message: "An error occured",
            error: e
        })
    }
})

app.delete("/api/v1/deleteContent", userMiddleware, async (req, res) => {
    try {
        await ContentModel.deleteMany({
            userId: req.userId
        })
        res.status(200).json({
            message: "Deleted the content"
        })
    } catch (e: any) {
        res.json({
            message: "Error occured",
            error: e.message
        })
    }
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const { share } = req.body;
    if (share) {
        const existingLink = await LinkModel.findOne({
            userId: req.userId
        })
        if (existingLink) {
            res.status(200).json({
                hash: existingLink.hash
            })
            return;
        }
        const hash = generateRandomhHash(10)
        try {
            await LinkModel.create({
                hash: hash,
                userId: req.userId
            })
            res.status(200).json({
                message: "Link created successfully",
                hash: hash
            })
        } catch (e) {
            res.json({
                message: "An error occired while creating the link in the DB",
                error: e
            })
        }
    } else {
        try {
            await LinkModel.deleteOne({
                userId: req.userId
            })
            res.json({
                message: "Link deleted successfully"
            })
        } catch (e) {
            res.json({
                message: "An error occured while deleting the link from DB",
                error: e
            })
        }
    }
})

app.get("/api/v1/getBrain/:hash", async (req, res) => {
    const hash = req.params.hash;
    console.log(hash)
    const Link = await LinkModel.findOne({
        hash: hash
    })
    if (!Link) {
        res.status(411).json({
            message: "Can not find any link with this hash"
        })
        return
    }
    const userId = Link.userId;

    const content = await ContentModel.findOne({
        userId: userId
    });

    const user = await UserModel.findOne({
        _id: userId
    })

    if (!user) {
        res.json({
            message: "There is no user associated to given hash"
        })
        return;
    }
    if (content) {
        res.json({
            userName: user.userName,
            content: content
        })
    } else {
        res.status(401).json({
            message: "Can not find any contnent"
        })
    }
})