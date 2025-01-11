const express=require("express")
const router=express.Router()

let WALLET_CONNECTED=""

router.route("/")
.get((req,res)=>{
    res.render("index.ejs",{WALLET_CONNECTED})
})
.post((req,res)=>{
    WALLET_CONNECTED=req.body.WALLET_CONNECTED
    res.redirect("/")
})


module.exports=router