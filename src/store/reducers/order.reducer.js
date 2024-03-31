import { orderService } from "../../services/order.service";
export const SET_ORDERS = 'SET_ORDERS'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const UNDO_CHANGES = 'UNDO_CHANGES'
const initialState = {
    orders: null,
    lastOrders: [],
    // filterBy: orderService.getDefaultFilter(),
    isLoading: true
}
export function orderReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_ORDERS:
            return {
                ...state,
                orders: cmd.orders
            }
        case REMOVE_ORDER:
            return {
                ...state,
                lastOrders: [...state.orders],
                orders: state.orders.filter(order => order.id !== cmd.orderId),
            }
        case ADD_ORDER:
            return {
                ...state,
                orders: [...state.orders, cmd.order]
            }
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map(order => order.id === cmd.order.id ? cmd.order : order)
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.fieldsToUpdate }
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        case UNDO_CHANGES:
            return {
                ...state,
                orders: [...state.lastOrders]
            }
        default:
            return state
    }
}