import React from 'react';  //importando o React em todo arquivo JS que foi utilizar HTML dentro dele
                            //JSX (JavaScript + XML) XML: sintaxe do HTML
import ReactDOM from 'react-dom'; //habilidade do React pra se comunicar com o HTML (DOM: arvore de elementos HTML)
                                  //varia em cada ambiente (browser: ReactDOM, mobile ReactNative, televisão ReactTV

import App from './App'; //app: função que retorna um conteúdo html

ReactDOM.render(<App />, document.getElementById('root')); // pedindo pro ReactDOM colocar o HTML dentro da div id root (em index.html)

