import { Router } from "express"
import Post from "../controllers/PostController"

const router = new Router()

router.get('/', Post.getAll)
router.get('/:id', Post.getOne)
router.post('/', Post.create)
router.put('/:id', Post.update)
router.delete('/:id', Post.delete)

export default router