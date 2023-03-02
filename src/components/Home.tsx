import * as utils from "../utils/utilsFuc";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";

export const Home = (props: any) => {
  const navigate = useNavigate();
  const onClick = (content: string) => {
    navigate(content);
  };
  return (
    <div id="trangition" className="home">
      <small>
        {/* 65자 미만 */}
        65자 미만으로 작성 부탁드립니다.
      </small>
      <div
        id="attendance_post"
        className="hexagon"
        onClick={() => {
          onClick("attendance_post");
        }}
      >
        <h4>출석부 기록</h4>
      </div>
      <div id="attendance_get" className="hexagon">
        <h4>기록 열람</h4>
      </div>
      <div id="attendance_newFace" className="hexagon">
        <h4>뉴페 등록</h4>
      </div>
      <div id="eum_pw" className="hexagon">
        <h4>이음 비번</h4>
      </div>
      <div id="fighting" className="hexagon">
        <h4>응원 메시지</h4>
      </div>
    </div>
  );
};
