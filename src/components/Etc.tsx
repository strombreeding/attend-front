import * as utils from "../utils/utilsFuc";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../App";

export const Etc = (props: any) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const onClick = (content: string) => {
    navigate(content);
  };
  return (
    <>
      <Header setLogged={props.setLogged} name={props.leaderName} />
      <div id="trangition" className="main">
        <h3>특이사항 기재</h3>
        <textarea
          placeholder="기타 등등 "
          id=""
          cols={30}
          rows={10}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        <button
          style={{
            border: "gray solid 1px",
            padding: "10px",
          }}
          onClick={async () => {
            try {
              await axios.post(`${baseUrl}/etc`, { text, name: localStorage.getItem("leader") });
              alert("저장 완료");
              onClick("/");
            } catch (err) {
              alert(err);
            }
          }}
        >
          저장
        </button>
      </div>
    </>
  );
};
