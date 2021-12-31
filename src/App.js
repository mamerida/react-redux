import { useDispatch, useSelector } from "react-redux"
//por convencion genero un initial state que va a obtener el estado inicial de mi aplicacion
const initialState ={
    entities:[],
}

export const reducer = (state= initialState,action) =>{
    switch(action.type){
        case 'todo/add': {
            console.log("aaarendering")
            //siempre se debe retornar una nueva copia del estado
            //cuando no lo hacemos es usamos la mutabilidad
            return {
                ...state,
                entities: [{}]
            }
        }
    }
    return state 
}

const App = () =>{
    const dispatch = useDispatch()
    const state = useSelector(x => x)
    console.log(state,"rendering")
    return(
        <div>
            <form>
                <input/>
            </form>
            {/* al presionar el onClick aun que cambie el estado no vuelve a renderizar el componente esto pasa si no devuelvo una copia en los switch case 
                generando mutabilidad  */}
            <button onClick={() => dispatch({type:'todo/add'})}>Mostrar Todos </button>
            <button>Completados</button>
            <button>Incompletos </button>
            <ul>
                <li>Todo 1 </li>
                <li>Todo 2 </li>
                <li>Todo 3 </li>
            </ul>
        </div>
    )
}

export default App