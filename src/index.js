import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import reportWebVitals from './reportWebVitals';

//createStore es el encargado de recibir y despachar los estados. Los recibe en state y los despacha mediante actions
//obligatorio retornar el estado 
const store = createStore((state = 0,action) =>{ //reducer acion de createStore
  //action = {type:'tipo de accion, payload: any}
  //con la propiedad de payload puedo trabajarlo mediante un switch
  switch (action.type){
    case 'accion': {
      return action.payload
    }
  }
  return state
})

//store.getState() devuelve el estado completo del sistema 
// console.log(store.getState())

//store.dispatch({type:'accion'}) ejecutara el reducer de createStore osea volvera a ejecutar la accion 
//con la propiedad de payload puedo acutalizar el estado

store.dispatch({type:'accion' , payload: 2 })
console.log(store.getState())

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
