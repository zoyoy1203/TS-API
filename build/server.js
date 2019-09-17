"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const apiGetPosts_1 = require("./api/posts/apiGetPosts");
const apiGetPostDetail_1 = require("./api/posts/apiGetPostDetail");
const apiCreatePost_1 = require("./api/posts/apiCreatePost");
const apiDeletePost_1 = require("./api/posts/apiDeletePost");
const apiUpdatePost_1 = require("./api/posts/apiUpdatePost");
const apiUploadImage_1 = require("./api/posts/apiUploadImage");
const errorHandling_1 = require("./api/general/errorHandling");
const dateParam_1 = require("./api/general/reqParams/dateParam");
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
//配置static指向的路径
app.use('/static', express_1.default.static(path_1.default.resolve('./', 'public', 'img')));
/* const authenticator: CustomReqeustHandler = (req, res, next) =>
{
    const username = 'zyy';
    req.user = username;
    next();
};

const logger: CustomReqeustHandler = (req, res, next) => {
    console.log(
        "user:" + req.user +
        new Date() + '-' + req.method + '-' + 'Request to' + req.path
    );
    next();
};
//使用中间件
app.use(authenticator);
app.use(logger);
 */
//routes
app.get('/', (req, res, next) => {
    res.send('node typescript api is working...');
});
app.get("/posts", apiGetPosts_1.apiGetPosts);
app.get("/posts/:id", apiGetPostDetail_1.apiGetPostsDetail);
app.post('/posts', apiCreatePost_1.apiCreatePost);
app.delete('/posts/:id', apiDeletePost_1.apiDeletePost);
app.put('/posts/:id', apiUpdatePost_1.apiUpdatePost);
//上传图片
app.post('/posts/:id/img', apiUploadImage_1.apiUploadImage);
//处理错误信息
app.use(errorHandling_1.apiErrorHandler);
/*
GET: req.method
http: req.protocol
lhost: req.hostname
port: envirment
posts/id2/todos: req.originalURL
id2: req.params = {postID: id2}
?star=5: req.query={star: 5}
req.app
req.body
req.headers
res.secure, req.cookies, req.fresh...
*/
// app.use((req, res, next) => {
//     if(req.accepts('application/json')) {
//         next();
//     }else {
//         next(
//             new APIError(
//                 'Content Type Not supported',
//                 'This API only supports application/json',
//                 400
//             )
//         );
//     }
// });
// app.get('/headers', (req, res, next) => res.json(req.headers));
// const dateFormat = '\\d{4}-\\d{1,2}-\\d{1,2}';
// app.get(
//     `/booking/:fromDate(${dateFormat})/:toDate(${dateFormat})`,
//     (req, res, next) => {
//     res.json(req.params);
// });
app.get(`/booking/:fromDate/:toDate`, (req, res, next) => {
    res.json(req.params);
});
app.param('fromDate', dateParam_1.dateParam);
app.param('toDate', dateParam_1.dateParam);
app.listen(process.env.PORT || 8091, () => {
    console.log("Server started...");
});
