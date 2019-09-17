import { Request, Response, NextFunction } from 'express';

export interface CumtomRequest extends Request{
    user?: string
}

export interface CumtomResponse extends Response{

}

export type CustomReqeustHandler = (
    req: CumtomRequest,
    res:CumtomResponse,
    next: NextFunction
) => any;