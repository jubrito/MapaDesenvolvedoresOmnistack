import React, { useEffect, useState } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './sidebar.css';
import './main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

//app: função que retorna um conteúdo html
//renderizando dentro da div root no index.html
function App() {
    const [devs, setDevs] = useState([]); //estado

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs');
                
            setDevs(response.data);
        }
        loadDevs(); //chamando a função
    }, []);

    //É disparada a partir de um evento (e), que é o parâmetro
    //É disparada a partir no submit (envio do formulario)
    async function handleAddDev(data) {
        const response = await api.post('/devs', data) //Lembrando que quando vamos cadastrar é o metodo post
       
        //Aqui executamos nosso back-end
        console.log(response.data);

        setDevs([...devs, response.data]); //pega tds os devs antigos e adiciona o novo
    }

    return (
        <div id ="app">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev} />
            </aside>
            <main>
                <ul>
                    {/* para repetir o list item para cada um dos devs
                        percorremos o array (variavel map), ou seja cada um dos devs,
                        retornaremos o código do li (dev => (entre parenteses aqui dentro é um retorno)
                        ou seja (dev => { return }) = (dev => () ) ) */}
                    {devs.map(dev => (
                        <DevItem key={dev._id} dev={dev} />
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default App;