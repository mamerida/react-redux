import logo from './logo.svg';
import { useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import './App.css';

//tengo que pasar este reducer para poder usar redux y mantener el estado 
//esto no se hace en el componente. Se hace de manera ilustrativa pero esto no se hace en el componente 
export const reducer = (state=0,action)=>{
  console.log({action ,state })
  switch(action.type){
    case 'incrementar':
      return state+1
    case 'decrementar':
      return state-1
    case 'set':
      return  action.payload
    default:
      return state 

  }
}

//necesito obtener metodo para despachar acciones osea usar la accion de dispatch por eso uso useDispatch

//useSelector recibe una funcion para saber que propiedad debe devolver del estado

function App() {
  const [valor,setValor] = useState("")
  //la creo dentro del componente para poder acceder desde el return 
  const dispatch = useDispatch()
  //creo la constante para acceder al estado con redux  esta recibe el estado y de input retorno la propiedad que quiera 
  const state = useSelector(state =>state )
  // separo la accion de set que toma el valor de mi input para poder limpiar al precionar set
  const set = () =>{
    dispatch({type:'set',payload:valor})
    setValor("")
  }
  return (
    <div className="App">
      <p>Contador : {state} </p>
      <button onClick={()=>dispatch({type:'incrementar'})}>Incrementar</button>
      <button onClick={()=>dispatch({type:'decrementar'})}>Decrementar</button>
      <button onClick={set} >Set</button> 
      {/* //toma el valor del imput */}
      {/* Los inputs no se guardan en redux se usa en useState*/}
      <input value={valor} onChange={e => setValor(Number(e.target.value))}/>
    </div>
  );
}

export default App;
