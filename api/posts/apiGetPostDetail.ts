import {DataStore} from '../../data/data';
import { RequestHandler } from 'express';
import { PostDetail } from '../../model/shared/postDetail';


export const apiGetPostsDetail: RequestHandler = (req, res) => {
    const selectedPost = DataStore.posts.find(
        (element: any) => element.id == req.params.id 
    );

    if(selectedPost) {
        const selectedTods = DataStore.todos.filter(
            (item: any) => item.postId == req.params.id
        );
        const imgURLs = selectedPost.img.map((item: string) => {
            if(req.app.get('env') == 'development'){
                return 'http://localhost:8091/static/' + item;
            }else{
                return 'http://www.zyuanyuan.com/static/' + item;
            }
        });
        console.log(imgURLs);
        res.json(new PostDetail(selectedPost,selectedTods,imgURLs));
    }else{
        res.status(404).json({status: 'failed', message: 'post not found'});
    }

}