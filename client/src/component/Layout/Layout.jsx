import "./Layout.css"
import { withRouter } from "react-router-dom"


// 가장 최상단 컨테이너
function Layout(props){  
  return (
    <div className="layout-wrap">
      <div className="layout" id="layout">
        {props.children}
      </div>
    </div>
  )
}

export default withRouter(Layout)