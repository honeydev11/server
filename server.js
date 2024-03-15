import dotenv from "dotenv";
import express from "express";
import path from "path";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/task.js";
import passport from "passport";
import ConnectDb from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import registerAuthMiddleware from "./config/passport.js";
import cors from "cors";

dotenv.config();

ConnectDb();

const app = express();
registerAuthMiddleware(passport);
app.use(passport.initialize());
app.use(cors({ origin: "*" }));

app.use(express.json());

app.use(express.static("public"));


const routePrefix = "/api/v1";

app.get(routePrefix, (req, res) => {
  res.json({ message: "API is Running..." });
});

app.use(`${routePrefix}/auth`, authRoutes);
app.use(`${routePrefix}/task`, taskRoutes);

app.get('/*', function (_, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.use((_, res, __) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(errorHandler);

const port = process.env.NODE_PORT | 5000;

app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_MODE} mode at port ${port}.`
  );
});
