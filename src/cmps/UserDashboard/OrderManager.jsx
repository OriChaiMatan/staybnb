import React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { OrderManagerList } from "./UserDashboard-cmps/OrderManagerList"

import { loadOrders, saveOrder } from "../../store/actions/order.action"

export function OrderManager() {
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  // const userOrders = orders.filter(order => order.hostId === loggedInUser._id)

  useEffect(() => {
    loadOrders()
  }, [])

  async function onSaveOrder(order) {
    try {
      const savedOrder = await saveOrder(order)
      loadOrders()
    } catch (err) {
      console.log("Had issues save order", err)
    }
  }

  const userOrders = orders.filter(order => order.hostId === loggedInUser._id);

  return (
    <div>
      {userOrders.length > 0 ? (
        <section className="user-list-title">
          <OrderManagerList orders={userOrders} onSaveOrder={onSaveOrder} />
        </section>
      ) : (
        <section className="empty-user-stays">
          <h1>You don't have any orders yet. If you would like to order, you are welcomed to explore the many stays in Staybnb.</h1>
        </section>
      )}
    </div>
  );
}