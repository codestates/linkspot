import { useContext, useEffect } from 'react'
import axios from "axios"
import ServerList from '../../modules/ServerList/ServerList'
import SectionContainer from "../../modules/SectionContainer/SectionContainer"
import { UserInfoContext } from '../../../context/UserInfoContext'

// layout에서 유저 로그인에 성공했을 시 랜더링 되는 페이지

const Main = () => {

  return (
    <>
      <ServerList />
      <SectionContainer/>
    </>
  )
}

export default Main