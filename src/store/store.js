import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { orderReducer } from './reducers/order.reducer'
import { stayReducer } from './reducers/stay.reducer'
import { userReducer } from './reducers/user.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    orderModule: orderReducer,
    stayModule: stayReducer,
    userModule: userReducer
})

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store