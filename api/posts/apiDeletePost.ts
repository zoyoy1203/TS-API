import {DataStore} from '../../data/data';
import { RequestHandler } from 'express';
import { PublicInfo, APIError } from '../../model/shared/message';

export const apiDeletePost: RequestHandler = (req, res) => {
//  console.log(req.params.id);
    const postIndex = DataStore.posts.findIndex((item: any) => 
    item.id == req.params.id
    );
    console.log(postIndex);
    if(postIndex > -1) {
        DataStore.posts.splice(postIndex,1);
        // res.status(200).json({status: "success",message: "delete success"});
        res.json(new PublicInfo('post deleted',200));
    }else{
        // res.status(200).json({status: "failed",message: "delete failed"});
        res.json(new APIError("Validation Error","Post not found",400));
    }
}
