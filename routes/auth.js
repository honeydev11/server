import express from "express";
import passport from "passport";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("This is a protected route!");
  }
);

export default router;
