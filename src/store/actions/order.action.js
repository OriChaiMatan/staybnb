import { orderService } from "../../services/order.service";
import { ADD_ORDER, REMOVE_ORDER, SET_FILTER_BY, SET_IS_LOADING, SET_ORDERS, UNDO_CHANGES, UPDATE_ORDER } from "../reducers/order.reducer";
import { store } from "../store";

export async function loadOrders() {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  try {
    const { filterBy } = store.getState().orderModule
    const orders = await orderService.query(filterBy)
    store.dispatch({ type: SET_ORDERS, orders })
  } catch (err) {
    console.log('Had issues loading ORDERs', err)
    throw err
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}
export async function removeOrderOptimitic(orderId) {
  try {
    store.dispatch({ type: REMOVE_ORDER, orderId })
    await orderService.remove(orderId)
    // store.dispatch({ type: SPEND_BALANCE, amount: -10 })
  } catch (err) {
    console.log('Had issues removing ORDERs', err)
    store.dispatch({ type: UNDO_CHANGES })
    throw err
  }
}
export async function removeOrder(orderId) {
  try {
    await orderService.remove(orderId)
    store.dispatch({ type: REMOVE_ORDER, orderId })
  } catch (err) {
    console.log('Had issues removing ORDERs', err)
    throw err
  }
}
export async function saveOrder(order) {
  try {
    const type = order._id ? UPDATE_ORDER : ADD_ORDER
    const savedOrder = await orderService.save(order)
    store.dispatch({ type: type, order: savedOrder })
  } catch (err) {
    console.log('Had issues saving ORDERs', err)
    throw err
  }
}
export function setFilterBy(fieldsToUpdate) {
  store.dispatch({ type: SET_FILTER_BY, fieldsToUpdate })
}