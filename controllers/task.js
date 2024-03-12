import asyncHandler from "express-async-handler";
import Task from "../models/task.js";

// PATH     :   /api/v1/task/getAll
// METHOD   :   GET
// ACCESS   :   Valid User
// Desc     :   Get All Tasks
export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  res.json(tasks);
});

// PATH     :   /api/v1/task/getById
// METHOD   :   GET
// ACCESS   :   Valid User
// Desc     :   Get Specific Task
export const getById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id });
    if (task) res.json(task);
    res.json({ message: "Task Does not exist" });
    throw new Error("Invalid Id");
  } catch (error) {
    res.json({ error: error });
  }
});

// PATH     :   /api/v1/task/create
// METHOD   :   POST
// ACCESS   :   Valid User
// Desc     :   Create new Task
export const createTask = asyncHandler(async (req, res) => {
  const task = new Task({
    userId: req.user._id,
    title: req.body.title,
    description: req.body.description,
    isCompleted: req.body.isCompleted,
  });
  const newTask = await task.save();
  res.json({
    message: "task Created successfully",
    task: newTask,
  });
});

// PATH     :   /api/v1/task/delete
// METHOD   :   DELETE
// ACCESS   :   Valid User
// Desc     :   Delete a Task
export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task Deleted Successfully" });
  } catch (error) {
    res.json({ message: "Couldn't delete the task" });
  }
});

// PATH     :   /api/v1/task/edit
// METHOD   :   PUT
// ACCESS   :   Valid User
// Desc     :   Edit a Task
export const editTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  const { title, description, isCompleted } = req.body;

  task.title = title;
  task.description = description;
  task.isCompleted = isCompleted;

  const updatedTask = await task.save();

  res.json({ message: "updated successfully: ", task: updatedTask });
});
