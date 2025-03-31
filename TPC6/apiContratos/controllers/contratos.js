var Contrato = require('../models/contrato')

module.exports.getContratos = () => {
    return Contrato
        .find()
        .exec()
}

module.exports.getContratoById = id => {
    return Contrato
        .findById(id)
        .exec()
    /*
    rturn Contrato
        .findOne({_id: id})
        .exec()
    */
}

module.exports.getContratosByEntidade = entidade => {
    return Contrato
        .find({entidade_comunicante: entidade})
        .exec()
}

module.exports.getContratosByTipo = tipo => {
    return Contrato
        .find({tipoprocedimento: tipo})
        .exec()
}

module.exports.getEntidades = () => {
    return Contrato
        .distinct('entidade_comunicante')
        .sort({entidade_comunicante: 1})
        .exec()
}

module.exports.getTipos = () => {
    return Contrato
        .distinct('tipoprocedimento')
        .sort({entidade_comunicante: 1})
        .exec()
}

module.exports.newContrato = async contrato => {
    var c = await Contrato.find({_id: contrato._id}).exec()
    if (c.length == 0) {
        var newContrato = new Contrato(contrato)
        newContrato._id = contrato._id
        console.log(newContrato)
        return newContrato
            .save()
    }
}

module.exports.updateContrato = (id, contrato) => {
    return Contrato
        .findByIdAndUpdate(id, contrato, {new: true})
        .exec()
}

module.exports.deleteContrato = (id) => {
    return Contrato
        .findByIdAndDelete(id, {new: true})
        .exec()
}
