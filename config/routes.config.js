const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller")
const getConstroller = require("../controllers/get.controller")

//consultas por Query listado, posicion, badges y privilegios
router.get ( "/employees", getConstroller.usersconsults);

//Busqueda por route parameter nombre y con mas edad
router.get ( "/employees/:parametro",getConstroller.userinfo);

//Agregar un empleado
router.post ( "/employees",postController.newUser);


module.exports = router;
