//se maneja con strings el manejo de estaddos de conexion con APIS por que de esta manera permite manejar mas estados como pendiente exito error o sin consultar 
//para poder estandarizar mi asignacion de estado debo crear una funcion que retorne mi switch case donde reciba una arreglo y eso sea mi case dentro del switch
//hisg order reducer
const initialFetching = { loading : 'idle' , error:null }
export const makeFetchingReducer = actions => (state= initialFetching , action) =>{
    switch(action.type){
        case actions[0]:{
            return {...state,loading:'pending'}
        }
        case actions[1]:{
            return{...state, loading:'succeded'}
        }
        case actions[2]:{
            return {error: action.error, loading:'rejected'}
        }
        default :{
            return state 
        }

    }
}


//separamos la logica que manejaba la propiedad de filter 
export const makeFilterReducer = actions => (state='all', action) =>{
    switch (action.type){
        case actions[0]:
            return action.payload
        default:
            return state
    }
}