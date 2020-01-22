const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const routes = require('./routes'); // se colocarmos routes ou routes.js ele procurará um pacote no node_modules, por isso precisamos passar o caminho relativo

//Colocar servidor no ar, viabilizando uma rota:
const app = express(); //Aplicação foi criada

mongoose.connect('mongodb+srv://jubrito:w1i2t3z4k5e6dezonzorias@cluster0-qqxar.mongodb.net/omniweek?retryWrites=true&w=majority', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,                            
});  //string de conexão que copiamos no mongo db atlas, preenchendo os dados do usuario
                                                                            //substituir <password> pela senha e "teste" pelo nome


/* Para recebermos uma resposta do servidor quando acessarmos localhost:3333 */

app.use(cors()); /*deixa o local host igual ao de web para impedir o bloqueio de acessos externos a API
                                                    liberando o acesso externo pra todo tipo de aplicação*/
//express agora entende requisições com o corpo com formato json
app.use(express.json()); //.use define que vai ser valido para todas as rotas, se fizesse um .get por ex definiria apenas para get
app.use(routes); //precisa vir depois do express.json

app.listen(3333);  /*cria a porta do local host,
                    onde acessaremos a aplicação quando ela estiver rodando, 
                    acessando o servidor */


// aqui ficava o app.get que foi transformado em routes.get no arquivo routes.js 






