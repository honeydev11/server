import express from "express";
import passport from "passport";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTasks,
  getById,
} from "../controllers/task.js";

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createTask
);

router.get(
  "/getAll",
  passport.authenticate("jwt", { session: false }),
  getAllTasks
);

router.get(
  "/getById/:id",
  passport.authenticate("jwt", { session: false }),
  getById
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  deleteTask
);

router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  editTask
);

export default router;
