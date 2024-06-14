import React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"

import { StayList } from "../StayList"
import { UserInfo } from "./UserProflie-cmps/UserInfo"
import { loadStays, saveStay } from "../../store/actions/stay.action"

export function WishList() {

  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const stays = useSelector((storeState) => storeState.stayModule.stays)

  useEffect(() => {
    loadStays()
  }, [])

  async function onUpdateStay(stay) {
    try {
      await saveStay(stay)
    } catch (err) {
      console.log('Error in onUpdateStay', err)
    }
  }

  if (!stays) return (<div>loading....</div>)

  const userLikedStays = stays.filter(stay => stay.likedByUsers.some(likedByUser => likedByUser._id === loggedInUser?._id))

  return <div className="user-stay-list">
    <section className="user-list-title">
      <h1>My WishList</h1>
    </section>
    <StayList stays={userLikedStays} onUpdateStay={onUpdateStay} />
  </div>
}
