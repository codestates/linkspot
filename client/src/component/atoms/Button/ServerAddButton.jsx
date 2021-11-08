import "./ServerAddButton.css"
import { AiOutlinePlus } from "react-icons/ai"

const ServerAddButton = ({onClick}) => {

  return (
    <div className="server-add-button-container">
      <div className="server-add-button" onClick={onClick}>
        <AiOutlinePlus/>
      </div>
    </div>
  )
}

export default ServerAddButton