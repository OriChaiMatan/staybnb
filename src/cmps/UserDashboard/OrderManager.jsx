import React from "react"
import { useEffect } from "react"
import {useSelector } from "react-redux"
import { OrderManagerList } from "./UserDashboard-cmps/OrderManagerList"

import { loadOrders, saveOrder } from "../../store/actions/order.action"

export default function OrderManager() {
    const orders = useSelector((storeState) => storeState.orderModule.orders)

    useEffect(() => {
        loadOrders()
      }, [])

      async function onSaveOrder(order) {
        try {
          const savedOrder = await saveOrder(order);
          loadOrders();
        } catch (err) {
          console.log("Had issues adding stay", err);
        }
      }

  return (
    <section>
        <OrderManagerList orders={orders} onSaveOrder={onSaveOrder}/>
    </section>
  )
}
