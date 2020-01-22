//Precisamos importar o mongoose dentro do Dev.js
const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

//campos da entidade
const DevSchema = new mongoose.Schema ({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema, //importando o que foi exportado em PointSchema.js
        index: '2dsphere' //indice que facilita a busca, quando é latitude e longitude usamos 2dsphere (esfera 2d)
    }
});

module.exports = mongoose.model('Dev', DevSchema); //nome da entidade salvo do banco de dados

