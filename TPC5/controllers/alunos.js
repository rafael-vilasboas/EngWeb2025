var Aluno = require('../models/aluno')

module.exports.list = () => {
    return Aluno
        .find()
        .sort({nome: 1})
        .exec()
}

module.exports.findById = id => {
    return Aluno
        .findOne({_id: id})
        .exec()
}

module.exports.insert = async aluno => {
    var a = await Aluno.find({_id: aluno.id}).exec()
    if (a.length == 0) {
        var newAluno = new Aluno(aluno)
        newAluno._id = aluno.id
        console.log(newAluno)
        return newAluno
            .save()
    }
}

module.exports.update = (id, aluno) => {
    for (let i = 1; i <= 8; i++) {
        if (!aluno[`tpc${i}`]) aluno[`tpc${i}`] = false;
    }
    return Aluno
        .findByIdAndUpdate(id, aluno)
        .exec()
}

module.exports.delete = (id) => {
    return Aluno
        .findByIdAndDelete(id)
        .exec()
}
/*
module.exports.inverteTpc = (id, idTpc) => {
    return Aluno
        .findOne({_id: id})
        .exec()
        .then(aluno => {
            var tpc = `tpc${idTpc}`
            if (aluno[tpc] != null) {
                aluno[tpc] = !aluno[tpc]
            }
            else {
                aluno[tpc] = true
            }
            return Aluno
                .findByIdAndUpdate(id, aluno)
                .exec()
        })
}
*/
module.exports.inverteTpc = async (id, idTpc) => {
    var aluno = await Aluno
        .findOne({_id: id})
        .exec()
        var tpc = `tpc${idTpc}`
        if (aluno[tpc] != null) {
            aluno[tpc] = !aluno[tpc]
        }
        else {
            aluno[tpc] = true
        }
        return Aluno
            .findByIdAndUpdate(id, aluno)
            .exec()
}
