import React from "react"
import { useEffect } from "react"
import {useSelector } from "react-redux"
import { OrderManagerList } from "./UserDashboard-cmps/OrderManagerList"

import { loadOrders } from "../../store/actions/order.action"

export default function OrderManager() {
    const orders = useSelector((storeState) => storeState.orderModule.orders)

    useEffect(() => {
        loadOrders()
      }, [])

  return <div>OrderManager
    <section>
        <OrderManagerList orders={orders}/>
    </section>
  </div>;
}
