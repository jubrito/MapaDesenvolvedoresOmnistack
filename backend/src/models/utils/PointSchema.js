//Dentro de utils porque não vai ser um modelo, apenas uma utilidade

const mongoose = require('mongoose');

//Point = ponto no mapa (latitudexlongitude)
const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number], //Array de numeros: Longitude, Latitude
        required: true,
    },
});

module.exports = PointSchema; //exportar daqui para importar no Dev.js