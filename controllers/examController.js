const fs = require('fs');
const path = "public/BD/bdexam.json";

const loadExams = () => {
    return fs.promises.readFile(path)
        .then(buffer => JSON.parse(buffer.toString()))
        .then(data => data.exams)
        .catch((e) => console.error(e))
}

const saveExam = (exam) => {
    return loadExams()
        .then(exams => {
            exams.push(exam)
            return exams
        }).then(tab => {
            return fs.promises.writeFile(path, JSON.stringify({ exams: tab }, null, 3));
        }).catch(e => console.error(e))
}
module.exports = {
    post: async (req, res) => {
        try {
            const { nom, date, id } = req.body;
            if (!nom || !date) {
                return res.status(400).json({ msg: "Nom et date obligatoires" })
            }
            const newExam = { id, nom, date }
            await saveExam(newExam)
            res.status(201).json({ msg: "exam ajoutee avec succes" })
            res.end()
        } catch (err) {
            console.error(err)
            res.status(500).json({ msg: "erreur interne du serveur" })
        }

    },
    get: (req, res) => {
        loadExams()
            .then(exams => {
                if (exams) {
                    res.status(200).json({ exams })
                } else {
                    res.status(400).json({ msg: "aucun exam disponible" })
                }
            }).catch(err => {
                console.error(err)
                res.status(500).json({ msg: "erreur interne du serveur" })
            })
    }
}