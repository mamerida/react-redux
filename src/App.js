import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {combineReducers} from 'redux'

//para poder trabajar con acciones asyncronas mediante redux. debo usar middlewares que interceptan el dispatch 
//y nos permite generar acciones dependiendo del estado de la conexion 
export const asyncMiddleware = store => next => action =>{
    if(typeof action === "function"){
        return action(store.dispatch,store.getState)
    }

     return next(action)
}

//acciones que se puden llamar, llamado a una API, creacion de una API, error de una API
export const fetchThunk = () =>  async dispatch =>{
    dispatch({type:'todos/pending'})
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        const data = await response.json()
        const todos = data.slice(0,10)
        dispatch({type:"todos/fulfilled" ,payload : todos})
    }catch (e){
        dispatch({type:'todos/error', error: e.message})    
    }
}


//por convencion genero un initial state que va a obtener el estado inicial de mi aplicacion
//al usar combineReducers el initial state no es necesario 
// const initialState ={
//     entities:[],
//     //filtro de visibilidad
//     filter:"all", // complete || incompleted
// }

//para poder dividir un poco las responsabilidades del reducer, lo que vamos a realizar es una division de las resposabilidades
// un reducer que se encargue de acutalizar los objetos y otro el estado

//separamos la logica que manejaba la propiedad de filter 
export const filterReducer = (state='all', action) =>{
    switch (action.type){
        case 'filter/set':
            return action.payload
        default:
            return state
    }
}
//se maneja con strings el manejo de estaddos de conexion con APIS por que de esta manera permite manejar mas estados como pendiente exito error o sin consultar 
const initialFetching = { loading : 'idle' , error:null }
export const fetchinReducer = (state= initialFetching , action) =>{
    switch(action.type){
        case 'todos/pending':{
            return {...state,loading:'pending'}
        }
        case 'todos/fulfilled':{
            return{...state, loading:'succeded'}
        }
        case 'todos/error':{
            return {error: action.error, loading:'rejected'}
        }
        default :{
            return state 
        }

    }
}

export const todosReducer = (state = [],action) =>{
    switch(action.type) {
        case 'todos/fulfilled':{
            return action.payload
        }
        case 'todo/add': {
            //siempre se debe retornar una nueva copia del estado
            //cuando no lo hacemos es usamos la mutabilidad
            //en este caso el reducer va a repartir la responsabilidad por ende no devuelve un objeto
            return state.concat({...action.payload})
        }
        case 'todo/complete':{ 
            const newTodos = state.map(todo=>{
                if(todo.id === action.payload.id){
                    return {...todo, completed: !todo.completed}
                }else{
                    return todo
                }
            })
            return newTodos
        }
        default:
            return state 

    
    }
}
// combineReducers permite dividir propiedad a mantener junto con la funcion que lo va a realizar 
export const reducer = combineReducers( {
    //al estar trabajando con el estado de los todos no da sentido que traigamos al mismo nivel que los otros.
    //a nivel convencion es preferible generar el objeto todo y dentro del mismo combinar los reducers que necesito 
    todos: combineReducers({
        entities:todosReducer,
        status:fetchinReducer,
    }),
    filter: filterReducer,

})

const selectStatus = state => state.todos.status

const ToDoItem = ({todo}) =>{
    const dispatch = useDispatch()
    return(
        <li 
        onClick={()=> dispatch({type:'todo/complete' , payload: todo }) }
        style={{textDecoration : todo.completed ? 'line-through' : "none" , cursor : 'pointer' }}
        >{todo.title}</li>
    )
}

const selectTodos = state =>{
    const {todos : {entities} , filter} = state
    if(filter === "complete"){
        return entities.filter(todo=> todo.completed)
    }
    if(filter === "incomplete"){
        return entities.filter(todo=> !todo.completed)
    }
    return entities
}

