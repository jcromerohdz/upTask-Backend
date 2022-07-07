import express from 'express'
import {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject,
  addCollaborator,
  deletCollaborator,
  getTasks
} from "../controllers/projectController.js"
import checkAuth from "../middleware/checkAuth.js"

const router = exporess.Router()

router.get('/', checkAuth, getProjects)
router.post('/', checkAuth, newProject)
router
  .route('/:id', )
  .get(checkAuth, getProject)
  .put(checkAuth, editProject)
  .delete(checkAuth, deleteProject)

router.get('/tasks/:id', checkAuth, getTasks)
router.post('/add-collaborator/:id', checkAuth, addCollaborator)
router.post('/delete-collaborator/:id', checkAuth, deletCollaborator)


export default router
