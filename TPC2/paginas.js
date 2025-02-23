
export function genMainPage(data) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-container" style="padding: 0">
                <header class="w3-container w3-teal">
                    <h1>Escola de Música</h1>
                </header>

                <div>
                    <ul>
                        <li>
                            <a href="/alunos">Lista de Alunos</a>
                        </li>
                        <li>
                            <a href="/cursos">Lista de Cursos</a>
                        </li>
                        <li>
                            <a href="/instrumentos">Lista de Instrumentos</a>
                        </li>
                    </ul>
                </div>

                <footer class="w3-container w3-teal" style="position:sticky; bottom: 0; display: flex; flex-direction: row; justify-content: center;">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genAlunosPage(alunos, data) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-container" style="padding: 0;">
                <header class="w3-container w3-teal">
                    <h1>Alunos</h1>
                </header>

                <div>
                    <table class="w3-table-all">
                        <tr style="position: sticky; top: 0;">
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Curso</th>
                            <th>Ano</th>
                            <th></th>
                        </tr>
                        `
                        alunos.forEach(a => {
                            pagHTML += `
                            <tr>
                                <td>${a.id}</td>
                                <td>${a.nome}</td>
                                <td>${a.curso}</td>
                                <td>${a.anoCurso}</td>
                                <td><a href="/aluno/${a.id}" class="w3-button w3-round-large w3-teal">Ver</a></td>
                            </tr>
                                `
                        })
                        pagHTML +=
                        `
                    </table>
                </div>

                <footer class="w3-container w3-teal" style="position:sticky; bottom: 0; display: flex; flex-direction: row; justify-content: center;">
                    <a href="/" class="w3-button w3-round-large w3-teal w3-display-bottomleft">Voltar</a>
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genCursosPage(cursos, data) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-container" style="padding: 0">
                <header class="w3-container w3-teal">
                    <h1>Cursos</h1>
                </header>

                <div>
                    <table class="w3-table-all">
                        <tr style="position: sticky; top: 0;">
                            <th>Id</th>
                            <th>Designação</th>
                            <th>Duração</th>
                            <th>Instrumento</th>
                            <th></th>
                        </tr>
                        `
                        cursos.forEach(c => {
                            pagHTML += `
                            <tr>
                                <td>${c.id}</td>
                                <td>${c.designacao}</td>
                                <td>${c.duracao}</td>
                                <td>${c.instrumento["#text"]}</td>
                                <td><a href="/curso/${c.id}" class="w3-button w3-round-large w3-teal">Ver</a></td>
                            </tr>
                                `
                        })
                        pagHTML +=
                        `
                    </table>
                </div>

                <footer class="w3-container w3-teal" style="position:sticky; bottom: 0; display: flex; flex-direction: row; justify-content: center;">
                    <a href="/" class="w3-button w3-round-large w3-teal w3-display-bottomleft">Voltar</a>
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genInstrumentosPage(instrumentos, data) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-container" style="padding: 0">
                <header class="w3-container w3-teal">
                    <h1>Instrumentos</h1>
                </header>

                <div>
                    <table class="w3-table-all">
                        <tr style="position: sticky; top: 0;">
                            <th>Id</th>
                            <th>Instrumento</th>
                        </tr>
                        `
                        instrumentos.forEach(i => {
                            pagHTML += `
                            <tr>
                                <td>${i.id}</td>
                                <td>${i["#text"]}</td>
                                <td><a href="/instrumento/${i.id}" class="w3-button w3-round-large w3-teal">Ver</a></td>
                            </tr>
                                `
                        })
                        pagHTML +=
                        `
                    </table>
                </div>

                <footer class="w3-container w3-teal" style="position:sticky; bottom: 0; display: flex; flex-direction: row; justify-content: center;">
                    <a href="/" class="w3-button w3-round-large w3-teal w3-display-bottomleft">Voltar</a>
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genAlunoPage(aluno, data) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-container" style="padding: 0">
                <header class="w3-container w3-teal">
                    <h1>${aluno.nome}</h1>
                </header>

                <div class="w3-container">
                    <h3>Id: ${aluno.id}</h3>
                    <p><b>Data Nascilmento:</b> ${aluno.dataNasc}</p>
                    <p><b>Curso:</b> ${aluno.curso}</p>
                    <p><b>Ano:</b> ${aluno.anoCurso}</p>
                    <p><b>Instrumento:</b> ${aluno.instrumento}</p>
                </div>

                <footer class="w3-container w3-teal" style="position:sticky; bottom: 0; display: flex; flex-direction: row; justify-content: center;">
                    <a href="/alunos" class="w3-button w3-round-large w3-teal w3-display-bottomleft">Voltar</a>
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genCursoPage(curso, alunos, data) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-container" style="padding: 0">
                <header class="w3-container w3-teal">
                    <h1>${curso.designacao}</h1>
                </header>

                <div class="w3-container">
                    <h3>Id: ${curso.id}</h3>
                    <p><b>Designação:</b> ${curso.designacao}</p>
                    <p><b>Duração:</b> ${curso.duracao}</p>
                    <p><b>Intrumento:</b> ${curso.instrumento.id} ${curso.instrumento["#text"]}</p>
                    <p><b>Alunos Inscritos:</b></p>
                    <table class="w3-table-all">
                        <tr style="position: sticky; top: 0;">
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Ano</th>
                        </tr>
                        `
                        alunos.forEach(a => {
                            pagHTML += `
                            <tr>
                                <td>${a.id}</td>
                                <td>${a.nome}</td>
                                <td>${a.anoCurso}</td>
                            </tr>
                                `
                        })
                        pagHTML +=
                        `
                    </table>
                </div>

                <footer class="w3-container w3-teal" style="position:sticky; bottom: 0; display: flex; flex-direction: row; justify-content: center;">
                    <a href="/cursos" class="w3-button w3-round-large w3-teal w3-display-bottomleft">Voltar</a>
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genInstrumentoPage(instrumento, alunos, data) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-container" style="padding: 0">
                <header class="w3-container w3-teal">
                    <h1>${instrumento["#text"]}</h1>
                </header>

                <div class="w3-container">
                    <h3>Id: ${instrumento.id}</h3>
                    <p><b>Instrumento:</b> ${instrumento["#text"]}</p>
                    <p><b>Alunos que tocam:</b></p>
                    <table class="w3-table-all">
                        <tr style="position: sticky; top: 0;">
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Curso</th>
                            <th>Ano</th>
                        </tr>
                        `
                        alunos.forEach(a => {
                            pagHTML += `
                            <tr>
                                <td>${a.id}</td>
                                <td>${a.nome}</td>
                                <td>${a.curso}</td>
                                <td>${a.anoCurso}</td>
                            </tr>
                                `
                        })
                        pagHTML +=
                        `
                    </table>
                </div>

                <footer class="w3-container w3-teal" style="position:sticky; bottom: 0; display: flex; flex-direction: row; justify-content: center;">
                    <a href="/instrumentos" class="w3-button w3-round-large w3-teal w3-display-bottomleft">Voltar</a>
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}
