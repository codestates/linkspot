import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AiOutlineMenu } from 'react-icons/ai';
import { UserInfoContext } from '../../../context/UserInfoContext';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const LeaveServer = (props) => {
  const serverName = props.server;
  const locator = useContext(UserInfoContext).locator;
  const server = useContext(UserInfoContext).server;
  const setServer = useContext(UserInfoContext).setServer;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const history = useHistory();
  const serverLeave = () => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_BASE_URL}/server/${locator.server}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setServer(server.filter((item) => item._id !== locator.server));
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button className='modal-button' onClick={handleOpen}>
        <AiOutlineMenu />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            서버 나가기
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            정말 {serverName} 서버를 나가시겠습니까?
          </Typography>
          <Button onClick={serverLeave}>네</Button>
          <Button onClick={handleClose}>아니오</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default LeaveServer;
