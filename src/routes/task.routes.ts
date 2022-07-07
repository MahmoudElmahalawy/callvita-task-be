import express from "express";
import { getAllTasks, getTaskById, addNewTask, editTask, deleteTask } from "../controllers/task.controller";

const router = express.Router();

router.get("/", getAllTasks);

router.get("/:id", getTaskById);

router.post("/", addNewTask);

router.put("/:id", editTask);

router.delete("/:id", deleteTask);

export default router;
