import React from "react";
import { useDispatch } from "react-redux";
import { FaRegHourglassHalf } from "react-icons/fa6"; // hourglass
import { BiSolidInfoCircle } from "react-icons/bi"; // delete
import { FaCheckCircle } from "react-icons/fa"; // approve



export function OrderManagerPreview({ order, onSaveOrder }) {
    const dispatch = useDispatch()

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved':
                return <FaCheckCircle className="icon-approved" />;
            case 'decline':
                return <BiSolidInfoCircle className="icon-decline" />;
            case 'pending':
                return <FaRegHourglassHalf className="icon-pending" />;
            default:
                return null;
        }
    }
    
    const handleStatusChange = (newStatus) => {
        const updatedOrder = { ...order, status: newStatus }
        onSaveOrder(updatedOrder)
        console.log(updatedOrder)
    }

    return (
        <div className="order-preview">
            <label className="client-name">{order.buyer.fullname}</label>
            <label className="stay-name">{order.stay.name}</label>
            <label className="check-in">{order.startDate}</label>
            <label className="check-out">{order.endDate}</label>
            <label className="total-price">{order.totalPrice}$</label>
            <label className="order-status">{order.status}</label>
            <label className="order-icon">{getStatusIcon(order.status)}</label>
            <div className="actions">
                <button className="approve-btn" onClick={() => handleStatusChange('approved')}>Approve</button>
                <button className="decline-btn" onClick={() => handleStatusChange('decline')}>Decline</button>
            </div>
        </div>
    )
}
