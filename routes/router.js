const express = require("express")
const router=express.Router()
const controller=require("../controllers/controller")
const presenceController=require("../controllers/presenceController")


router.route("/")
.get(controller.get)
.post(controller.post)

router.route("/marquerPresence")
.post(presenceController.post)

module.exports=router