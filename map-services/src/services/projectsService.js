const projectsService = require('../services/projectsService');

const getAllProjects = async (req, res) => {
  try {
    const projects = await projectsService.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await projectsService.getProjectById(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createProject = async (req, res) => {
  const projectData = req.body;
  try {
    const newProject = await projectsService.createProject(projectData);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const projectData = req.body;
  try {
    const updatedProject = await projectsService.updateProject(id, projectData);
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await projectsService.deleteProject(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};