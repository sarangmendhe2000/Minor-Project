const express = require('express')
const FrontController = require('../controllers/FrontController')
const UserController = require("../controllers/UserController")
const CourseController = require("../controllers/CourseController")
const AdminController = require("../controllers/AdminController")

const upload = require('../middleware/ImageMiddleware')
const auth = require('../middleware/AuthMiddleware')
const AuthRole = require('../middleware/AuthRole')

const router = express.Router()

//front controller
router.get('/',FrontController.login)
router.get('/home',auth,FrontController.home)


//admin controller
router.get('/admin/dashboard',auth,AuthRole("admin"),AdminController.dashboard)
router.get('/admin/enrolled_Students',auth,AdminController.enrolled_students)
router.get('/admin/pending_applications',auth,AdminController.pending_applications)
router.get('/admin/rejected_applications',auth,AdminController.rejected_applications)
router.get('/admin/application_display/:id',auth,AdminController.application_display)
router.post('/admin/update_status/:id',AdminController.update_status)

//user controller
router.get("/signup",UserController.signup);
router.post("/insertuser",UserController.insertuser);
router.post("/verify_login",UserController.verify_login);
router.get('/logout',UserController.logout);
router.get('/front/change_password/:id',auth,UserController.change_password);
router.post('/update_password/:id',auth,UserController.update_password);

//course controller
router.get("/btech_register",auth,CourseController.btech_register);
router.get("/bba_register",auth,CourseController.bba_register)
router.get("/bca_register",auth,CourseController.bca_register)
router.post("/registration",upload,auth,CourseController.registration);
router.get("/display",auth,CourseController.display);
router.get("/view_detail",auth,CourseController.view_detail);
router.get("/edit_detail/:id",auth,CourseController.edit_detail);
router.post("/update_detail/:id",upload,auth,CourseController.update_detail);

module.exports = router;