const App = () =>{
    const dispatch = useDispatch()
    //use selector nos permite seleccionar parte de nuestro estado
    const todos = useSelector(selectTodos)
    //aca guardo el input hasta el submit
    const [value,setValue] =useState("")

    //voy a crear un mensaje de cargando y para eso necesito individualizar el status de mis todos
    const status = useSelector(selectStatus)

    //funcion para enviar lista de ToDo a la persistencia y despues mostrarlos
    const submit = e => {
        e.preventDefault();
        //si el campo esta vacio no retorna nada 
        if(!value.trim()){
             return 
        }
        const id  = Math.random().toString(36);
        const todo = { title: value , completed :false , id }
        dispatch ({type:'todo/add' , payload:todo})
        setValue("")

    }
    if(status.loading ==="pending"){
        return(
            <p>Cargando...</p>
        )
    }
    if(status.loading ==="rejected"){
        return(
            <p>{status.error}</p>
        )
    }
    return(
        <div>
            <form >
                <input value={value} onChange={e => setValue(e.target.value)}/>
                <button type="submit" onClick={submit} > Enviar </button>
            </form><br/>
            {/* al presionar el onClick aun que cambie el estado no vuelve a renderizar el componente esto pasa si no devuelvo una copia en los switch case 
                generando mutabilidad  */}
            <button onClick={ () => dispatch({type: 'filter/set' ,payload: 'all'})} >Mostrar Todos </button>
            <button onClick={ () => dispatch({type: 'filter/set' ,payload: 'complete'})} >Completados</button>
            <button onClick={ () => dispatch({type: 'filter/set' ,payload: 'incomplete'})}>Incompletos </button>
            <button onClick={ () => dispatch(fetchThunk())}>Fech </button>
            <ul>
                {todos.map( todo => <ToDoItem  key={todo.id} todo={todo} />)}
            </ul>
        </div>
    )
}

export default App





// import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// //por convencion genero un initial state que va a obtener el estado inicial de mi aplicacion
// const initialState ={
//     entities:[],
//     //filtro de visibilidad
//     filter:"all", // complete || incompleted
// }
// export const reducer = (state= initialState,action) =>{
//     switch(action.type){
//         case 'todo/add': {
//             //siempre se debe retornar una nueva copia del estado
//             //cuando no lo hacemos es usamos la mutabilidad
//             return {
//                 ...state,
//                 entities: state.entities.concat({...action.payLoad})
//             }
//         }
//         //creo un caso para completar y actualizar los  ToDo
//         //verifico que el ToDo seleccionado sea el del arreglo y lo devuelvo con su propieadad cambiada 
//         case 'todo/complete':{ 
//             const newTodos = state.entities.map(todo=>{
//                 if(todo.id === action.payload.id){
//                     return {...todo, completed: !todo.completed}
//                 }else{
//                     return todo
//                 }
//             })
//             return{
//                 ...state,
//                 entities: newTodos
//             }
//         }
//         case 'filter/set':{
//             return{
//                 ...state,
//                 filter:action.payload,
//             }
//         }
//     }
//     return state 
// }

// const ToDoItem = ({todo}) =>{
//     const dispatch = useDispatch()
//     return(
//         <li 
//         onClick={()=> dispatch({type:'todo/complete' , payload: todo }) }
//         style={{textDecoration : todo.completed ? 'line-through' : "none" , cursor : 'pointer' }}
//         >{todo.title}</li>
//     )
// }

// const selectTodos = state =>{
//     const {entities , filter} = state
//     if(filter === "complete"){
//         return entities.filter(todo=> todo.completed)
//     }
//     if(filter === "incomplete"){
//         return entities.filter(todo=> !todo.completed)
//     }
//     return entities
// }

// const App = () =>{
//     const dispatch = useDispatch()
//     //use selector nos permite seleccionar parte de nuestro estado
//     const todos = useSelector(selectTodos)
//     //aca guardo el input hasta el submit
//     const [value,setValue] =useState("")

//     //funcion para enviar lista de ToDo a la persistencia y despues mostrarlos
//     const submit = e => {
//         e.preventDefault();
//         //si el campo esta vacio no retorna nada 
//         if(!value.trim()){
//              return 
//         }
//         const id  = Math.random().toString(36);
//         const todo = { title: value , completed :false , id }
//         dispatch ({type:'todo/add' , payLoad:todo})
//         setValue("")

//     }

//     return(
//         <div>
//             <form >
//                 <input value={value} onChange={e => setValue(e.target.value)}/>
//                 <button type="submit" onClick={submit} > Enviar </button>
//             </form><br/>
//             {/* al presionar el onClick aun que cambie el estado no vuelve a renderizar el componente esto pasa si no devuelvo una copia en los switch case 
//                 generando mutabilidad  */}
//             <button onClick={ () => dispatch({type: 'filter/set' ,payload: 'all'})} >Mostrar Todos </button>
//             <button onClick={ () => dispatch({type: 'filter/set' ,payload: 'complete'})} >Completados</button>
//             <button onClick={ () => dispatch({type: 'filter/set' ,payload: 'incomplete'})}>Incompletos </button>
//             <ul>
//                 {todos.map( todo => <ToDoItem  key={todo.id} todo={todo} />)}
//             </ul>
//         </div>
//     )
// }

// export default App