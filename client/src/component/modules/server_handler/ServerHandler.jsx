import { useContext, useState, useEffect } from 'react';
import { UserInfoContext } from '../../../context/UserInfoContext';
<<<<<<< HEAD
import axios from "axios"
import { db } from '../../../utils/firebase/firebase';
import './ServerHandler.css';

const ServerHandler = ({ onClose }) => {
  const server = useContext(UserInfoContext).server
  const setServer = useContext(UserInfoContext).setServer
=======
import { server } from '../../../db';
import './ServerHandler.css';
const ServerHandler = ({ open, onClose }) => {
  // const [serverList, setServerList] = useState();
>>>>>>> 5488769f55721d9b597ec5ebd1ad931af7405c75
  const [previewUrl, setPreviewUrl] = useState('');

  // useEffect(() => {
  //   return db.collection('server').onSnapshot((snapshot) => {
  //     let serverList = [];
  //     snapshot.forEach((doc) => serverList.push({ ...doc.data(), id: doc.id }));
  //     setServerList(serverList);
  //   });
  // }, []);

<<<<<<< HEAD
  // console.log(useContext(UserInfoContext).userInfo.username);
=======
  // console.log(serverList);
>>>>>>> 5488769f55721d9b597ec5ebd1ad931af7405c75


  
  const [serverName, setServerName] = useState(
    `${useContext(UserInfoContext).userInfo.username}님의 서버`
  );

  const onChange = (e) => {
    setServerName(e.target.value);
  };

  const handleImgupload = (e) => {
    e.preventDefault();

    const newFile = e.target.files[0];
    //console.log(newFile);
    if (newFile) {
      const reader = new FileReader();
      reader.readAsDataURL(newFile);
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        //console.log(reader.result);
      };
    }
  };

<<<<<<< HEAD
  const createServer =()=> {
    axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/server`,{
      "serverName" : serverName
    },{
      withCredentials:true
    })
    .then(response => setServer([...server,response.data.serverData]))
    .catch(error => console.log(error))
=======
  const createServer = async (e) => {
    e.preventDefault();
    const serverTemplate = {
      serverName: serverName,
    };
>>>>>>> 5488769f55721d9b597ec5ebd1ad931af7405c75
  };

  return (
    <>
      <div className='background' onClick={() => onClose()}></div>
      <div className='server-add-modal'>
        <div className='server-add-modal-header'>
          <h3 className='server-add-modal-header-title'>새 서버 만들기</h3>
          <p className='server-add-modal-header-sb'>
            새 서버에 이름과 아이콘을 설정하세요.
          </p>
        </div>
        <div className='server-add-modal-body'>
          <div className='fake-input2'>
            <input
              type='file'
              name='image'
              value=''
              encType='multipart/form-data'
              onChange={handleImgupload}
            />
            <div></div>
            이미지 첨부
          </div>
          <h4>서버이름</h4>
          <input
            onChange={onChange}
            placeholder='servername'
            className='name'
            value={serverName}
          />
          <button onClick={createServer}>서버 생성</button>
        </div>
      </div>
    </>
  );
};

export default ServerHandler;
