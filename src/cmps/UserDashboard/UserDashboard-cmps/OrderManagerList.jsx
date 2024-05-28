import { OrderManagerPreview } from "./OrderManagerPreview";

export function OrderManagerList({ orders, onSaveOrder }) {

    if (!orders) return (<div>loading....</div>)
    return (
        <ul className="order-list">
            <section>
                <label className="client-name">Client name</label>
                <label className="stay-name">Stay name</label>
                <label className="check-in">Check in</label>
                <label className="check-out">Check out</label>
                <label className="total-price">Total price</label>
                <label className="order-status">Order status</label>
                <label className="order-icon">Statuse</label>
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