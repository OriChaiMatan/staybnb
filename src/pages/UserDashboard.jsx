import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export function UserDashboard() {
  return (
    <section className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <nav className="dashboard-navigation">
        <NavLink to="/dashboard/order-manager" className={({ isActive }) => (isActive ? 'active' : '')}>Order-Manager</NavLink>
        <NavLink to="/dashboard/listing" className={({ isActive }) => (isActive ? 'active' : '')}>Listing</NavLink>
        <NavLink to="/dashboard/wishlist" className={({ isActive }) => (isActive ? 'active' : '')}>Wishlist</NavLink>
      </nav>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </section>
  );
}
