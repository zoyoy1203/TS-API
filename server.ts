
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

app.listen(process.env.PORT || 8091, () => {
    console.log("Server started...");
});
