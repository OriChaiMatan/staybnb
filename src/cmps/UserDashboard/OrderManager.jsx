import React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { OrderManagerList } from "./UserDashboard-cmps/OrderManagerList"

import { loadOrders, saveOrder } from "../../store/actions/order.action"

export function OrderManager() {
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)

  useEffect(() => {
    loadOrders()
  }, [])

  async function onSaveOrder(order) {
    try {
      const savedOrder = await saveOrder(order)
      // loadOrders();
    } catch (err) {
      console.log("Had issues adding stay", err)
    }
  }

  const userOrders = orders.filter(order => order.hostId === loggedInUser._id)

  return (
    <section className="user-list-title">
      <h1>My Order Manager</h1>
      <OrderManagerList orders={userOrders} onSaveOrder={onSaveOrder} />
    </section>
  )
}
