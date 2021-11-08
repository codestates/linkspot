import "./ServerButton.css"

const ServerButton = (props) => {

  return (
    <div className={`server-button-container ${props.className}`}>
      <span className="indicator"></span>
      <div className="server-button" onClick={props.onClick}>
        {props.img ? <img src={props.img} alt={props.children} />
        : <p>{props.children}</p>
        }
      </div>
    </div>
  )
}

export default ServerButton