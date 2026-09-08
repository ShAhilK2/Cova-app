import { Router } from "express";
import { createProject, deleteProjectById, getProjectById, getProjects, getStarredProjects, toggleStarProject } from "../controller/project.controller.js";




const router = Router()



router.post("/",createProject)
router.get("/",getProjects)


router.get("/starred",getStarredProjects)

router.get('/:projectId',getProjectById)


// patch vs put 

router.patch("/:projectId",toggleStarProject)



router.delete("/:projectId",deleteProjectById)



export default router