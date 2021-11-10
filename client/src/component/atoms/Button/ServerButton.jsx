import "./ServerButton.css"

const ServerButton = (props) => {

  return (
    <div className={`server-button-container ${props.className}`}>
      <span className="indicator"></span>
      {/* 서버 정보에 썸네일이 없을 경우 서버 이름 랜더링 */}
      <div className="server-button" onClick={props.onClick}>
        {props.img ? <img src={props.img} alt={props.children} />
        : <p>{props.children}</p>
        }
      </div>
    </div>
  )
}

export default ServerButton