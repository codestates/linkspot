import "./StatusMenu.css"

const StatusMenu =(props) => {
  //스테이터스메뉴에서 다루는 정보
  // 1. 유저 상태정보

  return (
    <div className="status-menu-container">
      <div className="status-menu online">온라인</div>
      <div className="status-menu away">자리 비움</div>
      <div className="status-memu off">다른 용무 중</div>
      <div className="status-menu offline">오프라인 표시</div>
    </div>
  );
}

export default StatusMenu