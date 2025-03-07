const fs = require('fs');
const path = "public/BD/bdexam.json";

const loadExams = () => {
    return fs.promises.readFile(path)
        .then(buffer => JSON.parse(buffer.toString()))
        .then(data => data.exams)
        .catch(() => [])
}

const saveExam = (exam) => {
    return loadExams()
        .then(exams => {
            exams.push(exam)
            return exams
        }).then(tab => {
            return fs.promises.writeFile(path, JSON.stringify({ exams: tab }, null, 3));
        })
}
module.exports = {
    post: async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Headers", "Content-Type")
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, DELETE, POST, PUT")
        const { nom, date, id } = req.body;
        if (!nom || !date) {
            return res.status(400).json({ msg: "Nom et date obligatoires" })
        }
        const newExam = { id, nom, date }
        await saveExam(newExam)
        res.status(201).json({ msg: "exam ajoutee avec succes" })
        res.end()
    },
    get: (req, res) => {
        loadExams()
            .then(exams => {
                if (exams) {
                    res.status(200).json({ exams })
                } else {
                    res.status(400)
                }
            }).catch(err => res.status(500))
    }
}