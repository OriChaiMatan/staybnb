import { MyTripsPreview } from "./MyTripsPreview";

export function MyTripsList({ orders }) {

    if (!orders && !stays) return (<div>loading....</div>)
    return (
        <ul className="my-trips-list">
            {orders.map((order) => (
                <li key={order._id} >
                    <MyTripsPreview order={order} />
                </li>
            ))}
        </ul>
    )
}