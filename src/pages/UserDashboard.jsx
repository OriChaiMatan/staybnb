import React from "react";
import { NavLink, Outlet } from "react-router-dom";


export function UserDashboard() {

  return (
    <section className="dashboard">
      <h1 className="dashboard-title">My Dashboard</h1>
      <nav className="dashboard-navigation">
        <NavLink to="/dashboard/listing" className={({ isActive }) => (isActive ? 'active' : '')}>My Profile</NavLink>
        <NavLink to="/dashboard/order-manager" className={({ isActive }) => (isActive ? 'active' : '')}>Order Manager</NavLink>
      </nav>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </section>
  );
}
