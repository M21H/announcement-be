import { Router } from 'express'
import Post from '../controllers/PostController'
import authMiddleware from '../middlewares/authMiddleware'

const router = new Router()

router.get('/', authMiddleware, Post.getAll)
router.get('/:id', authMiddleware, Post.getOne)
router.post('/', authMiddleware, Post.create)
router.put('/:id', authMiddleware, Post.update)
router.delete('/:id', authMiddleware, Post.delete)

export default router
