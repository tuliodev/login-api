import { Router} from 'express'
import userController from '../controllers/userControllers'

import { auth } from '../middlewares/auth'

const route = Router()

route.post('/user', userController.userLogin)

route.use(auth)

route.get('/user', userController.userIndex)
route.get('/user/:id', userController.findUserById)
route.post('/user/create', userController.createUser)
route.delete('/user/delete', userController.deleteUserById)

module.exports = route