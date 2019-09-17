"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
const postDetail_1 = require("../../model/shared/postDetail");
exports.apiGetPostsDetail = (req, res) => {
    const selectedPost = data_1.DataStore.posts.find((element) => element.id == req.params.id);
    if (selectedPost) {
        const selectedTods = data_1.DataStore.todos.filter((item) => item.postId == req.params.id);
        const imgURLs = selectedPost.img.map((item) => {
            if (req.app.get('env') == 'development') {
                return 'http://localhost:8091/static/' + item;
            }
            else {
                return 'http://www.zyuanyuan.com/static/' + item;
            }
        });
        console.log(imgURLs);
        res.json(new postDetail_1.PostDetail(selectedPost, selectedTods, imgURLs));
    }
    else {
        res.status(404).json({ status: 'failed', message: 'post not found' });
    }
};
