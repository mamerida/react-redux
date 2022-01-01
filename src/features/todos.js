//para poder mejorar el escalado del proyecto. Vamos a usar action creator. Sirve para agrupar todas las acciones de mi codigo y asi 
//ante futuros cambios evitar tener que retocar todo el codigo 1 por 1 

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