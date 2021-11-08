import { useContext, useState, useEffect } from "react"
import { Dialog } from "@mui/material"
import { UserInfoContext } from "../../../context/UserInfoContext"
import { db } from "../../../utils/firebase/firebase"

const ServerHandler = () => {

  const [serverList, setServerList] = useState()

  useEffect(()=>{
    return db.collection('server').onSnapshot((snapshot)=>{
      let serverList=[]
      snapshot.forEach((doc)=> serverList.push({...doc.data(), id:doc.id}))
      setServerList(serverList)
  })},[])
  
  console.log(serverList)
  
  const [serverName, setServerName] = useState(`${useContext(UserInfoContext).userInfo.email.split("@")[0]}님의 서버`)

  const onChange = (e) => {
    setServerName(e.target.value)
  }

  const createServer = async (e) => {
    e.preventDefault()
    const serverTemplate = {
      serverName : serverName
    }
    await db.collection("server").add(serverTemplate)
  }


  return(
    <>
      <input onChange={onChange} placeholder="servername" name="name" value={serverName}/>
      <button onClick={createServer}>서버 생성</button>
    </>
  )
}

export default ServerHandler