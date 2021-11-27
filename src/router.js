import { Router } from "express"
import Post from "./controllers/PostController"

const router = new Router()

router.get('/anns', Post.getAll)
router.get('/anns/:id', Post.getOne)
router.post('/anns', Post.create)
router.put('/anns/:id', Post.update)
router.delete('/anns/:id', Post.delete)

export default router