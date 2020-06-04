import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import * as dt from 'dotenv-safe'
dt.config()

export const auth = async (req: Request, res: Response, next: NextFunction) => {


    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Token is required!' })
    }

    const [ ,token] = authHeader.split(' ')

    try {

        await jwt.verify(token, process.env.APP_SECRET)
        next()
        
    }catch(e) {
        return res.status(401).json({ message: 'Token invalid!' })
    }
}