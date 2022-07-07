import fs from "fs";
import { Request, Response } from "express";

interface Task {
	id: Number;
	title: String;
	description: String;
}

const getAllTasks = (req: Request, res: Response) => {
	setTimeout(() => {
		// *** I added the delay because of an error that occurs when trying to call this fn right after editing the json file
		fs.readFile("data.json", "utf-8", (err, data) => {
			if (err) return res.status(500).json({ success: false, error: err });

			const tasks = JSON.parse(data);
			return res.status(200).json({ success: true, tasks });
		});
	}, 500);
};

const getTaskById = (req: Request, res: Response) => {
	fs.readFile("data.json", "utf-8", (err, data) => {
		if (err) return res.status(500).json({ success: false, error: err });

		const tasks = JSON.parse(data);
		const { id } = req.params;
		const task = tasks.find((t: Task) => t.id === +id);
		if (!task) return res.status(404).json({ success: false, error: "Task not found" });

		return res.status(200).json({ success: true, task });
	});
};

const addNewTask = (req: Request, res: Response) => {
	fs.readFile("data.json", "utf-8", (err, data) => {
		if (err) return res.status(500).json({ success: false, error: err });

		const tasks = JSON.parse(data);
		const { title, description } = req.body;
		const id = +Date.now().toString().substring(10);

		tasks.push({ id, title, description });

		updateFile(tasks, res);
	});
};

const editTask = (req: Request, res: Response) => {
	fs.readFile("data.json", "utf-8", (err, data) => {
		if (err) return res.status(500).json({ success: false, error: err });

		const tasks = JSON.parse(data);
		const { id } = req.params;
		const taskIndex = tasks.findIndex((t: Task) => t.id === +id);
		if (taskIndex === -1) return res.status(404).json({ success: false, error: "Task not found" });

		const { title, description } = req.body;

		if (title) tasks[taskIndex].title = title;
		if (description) tasks[taskIndex].description = description;

		updateFile(tasks, res);
	});
};

const deleteTask = (req: Request, res: Response) => {
	fs.readFile("data.json", "utf-8", (err, data) => {
		if (err) return res.status(500).json({ success: false, error: err });

		const tasks = JSON.parse(data);
		const { id } = req.params;
		const newTasks = tasks.filter((t: Task) => t.id !== +id);

		updateFile(newTasks, res);
	});
};

function updateFile(newData: Task[], res: Response) {
	fs.writeFile("data.json", JSON.stringify(newData, null, 2), "utf8", (err) => {
		if (err) return res.status(500).json({ success: false, error: err });

		return res.status(204).end();
	});
}

export { getAllTasks, getTaskById, addNewTask, editTask, deleteTask };
