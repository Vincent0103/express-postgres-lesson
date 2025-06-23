import { Router } from "express";
import usersController from "../controllers/usersController";

const usersRouter = Router();
usersRouter.get("/", usersController.usersListGet);
usersRouter.get("/new", usersController.usersCreateGet);
usersRouter.post("/new", usersController.usersCreatePost);

export default usersRouter;
