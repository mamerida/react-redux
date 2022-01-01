import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {setComplete,setFilter,fetchThunk,selectStatus,selectTodos } from './features/todos'





const ToDoItem = ({todo}) =>{
    const dispatch = useDispatch()
    return(
        <li 
        onClick={()=> dispatch(setComplete(todo)) }
        style={{textDecoration : todo.completed ? 'line-through' : "none" , cursor : 'pointer' }}
        >{todo.title}</li>
    )
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
            <button onClick={ () => dispatch(setFilter("all"))} >Mostrar Todos </button>
            <button onClick={ () => dispatch(setFilter("complete"))} >Completados</button>
            <button onClick={ () => dispatch(setFilter("incomplete"))}>Incompletos </button>
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