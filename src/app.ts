import express, { Application, Request, Response, NextFunction, Errback } from "express";
import morgan from "morgan";
import cors from "cors";

//importing environment variables
require("dotenv/config");

//importing routes
import taskRoutes from "./routes/task.routes";

const app: Application = express();

//api prefix
const api = process.env.API_URL;

app.use(cors());
app.options("*", cors<Request>());

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
	res.send(err);
});

//routes
app.use(`${api}tasks`, taskRoutes);

//starting the server
app.listen(8000, () => {
	console.log("Server is up and running at http://localhost:8000/");
});
