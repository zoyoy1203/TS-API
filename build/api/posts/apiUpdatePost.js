"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
exports.apiUpdatePost = (req, res) => {
    console.log(req.params.id);
    const postIndex = data_1.DataStore.posts.findIndex((item) => item.id == req.params.id);
    if (postIndex > -1) {
        const originalPost = data_1.DataStore.posts[postIndex];
        const updatePost = {
            id: req.params.id,
            userId: req.body.userId || originalPost.userId,
            title: req.body.title || originalPost.title,
            body: req.body.body || originalPost.body,
            price: req.body.price || originalPost.price,
            currency: req.body.currency || originalPost.currency,
            img: originalPost.img
        };
        //更新数据
        data_1.DataStore.posts[postIndex] = updatePost;
        res.status(200).json({ status: 'success', message: 'update success' });
    }
    else {
        res.status(200).json({ status: "failed", message: "update failed" });
    }
    // DataStore.posts.push(newPost);
    // res.send("数据添加成功！");
    // res.json(newPost);
};
