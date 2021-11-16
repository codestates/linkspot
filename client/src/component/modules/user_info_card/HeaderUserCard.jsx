import "./HeaderUserCard.css"
import linkspot from "../../../assets/image/linkspot.svg"
import { BiMessage } from "react-icons/bi"
import { FiUserMinus } from "react-icons/fi"
import "./HeaderUserCard.css"

const HeaderUserCard=(props)=>{

  const username = props.data.username
  const userId = props.data.userId
  const thumnail = props.data.thumnail
  const status = props.data.status

  console.log(status)

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
          <BiMessage/>
          <FiUserMinus className="negative"/>
        </div>
      </div>
    </>
  )
}

export default HeaderUserCard