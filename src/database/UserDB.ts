import { Technology, User } from "../types"

export default class UserDB{
    database: User[]
    constructor(database: User[]){
        this.database = database
    }

    findUserIndex(userId: string) : number{
        return this.database.findIndex((value) => userId == value.id)
    }

    findUserByName(user_name: string) : number{
        return this.database.findIndex((value) => user_name == value.user_name)
    }

    getUser(user_name: string) : User | null{
        let userIndex = this.findUserByName(user_name)
        if(userIndex === -1) {
            return null
        }
        return this.database[userIndex]
    }

    getUserTechnologies(user_name: string){
        let userIndex = this.findUserByName(user_name)
        if(userIndex === -1) {
            return null
        }
        return this.database[userIndex].technologies
    }

    createUser(user: User): void{
        this.database.push(user)
    }

    deleteUser(userId: string ): void{
        let userIndex = this.findUserIndex(userId)
        this.database = this.database.splice(userIndex, 1)
    }

    updateUser(oldUserID: string, newUser: User){
        let userIndex = this.findUserIndex(oldUserID)
        this.database[userIndex] = {
            ...newUser
        } as User
    }

    getTechnology(user_name: string, technologyId: string) : Technology | null{
        let userIndex = this.findUserByName(user_name)
        if(userIndex === -1) {
            return null
        }
        let technologyIndex = this.database[userIndex].technologies.findIndex((value) => value.id === technologyId)
        if(technologyIndex === -1) {
            return null
        }
        return this.database[userIndex].technologies[technologyIndex]

    }

    addTechnology(user_name: string, technology: Technology){
        let userIndex = this.findUserByName(user_name)
        this.database[userIndex].technologies.push(technology)
    }

    removeTechnology(userName: string, technologyId: string){
        let userIndex = this.findUserByName(userName)
        let technologyIndex = this.database[userIndex].technologies.findIndex((value) => value.id === technologyId)
        this.database[userIndex].technologies.splice(technologyIndex, 1)
    }

    updateTechnology(userName: string, technologyId: string, technology: Technology){
        let userIndex = this.findUserByName(userName)
        let technologyIndex = this.database[userIndex].technologies.findIndex((value) => value.id === technologyId)
        if(technologyIndex === -1) {
            return null
        }
        this.database[userIndex].technologies[technologyIndex] = { ...technology } as Technology

        return this.database[userIndex].technologies[technologyIndex]
    }


}