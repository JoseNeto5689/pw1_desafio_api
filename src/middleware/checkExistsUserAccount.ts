import { NextFunction, Request, Response } from "express";
import data from "../database";
import UserDB from "../database/UserDB";

export default function checkExistsUserAccount(req: Request, res: Response, next: NextFunction){
    const db = new UserDB(data)
    const { user_name } : { user_name: string } = req.headers as { user_name: string } 
    const user = db.getUser(user_name)

    if(user == null){
        return res.status(404).json({error: "user not found"})
    }
    req.body.user = user

    next()

}