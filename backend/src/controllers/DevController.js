const axios = require('axios'); // biblioteca de chamadas para outras APIs (ex pegar foto do github a partir do usuario github)
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray'); //importa util que transsforma string em array

//async: estamos dependendo da resposta da API do github e é assincrono
//await espera receber a resposta pra enviá-la
module.exports = {

    async index (request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store (request, response) {
        // return response.send('Hello World');
        const { github_username, techs, latitude, longitude } = request.body; // buscando github_username dentro de request.body
        
        let dev = await Dev.findOne({ github_username});
        
        if (!dev) {
             //Passar entre crase ao invés de aspas viabiliza enviar uma variavel junto, colocando-a entre ${}
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            //DESESTRUTURAÇÃO PARA PEGARMOS AS INFORMAÇÕES ÚTEIS PRO PROJETO
            //name pode ser null entao se não existir, pega o login
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            //em Dev.js o campo "techs" de devSchema espera um array porem no insomnia o usuario provavelmente passa uma string (Ex: React, Node) 
            //entao para converter fazemos: (explicamos como na função)
            const techsArray = parseStringAsArray(techs);
        
            //LATITUDE E LONGITUDE
            //passamos o que foi definido no PointSchema (type and coordinates)
            const location = { 
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
            
            // console.log(request.body); //printa no terminal querys realizadas no insomnia
        }

        //exibimos os dados do dev recém cadastrado no banco de dados.
        return response.json(dev); 
    
        /*enviar um {objeto (informações de uma entidade)} ou vetor de dentro do JS
        return response.json({ message: 'Hello Json!' }); 
        */
    },

    async update () {
        //atualizar as informações de um único dev
    },

    async destroy () {
        //deletar um dev do banco de dados
    },
};
