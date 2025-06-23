import "dotenv/config"
import express from "express";
import path from "path";
import usersRouter from "./routes/usersRouter";

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", usersRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
