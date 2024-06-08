import React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import { StayList } from "../StayList"
import { UserInfo } from "./UserProflie-cmps/UserInfo"
import { loadStays } from "../../store/actions/stay.action"

import { LuHotel } from "react-icons/lu"
import { IoStar } from "react-icons/io5"
import { BiMessageDetail } from "react-icons/bi"




export function UserProflie() {

  const demoLogInUser = {
    id: "63bafeb80000000000000110",
    fullname: "Daniel Smith",
    imgUrl: "http://res.cloudinary.com/dqti9icif/image/upload/v1716982768/men4_yio0gl.jpg",
    username: "Daniel",
    passworg: "daniel123",
    address: "Kalisz, Poland"
  }

  const stays = useSelector((storeState) => storeState.stayModule.stays)

  useEffect(() => {
    loadStays()
  }, [])

  // const userStays = stays.filter(stay => stay.host._id === demoLogInUser.id)




  // console.log(userStays)

  if (!stays) return (<div>loading....</div>)
  return (
    <div className="profile-stay-list">
      <section className="user-profile">
        < UserInfo user={demoLogInUser} />
        <section className="user-rate">
          <div className="user-info">
            <div className="user-info-item">
              <section className="info">
                <span>Stays</span>
                <div>{(stays.filter(stay => stay.host._id === demoLogInUser.id)).length}</div>
              </section>
              <LuHotel />
            </div>
            <div className="user-info-item">
              <section className="info">
                <span>Stars</span>
                <div>4.88</div>
              </section>
              <IoStar />
            </div>
            <div className="user-info-item">
              <section className="info">
                <span>Reviews</span>
                <div>102</div>
              </section>
              <BiMessageDetail />
            </div>
          </div>
        </section>
      </section>
      <div className="user-stay-list">
        <section className="user-list-title">
          <h1>My Stay List</h1>
        </section>
        <StayList stays={stays.filter(stay => stay.host._id === demoLogInUser.id)} />
      </div>
    </div>
  )
}
