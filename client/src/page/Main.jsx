import { useState, useEffect } from "react"
import ServerList from "../component/modules/ServerList/ServerList"
import SectionContainer from "../component/modules/SectionContainer/SectionContainer"
import { UserInfoContext } from "../context/UserInfoContext"

const Main = () => {
  return (
    <>
      <ServerList />
      <SectionContainer/>
    </>
  )
}

export default Main