import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
//por convencion genero un initial state que va a obtener el estado inicial de mi aplicacion
const initialState ={
    entities:[],
}

export const reducer = (state= initialState,action) =>{
    switch(action.type){
        case 'todo/add': {
            //siempre se debe retornar una nueva copia del estado
            //cuando no lo hacemos es usamos la mutabilidad
            return {
                ...state,
                entities: state.entities.concat({...action.payLoad})
            }
        }
    }
    return state 
}

const ToDoItem = ({todo}) =>{
    return(
        <li>{todo.title}</li>
    )
}

const App = () =>{
    const dispatch = useDispatch()
    const state = useSelector(x => x)
    //aca guardo el input hasta el submit
    const [value,setValue] =useState("")

    //funcion para enviar lista de ToDo a la persistencia y despues mostrarlos
    const submit = e => {
        e.preventDefault();
        //si el campo esta vacio no retorna nada 
        if(!value.trim()){
             return 
        }
        const id  = Math.random().toString(36);
        const todo = { title: value , completado :false , id }
        dispatch ({type:'todo/add' , payLoad:todo})
        setValue("")

    }

    return(
        <div>
            <form >
                <input value={value} onChange={e => setValue(e.target.value)}/>
                <button type="submit" onClick={submit} > Enviar </button>
            </form><br/>
            {/* al presionar el onClick aun que cambie el estado no vuelve a renderizar el componente esto pasa si no devuelvo una copia en los switch case 
                generando mutabilidad  */}
            <button >Mostrar Todos </button>
            <button>Completados</button>
            <button>Incompletos </button>
            <ul>
                {state.entities.map( todo => <ToDoItem  key={todo.id} todo={todo} />)}
            </ul>
        </div>
    )
}

export default App