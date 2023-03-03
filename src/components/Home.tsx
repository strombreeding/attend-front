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
  while (c === -1 || c > arr) {
    c = Math.round(Math.random() * (arr - 1));
  }
  return c;
};

export const Home = (props: any) => {
  // 명언 목록 불러오기
  const [fightingMsg, setFightingMsg] = useState("");
  const [fightingMsgAuthor, setFightingMsgAuthor] = useState("");
  const [fightingMsgLikes, setFightingMsgLikes] = useState(0);
  const [msgArr, setMsgArr] = useState([
    { author: "이진희", likes: 0, content: "잘 안되더라도 괜찮아요, 시간은 많아요" },
  ]);
  let arrLength = 0;
  const navigate = useNavigate();
  const getMsgs = async () => {
    try {
      const msgs = await axios.get(`${baseUrl}/fighting`);
      const zz = msgs.data.map((msg: any) => {
        const obj = {
          id: msg.id,
          content: msg.content,
          likes: msg.likes,
          author: msg.author,
        };
        const copy = [...msgArr, obj];
        setMsgArr(copy);
        let gogo = pick(copy.length);
        const zzz = copy[gogo];
        setFightingMsg(zzz.content);
        setFightingMsgAuthor(zzz.author);
        setFightingMsgLikes(zzz.likes);
      });
      return zz;
    } catch (err) {
      alert(err);
    }
  };
  const zz = async () => {};
  useEffect(() => {
    getMsgs();
  }, []);
  const onClick = (content: string) => {
    navigate(content);
  };

  return (
    <>
      <Header setLogged={props.setLogged} name={props.leaderName} />

      <div id="trangition" className="home">
        <div
          className="fighting_msg"
          onClick={async () => {
            setFightingMsgLikes(fightingMsgLikes + 1);
            await axios.patch(`${baseUrl}/fighting/likes`, { fightingMsgLikes });
            // 좋아요 로직
          }}
        >
          <h3>{fightingMsg} </h3>
          <div>
            <p>ღ{fightingMsgLikes}</p>
            <p>{fightingMsgAuthor}</p>
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
