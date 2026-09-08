import redis from "../../../shared/redis/redis.js";
import { Project } from "../models/project.model.js";


export const createProject = async(req, res) => {
  try {
    const userId = req.headers["x-user-id"]

    if(!userId) {
      return res.status(401).json({ message:"Unauthorized" });
    }

    const {name,description} = req.body;

    if(!name) {
      return res.status(400).json({ message:"Name is required" });
    }

    const project = await Project.create({
      owner: userId,
      name,
      description
    });

     const key = `projects-${userId}`

     await redis.del(key)

    return res.status(201).json(project);

  } catch (error) {
    res.status(500).json({ message:"Something went wrong while creating project" });
  }
}

 
export const getProjects = async(req, res) => {
  try {
    const userId = req.headers["x-user-id"]

    if(!userId) {
      return res.status(401).json({ message:"Unauthorized" });
    }

    const key = `projects-${userId}`


    let result = await redis.get(key)

    if(result){
        return res.status(200).json(JSON.parse(result));
    }
 

    const projects = await Project.find({
      owner: userId
    }).sort({updatedAt: -1})


    await redis.set(key,JSON.stringify(projects))

    return res.status(200).json(projects);
    
    
  } catch (error) {
    res.status(500).json({ message:"Something went wrong in getting projects" });
  }
}


export const getProjectById = async(req, res) => {
  try {
    
    const {id: projectId} = req.params

 

    if(!projectId) {
      return res.status(400).json({ message:"Project ID is required" });
    }

    const project = await Project.findById(projectId);
    project.lastOpenedAt = new Date();
    await project.save();

    if(!project) {
      return res.status(404).json({ message:"Project not found" });
    }


    
    return res.status(200).json(project);
    
    
  } catch (error) {
    res.status(500).json({ message:"Something went wrong in getting project by ID" });
  }
}



export const getStarredProjects = async(req, res) => {
  try {
    const userId = req.headers["x-user-id"]

    if(!userId) {
      return res.status(401).json({ message:"Unauthorized" });
    }


    const key = `starred-projects-${userId}`


    let result = await redis.get(key)

    if(result){
        return res.status(200).json(JSON.parse(result));
    }

    const projects = await Project.find({
      owner: userId,
      starred: true
    }).sort({updatedAt: -1})


    await redis.set(key,JSON.stringify(projects))
  



    return res.status(200).json(projects);
    
    
  } catch (error) {
    res.status(500).json({ message:"Something went wrong in getting starred projects" });
  }
}


export const toggleStarProject = async(req, res) => {
  try {
    const userId = req.headers["x-user-id"]

    if(!userId) {
      return res.status(401).json({ message:"Unauthorized" });
    }
    const {id: projectId} = req.params

    if(!projectId) {
      return res.status(400).json({ message:"Project ID is required" });
    }

    const project = await Project.findById(projectId);

    if(!project) {
      return res.status(404).json({ message:"Project not found" });
    }



    project.starred = !project.starred;
    await project.save();
      const key = `starred-projects-${userId}`

    await redis.del(key)

    return res.status(200).json(project);
    
    
  } catch (error) {
    res.status(500).json({ message:"Something went wrong in toggling star project" });
  }
}



export const deleteProjectById = async(req, res) => {
  try {
    const userId = req.headers["x-user-id"]

    if(!userId) {
      return res.status(401).json({ message:"Unauthorized" });
    }
    const {id: projectId} = req.params

    if(!projectId) {
      return res.status(400).json({ message:"Project ID is required" });
    }

    const project = await Project.findByIdAndDelete(projectId);

    if(!project) {
      return res.status(404).json({ message:"Project not found" });
    }

    const key = `projects-${userId}`
    await redis.del(key)

    return res.status(200).json({ project });
    
    
  } catch (error) {
    res.status(500).json({ message:"Something went wrong in deleting project" });
  }
}