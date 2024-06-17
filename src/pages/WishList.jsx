import React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"

import { StayList } from "../cmps/StayList"
import { loadStays, saveStay } from "../store/actions/stay.action"

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

  if (!stays) return (<div>Loading...</div>)

  const userLikedStays = stays.filter(stay => stay.likedByUsers.some(likedByUser => likedByUser._id === loggedInUser?._id))

  return (
    <div className="wishlist-container">
      <section className="user-wishlist-title">
        <h1>My Wishlist</h1>
      </section>
      {userLikedStays.length > 0 ? (
        <div className="user-stay-list">
          <StayList stays={userLikedStays} onUpdateStay={onUpdateStay} />
        </div>
      ) : (
        <section className="empty-user-wishlist">
          <h2>Your wishlist is empty</h2>
          <p>As you search, click the heart icon to save your favorite places and Experiences to a wishlist.</p>
        </section>
      )}
    </div>
  )
}