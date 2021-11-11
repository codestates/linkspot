import './Layout.css';
import { withRouter } from 'react-router-dom';

function Layout(props) {
  return (
    <div className='layout-wrap'>
      <div className='layout' id='layout'>
        {props.children}
      </div>
    </div>
  );
}

export default withRouter(Layout);
