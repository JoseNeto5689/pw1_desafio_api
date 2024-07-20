import UserDB from "../database/UserDB";
import data from "../database";
import { Request, Response } from "express";
import { v4 } from "uuid" 
import { Technology, User } from "../types";

class UserController{

    createUser(req: Request, res: Response){
        const db = new UserDB(data)
        const { name, user_name } : { name: string, user_name: string } = req.body

        if(db.findUserByName(user_name) !== -1){
            return res.status(400).json({error: "User already exists"})
        }

        const user: User = {
            id: v4(),
            name,
            user_name,
            technologies: [] as Technology[]
        }

        db.createUser(user)

        return res.json(user)
    }

    getUserTechnologies(req: Request, res: Response){
        const db = new UserDB(data)
        const { user_name } : { user_name: string } = req.headers as { user_name: string } 
        
        let userTechnologies = db.getUserTechnologies(user_name)

        return res.json(userTechnologies)

    }

    addTechnology(req: Request, res: Response){
        const db = new UserDB(data)
        const { user_name } : { user_name: string } = req.headers as { user_name: string } 
        const { title, deadline } : { title: string, deadline: string } = req.body

        if(new Date(deadline) < new Date()){
            return res.status(400).json({error: "Invalid date"})
        }

        const technology: Technology = {
            id: v4(),
            title,
            deadline: new Date(deadline),
            created_at: new Date(),
            studied: false
        } 

        db.addTechnology(user_name, technology)

        res.json(db.getUserTechnologies(user_name))

    }

    updateTechnology(req: Request, res: Response){
        const db = new UserDB(data)
        const { user_name } : { user_name: string } = req.headers as { user_name: string } 
        const { title, deadline } : { title: string, deadline: string } = req.body
        const { id }: { id: string } = req.params as { id : string }

        if(!db.getTechnology(user_name, id)){
            return res.status(404).json({error: "Technology not found"})
        }

        if(!!deadline && new Date(deadline) < new Date()){
            return res.status(400).json({error: "Invalid date"})
        }

        const technologyOld = db.getTechnology(user_name, id)

        const technologyNew: Technology = {
            ...technologyOld,
            title,
            deadline: deadline ? new Date(deadline) : technologyOld.deadline
        } 


        const technology = db.updateTechnology(user_name, id, technologyNew)

        
        res.json(technology)

    }

    updateTechnologyStatus(req: Request, res: Response){
        const db = new UserDB(data)
        const { user_name } : { user_name: string } = req.headers as { user_name: string } 
        const { id }: { id: string } = req.params as { id : string }
        

        if(!db.getTechnology(user_name, id)){
            return res.status(404).json({error: "Technology not found"})
        }

        const technologyOld = db.getTechnology(user_name, id)

        const technologyNew: Technology = {
            ...technologyOld,
            studied: true
        } 

        const technology = db.updateTechnology(user_name, id, technologyNew)

        
        res.json(technology)

    }

    deleteTechnology(req: Request, res: Response){
        const db = new UserDB(data)
        const { user_name } : { user_name: string } = req.headers as { user_name: string } 
        const { id }: { id: string } = req.params as { id : string }

        if(!db.getTechnology(user_name, id)){
            return res.status(404).json({error: "Technology not found"})
        }

        db.removeTechnology(user_name, id)

        
        res.json({status: "Technology removed"})
    }
    


}

export default UserController