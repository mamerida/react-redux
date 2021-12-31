import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App , {reducer} from './App';
import {createStore} from 'redux';
// provider es un componente que utiliza la propiedad de children para mantener el estado de la aplicacion
//esto se hace creando un store pasandolo como parametro y metiendo el App como children
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

// no se debe importar de app el reducer
const store = createStore(reducer)


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
