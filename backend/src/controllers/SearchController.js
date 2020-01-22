const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray'); //importa util que transsforma string em array


//async: estamos dependendo da resposta da API do github e é assincrono
//await espera receber a resposta pra enviá-la
module.exports = {
    async index (request, response) {
        // console.log(request.query); // pega as informações do insomnia w printa
        //Buscar todos os devs num raio 10km (Filtro de distância)
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        console.log(techsArray); //agora separam as techs em um array

        //Filtrar por tecnologias
        const devs = await Dev.find({
            techs: {
                $in: techsArray, //se os usuarios tem as tecnologias dentro das techsArray
            },
            location: {
                $near: {//enconta objetos perto de uma localização
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude], //coordenadas que estao vindo do request.query do insomnia
                    },
                    $maxDistance: 1000,
                },
            },
        });

        return response.json({ devs }); // array vazio só para visualizarmos funcionando


    }
}