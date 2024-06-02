import React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"

import { StayList } from "../StayList"
import { UserInfo } from "./UserProflie-cmps/UserInfo"
import { loadStays } from "../../store/actions/stay.action"

export function WishList() {
  const demoLogInUser = {
    id: "u110",
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

  if (!stays) return (<div>loading....</div>)

  const userLikedStays = stays.filter(stay => stay.likedByUsers.some(likedByUser => likedByUser.id === demoLogInUser.id))

  return <div className="user-stay-list">
    <section className="user-list-title">
      <h1>My WishList</h1>
    </section>
    <StayList stays={userLikedStays} />
  </div>
}
