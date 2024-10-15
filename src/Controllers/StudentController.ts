import { createStudentService, getMyAverageService, getMyGradesService} from "../Services/StudentService";
import { RequestWithToken} from "../Types/Interfaces/dto/reqDto"
import {Request, Response} from "express"


const register = async (req: Request, res: Response) => {
    try {
        const data = await createStudentService(req.body)
        res.status(201).json({error: false, message: "User Created", data})
    } catch (error: any) {
        console.log(error)
        res.status(500).json({message: "could not create user", 'error': error.message})
    }
}

const getMyAverageGrade = async (req: RequestWithToken, res: Response): Promise<void> => {
    try {
        
        const user_id = req.user.userId
        const data = await getMyAverageService( user_id)
        res.status(200).json({error: false, message: "success getting average grade", data})
    } catch (error) {
        res.status(500).json({message: "could not get average grade", 'error': error})
    }
}

const getMyGrades = async (req: RequestWithToken, res: Response): Promise<void> => {
    try {
        
        const user_id = req.user.userId
        const data = await getMyGradesService( user_id)
        res.status(200).json({error: false, message: "success getting average grade", data})
    } catch (error) {
        res.status(500).json({message: "could not get average grade", 'error': error})
    }
}

export {
    register,
    getMyAverageGrade,
    getMyGrades
}