/* ************************* BLOCK 2 ************************ */
//SEPARAR ROTAS IMPORTANDO MODULO DE ROTEAMENTO DO EXPRESS 
// { Router } indica que quero importar uma coisa especifica do express, não ele inteiro
const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController'); //importando o controller

const routes = Router();

/* Agora nós temos: 
routes.get (GET)
routes.post (POST)
routes.put (PUT)
routes.delete (DELETE)
*/
 
//Agora usamos routes.get etc ao invés de app.get (alterar no index)
/*  
1º parametro: recebe o caminho que o usuário acessa como parametro, define a rota
2º parametro: outra função (arrow function, tendo um parenteses, seta e o corpo)
    > requisicao
    Quando eu acesso uma rota da aplicação estou fazendo uma REQUISIÇÃO PRO SERVIDOR, 
    podendo conter informações (exemplo: dados e informações para criar/consumir registros 
    do banco de dados, tudo o que o cliente (front-end) envia pro back-end)  
    
    > resposta 
    Como retornamos uma resposta pro cliente (front-end), através de:
    - imagem, download, texto (send), etc.. */
routes.get('/devs', DevController.index); //listar todos os devs, get = busca, função index que busca
                                          // //index: mostrar lista do recurso, show: mostrar unico, store: criar, update: alterar, destroy: deletar:
routes.post('/devs', DevController.store); 

routes.get('/search', SearchController.index); //criando a rota
module.exports = routes;

//> instalar o nodemon e criar atalho para execução no package.json
//> rodar com "yarn dev"

/* Criando uma rota utilizando os métodos HTTP: GET, POST, PUT, DELETE
    GET: buscando receber informações
        > listar recurso, receber um recurso, buscar apenas um recurso (produto, usuario, contato)
        routes.get('/', (request, response) => {
            console.log(request.query); 
    POST: criar informações
        > criar um recurso, cadastrar recurso, salvar recurso
    PUT: editar informaç~eos (recursos)
    DELETE: remover informações (recursos) */

/*GET é o único que pode ser acessado nativamente pelo browser de maneira simpels visto que quando
  chamamos um endereço na URL do navegador, o navegador esta enviando uma requisição do tipo GET 
  por isso utilizamos o "app.get('/', (request, response) => {" na parte ****1*****
    - Os outros tres exigem a instalação do insomnia */

// ~~~~~~~~ DELETE ~~~~~~~~
/*app.delete('/users/:id', (request, response) => {
    console.log(request.params); //printa no terminal querys realizadas no insomnia
    // return response.send('Hello World');
    return response.json({ message: 'Hello Json' }); //enviar um {objeto (informações de uma entidade)} ou vetor de dentro do JS

});*/