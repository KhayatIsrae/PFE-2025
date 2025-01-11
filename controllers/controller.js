
let WALLET_CONNECTED=""
module.exports = {
    get: (req, res) => {
        res.render("index.ejs", { WALLET_CONNECTED })
    }
    ,
    post:(req,res)=>{
        WALLET_CONNECTED=req.body.WALLET_CONNECTED
        res.redirect("/")
    }
}