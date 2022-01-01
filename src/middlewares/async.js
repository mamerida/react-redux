//para poder trabajar con acciones asyncronas mediante redux. debo usar middlewares que interceptan el dispatch 
//y nos permite generar acciones dependiendo del estado de la conexion 
export const asyncMiddleware = store => next => action =>{
    if(typeof action === "function"){
        return action(store.dispatch,store.getState)
    }

     return next(action)
}