
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { apiGetPosts} from './api/posts/apiGetPosts';
import { apiGetPostsDetail} from './api/posts/apiGetPostDetail';
import { apiCreatePost} from './api/posts/apiCreatePost';
import { apiDeletePost} from './api/posts/apiDeletePost';
import { apiUpdatePost} from './api/posts/apiUpdatePost';
import { apiUploadImage } from './api/posts/apiUploadImage';
import { apiErrorHandler } from './api/general/errorHandling';
import { APIError } from './model/shared/message';
import { dateParam } from './api/general/reqParams/dateParam';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//配置static指向的路径
app.use('/static',express.static(path.resolve('./','public','img')));

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
app.get('/',(req, res, next) => {
    res.send('node typescript api is working...');
});

app.get("/posts", apiGetPosts);
app.get("/posts/:id",apiGetPostsDetail);


app.post('/posts',apiCreatePost);
app.delete('/posts/:id', apiDeletePost);
app.put('/posts/:id', apiUpdatePost);

//上传图片
app.post('/posts/:id/img',apiUploadImage);

//处理错误信息
app.use(apiErrorHandler)


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

app.get(
    `/booking/:fromDate/:toDate`,
    (req, res, next) => {
    res.json(req.params);
});
app.param('fromDate', dateParam);
app.param('toDate', dateParam);


app.listen(process.env.PORT || 8091, () => {
    console.log("Server started...");
});
