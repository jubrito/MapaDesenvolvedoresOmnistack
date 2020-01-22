// techs.split(','): pega cada parte da string dividindo pela vigula
//map: percorre o array e para cada uma das informações do vetor, se executa algo
//trim: é executada a remoção dos espaços numa string

module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim());
}