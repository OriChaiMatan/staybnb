import React from "react";
import { UserInfo } from "./UserProflie-cmps/UserInfo";

export function UserProflie() {

  const demoLogInUser = {
    _id: "u110",
    fullname: "Daniel Smith",
    imgUrl: "http://res.cloudinary.com/dqti9icif/image/upload/v1716982768/men4_yio0gl.jpg",
    username: "Daniel",
    passworg: "daniel123",
    address: "Kalisz, Poland"
  }

  return (
  <section> 
    <div>UserProflie</div>  
    < UserInfo user={demoLogInUser} />
    </section>
  )
}
