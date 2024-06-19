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

  if (!orders) {
    return <div>Loading...</div>;
  }

  const userOrders = orders.filter(order => order.buyer.id === loggedInUser._id).reverse();

  return (
    <section className="my-trips">
      <h1>Trips</h1>
      {userOrders.length > 0 ? (
        <MyTripsList orders={userOrders} />
      ) : (
        <section className="empty-user-trips">
          <h2>You don't have any trips yet.</h2>
          <p>Time to dust off your bags and start planning your next adventure!</p>
        </section>
      )}
    </section>
  )
}