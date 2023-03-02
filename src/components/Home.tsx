import * as utils from "../utils/utilsFuc";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../App";

const fightingMsgArr = [
  {
    content: "윈터바텀킷을 차지해야해! 그건 우리 가문의 보물이니깐!",
    author: "보리스 진네만",
    likes: 0,
  },
];
const pick = (arr: any) => {
  let c = -1;
  while (c < 0 || c > arr.length) {
    c = Math.round(Math.random() * arr.length - 1);
  }
  return c;
};

export const Home = (props: any) => {
  // 명언 목록 불러오기
  const getMsgs = async () => {
    try {
      const msgs = await axios.get(`${baseUrl}/fighting`);
      msgArr.push(msgs.data);
    } catch (err) {
      alert(err);
    }
  };
  const msgArr = fightingMsgArr;
  // if (msgArr.length <= 1) {
  //   getMsgs();
  // }
  let gogo = pick(msgArr);
  // while (gogo === Number(localStorage.getItem("pick"))) {
  //   gogo = pick(msgArr);
  // }
  localStorage.setItem("pick", String(gogo));
  const msg = msgArr[gogo];
  console.log(msg.content.length);
  console.log(msg.content.length + msg.author.length);
  const [fightingMsg, setFightingMsg] = useState(msg.content);
  const [fightingMsgAuthor, setFightingMsgAuthor] = useState(msg.author);
  const [fightingMsgLikes, setFightingMsgLikes] = useState(msg.likes);
  const navigate = useNavigate();
  const onClick = (content: string) => {
    navigate(content);
  };

  return (
    <>
      <Header setLogged={props.setLogged} name={props.leaderName} />

      <div id="trangition" className="home">
        <div
          className="fighting_msg"
          onClick={() => {
            setFightingMsgLikes(fightingMsgLikes + 1);
            // 좋아요 로직
          }}
        >
          <small>{fightingMsg} </small>
          <div>
            <small>ღ{fightingMsgLikes}</small>
            <small>ㅡ{fightingMsgAuthor}</small>
          </div>
        </div>
        <div
          id="attendance_post"
          className="hexagon"
          onClick={() => {
            onClick("attendance_post");
            // if (new Date().getDay() === 0 || new Date().getDay() === 1) {
            // } else {
            //   alert("주일과 월요일에만 기록 가능합니다.");
            // }
          }}
        >
          <h4>출석부 기록</h4>
        </div>
        <div
          id="attendance_get"
          className="hexagon"
          onClick={() => {
            onClick("attendance_get");
          }}
        >
          <h4>
            주차별<br></br>특이 사항
          </h4>
        </div>
        <div
          id="attendance_newFace"
          className="hexagon"
          onClick={() => {
            onClick("attendance_newFace");
          }}
        >
          <h4>구성원 관리</h4>
        </div>
        <div
          id="eum_pw"
          className="hexagon"
          onClick={() => {
            onClick("eum_pw");
          }}
        >
          <h4>이음 비번</h4>
        </div>
        <div
          id="fighting"
          className="hexagon"
          onClick={() => {
            onClick("fighting");
          }}
        >
          <h4>응원 메시지</h4>
        </div>
      </div>
    </>
  );
};
