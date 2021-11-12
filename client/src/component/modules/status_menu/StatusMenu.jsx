import Online from "../../atoms/icon/online/Online";
import Offline from "../../atoms/icon/offline/Offline";
import Off from "../../atoms/icon/off/DoNotDisturb";
import AwayFromKeyboard from "../../atoms/icon/away_from_keyboard/AwayFromKeyboard"

import "./StatusMenu.css"

const StatusMenu =({ open, onClose }) => {
  //스테이터스메뉴에서 다루는 정보
  // 1. 유저 상태정보
  const isOpen = open
  console.log(onClose)
  return (
    <>
    <div id="background" className="background" onClick={()=>onClose()}>
      <div className={isOpen ? "status-menu-container" : "status-menu-container-closed"}>
        <div className="status-menu online">
          <Online/>
          <p>온라인</p>
        </div> 
        <div className="status-menu away-from-keyboard">
          <AwayFromKeyboard/>
          <p>자리 비움</p>
        </div>
        <div className="status-menu do-not-disturb">
          <Off/>
          <div className="text-container">
            <p>다른 용무 중</p>
            <p className="explaination">모든 알림을 받지 않아요.</p>
          </div>
        </div>
        <div className="status-menu offline">
          <Offline/>
          <div className="text-container">
            <p>오프라인 표시</p>
            <p className="explaination">온라인으로 표시되지는 않지만,<br/> Discord의 모든 기능을 이용할 수 있어요.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default StatusMenu