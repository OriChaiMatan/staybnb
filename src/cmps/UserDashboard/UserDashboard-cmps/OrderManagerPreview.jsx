import { FaRegHourglassHalf } from "react-icons/fa6"; //hourglass
import { TiDelete } from "react-icons/ti"; // delete
import { FaCheckCircle } from "react-icons/fa"; // approve




export function OrderManagerPreview({ order }) {

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved':
                return <FaCheckCircle />;
            case 'decline':
                return <TiDelete />;
            case 'pending':
                return <FaRegHourglassHalf />;
            default:
                return null;
        }
    }

    return (
        <div className="order-preview">
            <label className="client-name">{order.buyer.fullname}</label>
            <label className="stay-name">{order.stay.name}</label>
            <label className="check-in">{order.startDate}</label>
            <label className="check-out">{order.endDate}</label>
            <label className="total-price">{order.totalPrice}</label>
            <label className="order-status">{order.status}</label>
            <label className="order-icon">{getStatusIcon(order.status)}</label>
            <section className="actions">
                <button className="approve-btn">Approve</button>
                <button className="decline-btn">Decline</button>
            </section>
        </div>
    )
}