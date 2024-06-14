import React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { MyTripsList } from "../cmps/MyTrips/MyTripsList"
import { loadOrders } from "../store/actions/order.action"

export function MyTrips() {
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)

  useEffect(() => {
    loadOrders()
  }, [])

  if (!orders ) {
    return <div>Loading...</div>;
  }
  return (
    <section className="my-trips">
      <h1>My Trips</h1>
      <MyTripsList orders={orders.filter(order => order.buyer.id === loggedInUser._id)} />
    </section>
  )
}
