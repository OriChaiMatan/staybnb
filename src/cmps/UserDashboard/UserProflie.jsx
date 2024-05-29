import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { UserInfo } from "./UserProflie-cmps/UserInfo";
import { loadStays } from "../../store/actions/stay.action"

import { LuHotel } from "react-icons/lu";
import { IoStar } from "react-icons/io5";
import { BiMessageDetail } from "react-icons/bi";




export function UserProflie() {

  const demoLogInUser = {
    id: "u110",
    fullname: "Daniel Smith",
    imgUrl: "http://res.cloudinary.com/dqti9icif/image/upload/v1716982768/men4_yio0gl.jpg",
    username: "Daniel",
    passworg: "daniel123",
    address: "Kalisz, Poland"
  }

  // const stays = useSelector((storeState) => storeState.stayModule.stays)

  // useEffect(()=> {
  //   loadStays()
  // },[])

  // const filterUserStays = (stays, userId) => {
  //   return stays.filter(stay => stay.host._id === userId)
  // }

  // const userStays = filterUserStays(stays, demoLogInUser.id)
  // const userStays = stays.filter(stay => stay.host._id === demoLogInUser._id)

  // console.log(userStays)

  // if (!stays) return (<div>loading....</div>)
  return (
    <section className="user-profile">
      <div>My Profile</div>
      < UserInfo user={demoLogInUser} />
      <section className="user-rate">
        <div className="user-info">
          <div className="user-info-item">
            <section className="info">
              <span>Stays</span>
              <div>(demo)</div>
            </section>
            <LuHotel />
          </div>
          <div className="user-info-item">
            <section className="info">
              <span>Stars</span>
              <div>(demo)</div>
            </section>
            <IoStar />
          </div>
          <div className="user-info-item">
            <section className="info">
              <span>Reviews</span>
              <div>(demo)</div>
            </section>
            <BiMessageDetail />
          </div>
        </div>
      </section>
      <Outlet />
    </section>
  )
}
