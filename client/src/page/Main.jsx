import ServerList from "../component/modules/ServerList/ServerList"
import SectionContainer from "../component/modules/SectionContainer/SectionContainer"

const Main = ({ props }) => {


  const serverList = props.serverList
  const setCurrentServer = props.setCurrentServer
  const currentServer = props.currentServer
  const user = props.user
  const setIsLogin = props.setIsLogin


  return (
    <>
      <ServerList props={{serverList,setCurrentServer}} />
      <SectionContainer props={{serverList, user, currentServer}}/>
    </>
  )
}

export default Main