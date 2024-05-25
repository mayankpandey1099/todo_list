const express = require("express");
const UserController = require("../controller/UserController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const userRouter = express.Router();

userRouter.post("/signup", UserController.signupUser);
userRouter.post("/login", UserController.loginUser);
userRouter.get("/users", AuthMiddleware.verify, UserController.getAllUser);

module.exports = userRouter;
