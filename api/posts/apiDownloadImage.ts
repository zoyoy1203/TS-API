import { RequestHandler } from "express-serve-static-core";
import path from 'path';
import { APIError } from "../../model/shared/message";


export const apiDownloadImage: RequestHandler = (req,res,next) => {
    const fileID = req.params.id;
    res.download(path.resolve('./','public','img',fileID), err => {
        if(err){
            next(new APIError('Donwload Failed',"Can't Download requested file",400));
        }
    });
}