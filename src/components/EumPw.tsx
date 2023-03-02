import * as utils from "../utils/utilsFuc";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../App";

export const EumPw = (props: any) => {
  const [eumPw, setEumPw] = useState(0);
  const [pwUpdatedAt, setPwUpdatedAt] = useState(Number(Date.now() - 240000000));
  const navigate = useNavigate();

  const onClick = (content: string) => {
    navigate(content);
  };
  const getEumPw = async () => {
    const pw = await axios.get(`${baseUrl}/etc/2eum`);
    setEumPw(pw.data.pw);
    setPwUpdatedAt(pw.data.updatedAt);
  };
  useEffect(() => {
    getEumPw();
  }, []);
  return (
    <>
      <Header setLogged={props.setLogged} name={props.leaderName} />
      <div id="trangition" className="main">
        <div className="2eum">
          <h2>이음 비밀번호</h2>
          <h3>{eumPw}</h3>
          <p>{utils.makeTime(pwUpdatedAt)}</p>
        </div>
        <button
          className="2eum_btn"
          onClick={async () => {
            const pw = window.prompt("새 비번 입력!", `${eumPw}`);
            if (pw) {
              await axios.post(`${baseUrl}/2eum`, { pw: Number(pw) });
              setEumPw(Number(pw));
              setPwUpdatedAt(Date.now());
            }
          }}
        >
          비번 갱신하기!
        </button>
      </div>
    </>
  );
};
