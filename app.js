const express = require("express")
const app = express()
const PORT = 3000
const router = require("./routes/router")
const session = require("express-session")

app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


app.use(router)
app.listen(PORT)

