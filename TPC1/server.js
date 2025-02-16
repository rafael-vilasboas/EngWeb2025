const http = require('http')
//const meta = require('./auxiliar')
const axios = require('axios')

http.createServer((req, res) => {
    if (req.url != "/favicon.ico") {
        console.log("METHOD: " + req.method)
        console.log("URL: " + req.url)
    }

    switch(req.method) {
        case "GET":
            if (req.url == "/") {
                res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
                res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">')
                res.write("<h1 class='w3-container w3-green' style='max-height: 10%; margin-top: 0; margin-bottom: 0;'>Oficina</h1>")
                res.write("<ul class='w3-ul w3-hoverable' style='margin-top: 0'>")
                res.write("<li><a href='/reparacoes'>Listar Reparações</a></li>")
                res.write("<li><a href='/intervencoes'>Listar Intervenções</a></li>")
                res.write("<li><a href='/veiculos'>Listar Veículos</a></li>")
                res.write("</ul>")
                res.end()
            }
            else if(req.url == "/reparacoes") {
                header = ["Nome", "Data", "Número Intervenções"]
                center = [2]
                func = [r => { return r.nome }, r => { return r.data }, r => { return r.nr_intervencoes }]
                listar(req, res, "reparacoes", "?_sort=nome", header, center, func, "nif")
            }
            else if (req.url.match(/\/reparacoes\/.+/)) {
                consultar(req, res, "reparacoes", "nome")
            }
            else if (req.url == "/intervencoes") {
                header = ["Código", "Nome"]
                center = []
                func = [i => { return i.codigo }, i => { return i.nome }]
                listar(req, res, "intervencoes", "?_sort=codigo", header, center, func, "codigo")
            }
            else if (req.url.match(/\/intervencoes\/.+/)) {
                consultar(req, res, "intervencoes", "nome")
            }
            else if (req.url == "/veiculos") {
                header = ["Marca", "Modelo", "Matricula"]
                center = []
                func = [v => { return v.marca }, v => { return v.modelo }, v => { return v.matricula }]
                listar(req, res, "veiculos", "?_sort=marca", header, center, func, "matricula")
            }
            else if (req.url.match(/\/veiculos\/.+/)) {
                consultar(req, res, "veiculos", "matricula")
            }
            else {
                res.writeHead(404, {'Content-Type' : 'text/html;charset=utf8'})
                res.end()
            }
            break;
        default:
            res.writeHead(405, {'Content-Type' : 'text/html;charset=utf8'})
            res.end()
            break;
    }
}).listen(1234)

console.log("Servidor à escuta na porta 1234...")

function listar(req, res, obj, list = "", header = [""], center = [], func = [], id) {
    axios.get(`http://localhost:3000/${obj}${list}`)
    .then(resp => {
        var data = resp.data
        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
        res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">')
        res.write(`<h1 class='w3-container w3-green w3-border-bottom w3-border-light-grey' style='max-height: 10%; margin-top: 0; margin-bottom: 0;'>${capitalize(obj)}</h1>`)
        res.write("<div class='w3-responsive' style='height: 80%'>")
        res.write("<table class='w3-table w3-striped w3-bordered w3-hoverable'>")
        res.write("<tr class='w3-green' style='position: sticky; top: 0'>")
        header.forEach((h, index) => {
            if (center.includes(index)) res.write(`<th class='w3-center'>${h}</th>`)
            else res.write(`<th>${h}</th>`)
        })
        res.write("<th></th>")
        res.write("</tr>")
        data.forEach(d => {
            res.write("<tr class='w3-align-center'>")
            func.forEach((f, index) => {
                if (center.includes(index)) res.write(`<td class='w3-center'>${f(d)}</td>`)
                else res.write(`<td>${f(d)}</td>`)
            })
            res.write(`<td><a href='/${obj}/${d[`${id}`]}' class='w3-button w3-green w3-round-large w3-hover-light-grey'><b>Ir</b></a></td>`)
            res.write("</tr>")
        });
        res.write("</table>")
        res.write("</div>")
        res.write(`<a href='/' class='w3-button w3-green w3-round-large w3-hover-light-grey w3-margin'><b>Voltar</b><a>`)
        res.end()
    })
    .catch(err => {
        res.writeHead(500, {'Content-Type' : 'text/html;charset=utf8'})
        console.log(err)
        res.end()
    })
}

function capitalize(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1)
}

function consultar(req, res, obj, titulo) {
    var id = req.url.split("/")[2]
    axios.get(`http://localhost:3000/${obj}/${id}`)
        .then(resp => {
            var data = resp.data[0]
            res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
            res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">')
            res.write(`<h1 class='w3-container w3-green' style='max-height: 10%; margin-top: 0; margin-bottom: 0;'>${data[`${titulo}`]}</h1>`)
            res.write("<div class='w3-responsive' style='height: 80%'>")
            res.write("<ul class='w3-ul w3-hoverable'>")
            for (const [chave, valor] of Object.entries(data)) {
                res.write("<li>")
                if  (typeof valor == "string") {
                    res.write(`<b>${chave}:</b> ${valor}`)
                }
                else if (typeof valor == "number") {
                    res.write(`<b>${chave}:</b> ${valor}`)
                }
                else if (typeof valor == "object") {
                    res.write("<ul class='w3-ul w3-hoverable w3-hover-light-grey'>")
                    res.write(`<span><b>${chave}:</b></span>`)
                    for (const [c, v] of Object.entries(valor)) {
                        if (typeof v == "string" || typeof v == "number") {
                            res.write(`<li><b>${c}:</b> ${v}</li>`)
                        }
                        else if (typeof v == "object") {
                            res.write("<ul class='w3-ul w3-hoverable' style='padding-bottom: 1rem'>")
                            for (const [ch, va] of Object.entries(v)) {
                                res.write(`<li><b>${ch}:</b> ${va}</li>`)
                            }
                            res.write("</ul>")
                        }
                    }
                    res.write("</ul>")
                }
                res.write("</li>")
            }
            res.write("</ul>")
            res.write("</div>")
            res.write(`<a href='/${obj}' class='w3-button w3-green w3-round-large w3-hover-light-grey w3-margin'><b>Voltar</b><a>`)
            res.end()
        })
        .catch(err => {
            res.writeHead(500, {'Content-Type' : 'text/html;charset=utf8'})
            console.log(err)
            res.end()
        })
}
