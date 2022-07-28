import Project from "../models/Project.js"
import Task from "../models/Task.js"

const addTask = async (req, res) => {
  const { project } = req.body

  const projectExist = await Project.findById(project)

  if(!projectExist){
    const error = new Error('The project does not exist')
    return res.status(404).json({msg: error.message})
  }

  if(projectExist.creator.toString() !== req.user._id.toString()) {
    const error = new Error('You don´t have the right permissions for add Tasks')
    return res.status(403).json({msg: error.message})
  }

  try {
    const saveTask = await Task.create(req.body)
    res.json(saveTask)
  } catch (error) {
    console.log(error)
  }

}

const getTask = async (req, res) => {
  const { id } = req.params

  const task = await Task.findById(id).populate("project")

  if(!task) {
    const error = new Error('Task not found!')
    return res.status(404).json({msg: error.message})
  }

  if(task.project.creator.toString() !== req.user._id.toString()){
    const error = new Error('Not a valid action!')
    return res.status(403).json({msg: error.message})
  }

  res.json(task)

}

const updateTask = async (req, res) => {
  const { id } = req.params

  const task = await Task.findById(id).populate("project")

  if(!task) {
    const error = new Error('Task not found!')
    return res.status(404).json({msg: error.message})
  }

  if(task.project.creator.toString() !== req.user._id.toString()){
    const error = new Error('Not a valid action!')
    return res.status(403).json({msg: error.message})
  }

  task.name = req.body.name || task.name
  task.description = req.body.description || task.description
  task.priority = req.body.priority || task.priority
  task.deliveryDate = req.body.deliveryDate || task.deliveryDate

  try {
    const saveTask = await task.save()
    res.json(saveTask)
  } catch (error) {
    console.log(error)
  }
}

const deleteTask = async (req, res) => {
  const { id } = req.params

  const task = await Task.findById(id).populate("project")

  if(!task) {
    const error = new Error('Task not found!')
    return res.status(404).json({msg: error.message})
  }

  if(task.project.creator.toString() !== req.user._id.toString()){
    const error = new Error('Not a valid action!')
    return res.status(403).json({msg: error.message})
  }

  try {
    await task.deleteOne()
    res.json({msg: 'Task was deleted!!'})
  } catch (error) {
    console.log(error)
  }
}

const changeState = async (req, res) => {}

export {
  addTask,
  getTask,
  updateTask,
  deleteTask,
  changeState
}