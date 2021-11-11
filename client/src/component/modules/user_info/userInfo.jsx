import "./userInfo.css"

const userInfo=()=>{
  return(
    <div className="userinfo-container">
    {/* 유저 정보에 닉네임이 존재할 경우 닉네임을, 없을 경우 이메일에서 @ 앞부분을 랜더링 */}
      <p className="userinfo-nickname">{userInfo.nickname ? userInfo.nickname : userInfo.email.split("@")[0]}</p>
      <p className="userinfo-tag">#1234</p>
    </div>
  )
}

export default userInfo