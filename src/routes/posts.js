import { Router } from 'express'
import Post from '../controllers/PostController'
import authMiddleware from '../middlewares/authMiddleware'

const router = new Router()

router.get('/', authMiddleware, Post.getAll)
router.get('/:id', Post.getOne)
router.post('/', Post.create)
router.put('/:id', Post.update)
router.delete('/:id', Post.delete)

export default router
