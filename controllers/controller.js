
module.exports = {
    get: (req, res) => {
        let WALLET_CONNECTED
        if (!req.session.WALLET_CONNECTED || req.session.WALLET_CONNECTED == "") {
            WALLET_CONNECTED = ""
            req.session.destroy()
        } else {
            WALLET_CONNECTED = req.session.WALLET_CONNECTED
        }
        res.render("index.ejs", { WALLET_CONNECTED })
    }
    ,
    post: (req, res) => {
        req.session.WALLET_CONNECTED=req.body.WALLET_CONNECTED
        res.redirect("/")
    }
}