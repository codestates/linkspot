import "./HeaderUserCard.css"
import linkspot from "../../../assets/image/linkspot.svg"
import { FiUserPlus } from "react-icons/fi"
import { FiUserMinus } from "react-icons/fi"
import "./HeaderUserCard.css"

const BlockUserCard=(props)=>{

  const username = props.data.username
  const userId = props.data.userId
  const thumnail = props.data.thumnail
  const status = props.data.status
  const friendList = props.setState.friendList
  const setFriendList = props.setState.setFriendList
  const setRequestList = props.setState.setRequestList

  console.log(setRequestList)

  return(
    <>
      <div className="header-card-container">
        <div className="left-container">
          {thumnail ? 
          <img src={thumnail} alt='img' />
          : <img src={linkspot} alt="default img"/> }
          <div className='card-info'>
            <span className="info-username">{username}</span>
            <span className="info-userid">#{userId}</span>
            <div className="card-status">
              <p>{status}</p>
            </div>
          </div>
        </div>
        <div className="button-container">
          <FiUserPlus className="positive" onClick={()=>{
            setFriendList([...friendList, {"username": username, "userId" : userId, "thumnail":thumnail, "status":"online"}])
            setBlockList(blockList.filter((item)=> item !== props.data))
          }}/>
          <FiUserMinus className="negative"/>
        </div>
      </div>
    </>
  )
}

export default BlockUserCard