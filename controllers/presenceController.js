const marquerPresence= (idExam,etudiant)=>{
    //logique pour marquer presence
}


module.exports={
    post: (req,res)=>{
        const idExam=req.body.idExam
        const etudiant=req.body.etudiant
        marquerPresence(idExam,etudiant)
        res.redirect("/")
    }
}