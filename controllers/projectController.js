import mongoose from "mongoose"
import Project from "../models/Project.js"
import Task from "../models/Task.js"

const getProjects = async (req, res) => {
  const projects = await Project.find().where('creator').equals(req.user)

  res.json(projects)
}

const newProject = async (req, res) => {
  const project = new Project(req.body)
  project.creator = req.user._id

  try {
    const saveProject = await project.save()
    res.json(saveProject)
  } catch (error) {
    console.log(error)
  }
}

const getProject = async (req, res) => {
  const { id } = req.params

  if(mongoose.Types.ObjectId.isValid(id)) {
    const project = await Project.findById(id)
    if (project.creator.toString() !== req.user._id.toString()){
      const error = new Error("Not a valid action")
      return res.status(404).json({msg: error.message})
    }

    // Get all task of the project 
    const tasks = await Task.find().where("project").equals(project._id)

    res.json({
      project,
      tasks
    })

  }else {
    const error = new Error("Not found!")
    return res.status(404).json({msg: error.message})
  }
}

const editProject = async (req, res) => {

  const { id } = req.params

  if(mongoose.Types.ObjectId.isValid(id)) {
    const project = await Project.findById(id)
    if (project.creator.toString() !== req.user._id.toString()){
      const error = new Error("Not a valid action")
      return res.status(404).json({msg: error.message})
    }

    project.name = req.body.name || project.name
    project.description = req.body.description || project.description
    project.deliveryDate = req.body.deliveryDate || project.deliveryDate
    project.client = req.body.client || project.client

    try {
      const saveProject = await project.save()
      res.json(saveProject)
    } catch (error) {
      console.log(error)
    }
  }else {
    const error = new Error("Not found!")
    return res.status(404).json({msg: error.message})
  }


}

const deleteProject = async (req, res) => {
 const { id } = req.params

  if(mongoose.Types.ObjectId.isValid(id)) {
    const project = await Project.findById(id)
    if (project.creator.toString() !== req.user._id.toString()){
      const error = new Error("Not a valid action")
      return res.status(404).json({msg: error.message})
    }

    try {
      await project.deleteOne()
      res.json({msg: "Project Deleted!"})
    } catch (error) {
      console.log(error)
    }

  }else {
    const error = new Error("Not found!")
    return res.status(404).json({msg: error.message})
  }

}

const addCollaborator = async (req, res) => {

}

const deletCollaborator = async (req, res) => {

}

const getTasks = async (req, res) => {
  const { id } = req.params

  const projectExist = await Project.findById(id)
  
  console.log("project", projectExist)

  if(!projectExist){
    const error = new Error("Not a valid action")
    return res.status(404).json({msg: error.message})

  }

  // Who is the project owner and collaborators

  const tasks = await Task.find().where('project').equals(id)
  res.json(tasks)

}

export {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject,
  addCollaborator,
  deletCollaborator,
  getTasks
}