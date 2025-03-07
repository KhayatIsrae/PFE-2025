const fs = require('fs');
const { disconnect } = require('process');

const loadDatabase = () => {
    return fs.promises.readFile("public/BD/bd.json")
        .then(buffer => buffer.toString())
        .then(string => JSON.parse(string))
        .then(data => data.etudiants)
        .catch(e => console.log(e))
}

const verifierUtilisateur = (email, password) => {
    return loadDatabase().then(etudiants => {
        const utilisateur = etudiants.find(user => user.email === email);
        if (!utilisateur) {
            return -1;
        }
        if (utilisateur.mdp !== password) {
            return 0;
        }
        return 1;
    })
};
const userId = async (email) => {
    return loadDatabase()
        .then(etudiants => {
            let utilisateur = etudiants.find(user => user.email === email);
            return utilisateur.id
        })
}

module.exports = {
    get: (req, res) => {
        let utilisateur
        if (!req.session.utilisateur || req.session.utilsateur == "") {
            utilisateur = ""
            req.session.destroy()
        } else {
            utilisateur = req.session.utilisateur
        }
        res.render("index.ejs", { utilisateur })
    }
    ,
    post: (req, res) => {
        let mail = req.body.mail
        let mdp = req.body.mdp
        let disconnect = req.body.disconnect
        if (disconnect) {
            req.session.utilisateur = ""
            return res.redirect("/")
        }
        else {
            verifierUtilisateur(mail, mdp)
                .then(result => {
                    if (result == -1) {
                        return res.status(404).json({ msg: "Utilisateur non trouvé" });
                    } else if (result) {
                        userId(mail)
                            .then(userId => {
                                req.session.utilisateur = userId
                                return res.redirect("/")
                            })
                    } else {
                        return res.status(401).json({ msg: "Mot de passe incorrect" });
                    }
                })
        }

    }
}