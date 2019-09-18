
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { apiErrorHandler } from './api/general/errorHandling';
import { APIError } from './model/shared/message';
import { dateParam } from './api/general/reqParams/dateParam';
import { apiCheckPostFilter } from './api/posts/apiCheckPostFilter';
import { apiDownloadImage } from './api/posts/apiDownloadImage';
import { postsRouter } from './api/posts/apiPosts';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//配置static指向的路径
app.use('/static',express.static(path.resolve('./','public','img')));

//设置允许跨域
app.use((req,res,next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE'
    });
    next();
});

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

app.use('/posts',postsRouter);

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


/* Response Object
res.send
res.json
res.format
res.sendFile
res.download
res.headers res.get res.set 
res.status
*/

app.get('/static/download/:id', apiDownloadImage);
app.disable('x-powered-by'); 

/* 
2xx - success
3xx - redirect 重定向
4xx - client error 客户端
5xx - server error 服务端
*/

/* 
200 - ok 数据请求成功并返回
301 - 创建（POST,PUT,PATCH）
204 - 删除 请求成功但没数据返回
*/

/* 
400 - 请求错误
401 - 未授权 未携带token
404 - 未找到页面，页面不存在
405 - 方法未经允许，post 到只读数据中
*/

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
