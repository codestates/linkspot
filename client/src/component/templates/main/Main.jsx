import ServerList from '../../modules/server_list/ServerList'
import SectionContainer from "../../modules/section_container/SectionContainer"

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