import * as utils from "../utils/utilsFuc";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../App";
import { Loading } from "./Loading";

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
  const [fightingMsgId, setFightingMsgId] = useState("");
  let arrLength = 0;
  const navigate = useNavigate();
  const getMsgs = async () => {
    try {
      const msgs = await axios.get(`${baseUrl}/fighting`);
      const copy: Array<{
        id: string;
        content: string;
        likes: number;
        author: string;
      }> = [];
      msgs.data.map((msg: any) => {
        const obj = {
          id: msg._id,
          content: msg.content,
          likes: msg.likes,
          author: msg.author,
        };
        // setMsgArr(copy);
        copy.push(obj);
      });
      console.log(copy);
      let gogo = pick(copy.length);
      const msgInfo = copy[gogo];
      setFightingMsg(msgInfo.content);
      setFightingMsgAuthor(msgInfo.author);
      setFightingMsgLikes(msgInfo.likes);
      setFightingMsgId(msgInfo.id);
    } catch (err) {
      alert(err);
    }
  };
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
          id={fightingMsgId}
          className="fighting_msg"
          onClick={async (e) => {
            try {
              const id = e.currentTarget.id;
              await axios.patch(`${baseUrl}/fighting/likes`, { id, liker: localStorage.getItem("leader") });
              setFightingMsgLikes(fightingMsgLikes + 1);
            } catch (err: any) {
              console.log(err);
              alert(err.response.data.message);
            }
            // 좋아요 로직
          }}
        >
          <h4>{fightingMsg} </h4>
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
