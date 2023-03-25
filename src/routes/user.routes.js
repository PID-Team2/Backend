import { Router } from "express";
import { getUsers, postUser } from "../controllers/user.controller.js";
const router = Router()

router.get('/user', getUsers)
router.get('/user/:id')
router.post('/user', postUser)
router.put('/user')
router.delete('/user:id')


export default router