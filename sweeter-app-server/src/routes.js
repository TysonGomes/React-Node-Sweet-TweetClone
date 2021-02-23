const express =require('express');
const routes =express.Router();
const authenticate = require("./auth");
const SweetController = require('./controllers/SweetController');
const UserController = require('./controllers/UsersController');

routes.post("/register",UserController.store);
routes.post("/login",UserController.login);
routes.get("/userfind",authenticate,UserController.finduser);
routes.get("/user/:id",authenticate,UserController.findOneUser);
routes.post("/sweet",authenticate,SweetController.sweetPost);
routes.put("/sweets/:id",authenticate,SweetController.likeDeslike);
routes.get("/find:id",authenticate,SweetController.findSweet);
routes.get("/sweets",authenticate,SweetController.sweetAll);
routes.delete("sweetdelete:id",authenticate,SweetController.sweetDelete)
module.exports=routes;