var mongoose = require('mongoose')

var contratosSchema = new mongoose.Schema({
    _id: {type: Number, require: true},
    nAnuncio: String,
    tipoprocedimento: String,
    objetoContrato: Boolean,
    datapublicacao: Boolean,
    dataCelebracaoContrato: Boolean,
    precoContratual: Number,
    prazoExecucao: String,
    NIPC_entidade_comunicante: String,
    entidade_comunicante: String,
    fundamentacao: String
}, {versionKey: false})

module.exports = mongoose.model('contrato', contratosSchema)
