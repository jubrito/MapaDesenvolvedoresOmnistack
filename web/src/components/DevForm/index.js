import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }) {
    //Armazenamos as informações do formulário em variáveis no estado do componente
    //Se utilizarmos elas em um submit por exemplo, conseguimos seus valores em tempo real
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState(''); //Estado inicial: string vazia pois o input inicialmente é vazio
    const [longitude, setLongitude] = useState('');
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
               
                setLatitude(latitude);
                setLongitude(longitude);
                /*a programação imperativa, a partir da criação de um estado e 
                é o componente precisa saber se comportar naquele estado*/
            },
            (err) => {
                //Função de erro
                console.log(err);          
            },
            {
                timeout: 30000,
            }
        )
    }, []); /* dispara uma função toda vez que uma informação alterar 
    (ou uma unica vez durante a renderização/mount do componente)
    - parametro 1: qual função precisa executar
    - parametro 2: quando a função precisa executar 56
    (vetor, se estiver vazio, executa uma única vez)
    (se tiver uma variavel, sempre que ela mudar, executa a função) */

    async function handleSubmit(e) {
        e.preventDefault(); //HTML normalmente envia o usuário a outra tela (preventdefault impede isso)
        
        await onSubmit({
          github_username,
          techs,
          latitude,
          longitude,  
        });

        setGithubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}> 
            <div className="input-block">
                <label htmlFor="github_username">Usuário do Github</label>
                <input 
                    name="github_username" 
                    id="github_username" 
                    required 
                    value={github_username}
                    onChange={e => setGithubUsername(e.target.value)}
                /> 
                {/*id serve para que quando a label selecione um input quando clicarmos no texto*/}
            </div>
            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>   
                <input 
                    name="techs" 
                    id="techs" 
                    required 
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                />
            </div>
            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>   
                    <input 
                        type="number"
                        name="latitude" 
                        id="latitude" 
                        required 
                        value={latitude}
                        /*quando o usuario editar o campo de latitude, pega o evento do html
                        e setamos o valor do imput no estado */
                        onChange={e => setLatitude(e.target.value)} 
                    />
                </div>
                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>   
                    <input 
                        type="number"
                        name="longitude" 
                        id="longitude" 
                        required 
                        value={longitude} 
                        onChange={e => setLongitude(e.target.value) } 
                    />
                </div>
            </div>

            <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm;