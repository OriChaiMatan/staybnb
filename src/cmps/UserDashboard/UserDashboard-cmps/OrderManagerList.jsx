import { OrderManagerPreview } from "./OrderManagerPreview";
import { useWindowSize } from "../../../customHooks/useWindowSize"; 

export function OrderManagerList({ orders, onSaveOrder }) {
    const windowSize = useWindowSize()

    if (!orders) return (<div>loading....</div>)
    if (windowSize.width < 780) {
        return (
            <ul className="order-list">
            {orders.map((order) => (
                <li key={order._id} >
                    <OrderManagerPreview order={order} onSaveOrder={onSaveOrder} />
                </li>
            ))}
        </ul>
        )
    }
    
    return (
        <ul className="order-list">
            <section>
                <label className="client-name">Client name</label>
                <label className="stay-name">Stay name</label>
                <label className="check-in">Check in</label>
                <label className="check-out">Check out</label>
                <label className="total-price">Total price</label>
                <label className="order-status">Order status</label>
                <label className="order-icon">Status</label>
                <label className="order-action">Actions</label>
            </section>
            {orders.map((order) => (
                <li key={order._id} >
                    <OrderManagerPreview order={order} onSaveOrder={onSaveOrder} />
                </li>
            ))}
        </ul>
    )
}