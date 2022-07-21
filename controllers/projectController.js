import mongoose from "mongoose"
import Project from "../models/Project.js"

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
    res.json(project)
  }else {
    const error = new Error("Not found!")
    return res.status(404).json({msg: error.message})
  }
    

}

const editProject = async (req, res) => {

}

const deleteProject = async (req, res) => {

}

const addCollaborator = async (req, res) => {

}

const deletCollaborator = async (req, res) => {

}

const getTasks = async (req, res) => {

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