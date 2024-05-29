import React from "react";
import { IoHome } from "react-icons/io5";


export function UserInfo({ user }) {

  return (
    <section className="user-info-dashboard">
    <img src={user.imgUrl} alt="User profile" />
      <h1>Hi, i'm {user.username}</h1>
      <div className="user-living-place">
        <IoHome />
        Lives in {user.address}
      </div>

    </section>
  )
}