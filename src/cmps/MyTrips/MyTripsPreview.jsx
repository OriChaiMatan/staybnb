import React from "react";
import { useDispatch } from "react-redux";
import { FaRegHourglassHalf } from "react-icons/fa6"; // hourglass
import { BiSolidInfoCircle } from "react-icons/bi"; // delete
import { FaCheckCircle } from "react-icons/fa"; // approve

export function MyTripsPreview({ order }) {
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

    if (!order && !stay) return (<div>loading....</div>)
    return (
        <div className="my-trip-preview">
            <section className="my-trip-img">
                <img src={order.stay.imgUrl} className='rounded-img'></img>
            </section>
            <section className="my-trip-details">
                <h1 >{order.stay.name}</h1>
                <label className="order-icon">Order status: {order.status} {getStatusIcon(order.status)}</label>
                <label>Check In date: {order.startDate}</label>
                <label >Check Out date: {order.endDate}</label>
                <label >Price: {order.totalPrice}$</label>
            </section>
        </div>
    )
}
