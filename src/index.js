import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {asyncMiddleware} from './middlewares/async'
import { reducer } from './features/todos';
import {createStore, applyMiddleware} from 'redux';
// provider es un componente que utiliza la propiedad de children para mantener el estado de la aplicacion
//esto se hace creando un store pasandolo como parametro y metiendo el App como children
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

// no se debe importar de app el reducer
//para poder usar middleware debo importar applyMiddleware desde redux y pasarle mi middleware como argumento

const store = createStore(reducer ,applyMiddleware(asyncMiddleware))


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
         <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
