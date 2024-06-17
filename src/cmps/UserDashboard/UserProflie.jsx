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
import { StayIndexSkeleton } from "../StayIndexSkeleton";




export function UserProflie() {
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const stays = useSelector((storeState) => storeState.stayModule.stays)

  useEffect(() => {
    loadStays()
  }, [])

  if (!stays) return <StayIndexSkeleton />

  const userStays = stays.filter(stay => stay.host._id === loggedInUser._id);

  const totalReviews = userStays.reduce((acc, stay) => acc + stay.reviews.length, 0);

  const averageRating = userStays.length > 0
    ? (userStays.reduce((acc, stay) => {
      const stayRating = stay.reviews.reduce((sum, review) => sum + review.rate, 0) / stay.reviews.length;
      return acc + (isNaN(stayRating) ? 0 : stayRating);
    }, 0) / userStays.length).toFixed(2)
    : 'N/A';

  return (
    <div className="profile-stay-list">
      <section className="user-profile">
        <UserInfo user={loggedInUser} />
        <section className="user-rate">
          <div className="user-info">
            <div className="user-info-item">
              <section className="info">
                <span>Stays</span>
                <div>{userStays.length}</div>
              </section>
              <LuHotel />
            </div>
            <div className="user-info-item">
              <section className="info">
                <span>Stars</span>
                <div>{averageRating}</div>
              </section>
              <IoStar />
            </div>
            <div className="user-info-item">
              <section className="info">
                <span>Reviews</span>
                <div>{totalReviews}</div>
              </section>
              <BiMessageDetail />
            </div>
          </div>
        </section>
      </section>
      {userStays.length > 0 ? (
        <div className="user-stay-list">
          <section className="user-list-title">
            <h1>My Stay List</h1>
          </section>
          <StayList stays={userStays} />
        </div>
      ) : (
        <section className="empty-user-stays">
          <h1>No properties listed yet. Take the first step towards becoming a Staybnb host today and go to Staybnb Your home!</h1>
        </section>
      )}
    </div>
  )
}
