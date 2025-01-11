const express=require("express")
const app=express()
const PORT=3000
const router=require("./routes/router")

app.use(express.json())
app.set("view engine" , "ejs")
app.use(express.static('public'))
app.use(router)





app.listen(PORT)

