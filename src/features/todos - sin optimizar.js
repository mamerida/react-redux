import {combineReducers} from 'redux'

//para poder mejorar el escalado del proyecto. Vamos a usar action creator. Sirve para agrupar todas las acciones de mi codigo y asi 
//ante futuros cambios evitar tener que retocar todo el codigo 1 por 1 

//-----API ----//

export const setPending = ()=>{
    return{
        type:'todos/pending'
    }
}

export const setFulfilled = payload => ({type:"todos/fulfilled" ,payload})

export const setError = e => ({type:'todos/error', error: e.message})

export const setComplete = (payload) => ({type:'todo/complete' , payload: payload })

export const setFilter = (payload) => ({type: 'filter/set' , payload: payload})

//acciones que se puden llamar, llamado a una API, creacion de una API, error de una API
export const fetchThunk = () =>  async dispatch =>{
    dispatch(setPending())
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        const data = await response.json()
        const todos = data.slice(0,10)
        dispatch(setFulfilled(todos))
    }catch (e){
        dispatch(setError(e))    
    }
}



//---------REDUCERS-----------//

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


//-----selectores----//
export const selectStatus = state => state.todos.status


export const selectTodos = state =>{
    const {todos : {entities} , filter} = state
    if(filter === "complete"){
        return entities.filter(todo=> todo.completed)
    }
    if(filter === "incomplete"){
        return entities.filter(todo=> !todo.completed)
    }
    return entities
}
