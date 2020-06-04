import { Request, Response} from 'express'
import knex from '../database/connection'
import bcrypt = require("bcrypt")
import * as jwt from 'jsonwebtoken'
import * as dt from 'dotenv-safe'
dt.config()

class userController {    
    async createUser (req: Request, res: Response) {
        try {
            const { user, email, password, passwordConfirmation } = req.body

            if ( password !== passwordConfirmation ) {
                return res.json({
                    statuscode: 204,
                    message: 'Both passwords need to match '
                })
            }

            if(!email) {
                return res.json({ 
                    statuscode: 204,
                    error: "Missing param email"
                })
            }

            if (!user ) {
                return res.json({ 
                    statuscode: 204,
                    error: "Missing param user"
                })
            }

            const hashPassword = await bcrypt.hash(password, 8)
            

            await knex('users').insert({
                user,
                email,
                password: hashPassword,
                passwordConfirmation: hashPassword
            })
            
            console.log(`User ${user} was successfully added`)
            return res.send(`User ${user} was successfully added`)

            
        } catch (e) {
            return res.send(`An error ocurred when creating user`)
        }
    }

    async deleteUserById (req: Request, res: Response) {
        try{
            const { userId } = req.body

            if (!userId) {
                return res.json({
                    statuscode: 204,
                    error: "Missing param user id"
                })
            }

            await knex('users').where('id', userId).del()

            return res.json(`User who id was ${userId} deleted`)

        } catch (e) {

            return res.send(`An error ocurred when deleting a user by id`)
        }
    }

    async userIndex (req: Request, res: Response) {
        try {
            const users = await knex('users').select('*')

            const serializedUsers = users.map( user => {
                return {
                    id: user.id,
                    user: user.user,
                    email: user.email
                }
            })
            return res.json(serializedUsers)

        } catch (e) {
            return res.send(`An error ocurred when listing all the users`)
        }
    }

    async findUserById (req: Request, res: Response) {
        try {
            const userId = req.params.id

            const user = await knex.select('id', 'user', 'email').from('users').where('id', userId)
            
            res.json(user)

        } catch (e) {
            return res.send(`An error ocurred when  filtered users, error: ${e}`)
        }
    }

    async userLogin (req: Request, res: Response) {
        try {
        const { email, password } = req.body

        const findUser = await knex.select('id', 'email', 'password').from('users').where('email', email)
  
        if ( !findUser ) {
            return res.json('Invalid email')
        }

        const checkPassword = await bcrypt.compare(password, findUser[0].password)

        if ( !checkPassword ) {
            return res.json('Invalid password')
        }

        const id = findUser[0].id
    
        const token = jwt.sign({ id }, process.env.APP_SECRET, {
            expiresIn: '1d'
        })
        
        const data = {
            id: id,
            email: findUser[0].email,
            token

        }

        

        return res.json(data)

    }catch (e) {
        return res.send(`An error ocurred when user login error: ${e}`)
    }
    }

}

export default new userController()
