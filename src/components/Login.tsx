import { useContext, useState } from "react";
import "../css/Login.css";
import { NowDate } from "../types/types";
import * as utils from "../utils/utilsFuc";

export const Login = (props: any) => {
  const [text, setText] = useState("");
  const [test, setTest] = useState("");

  return (
    <div className="login">
      <div>
        <h3>온라인 출석부</h3>
        <small>리더이름 (2음절)</small>
        <input
          type="text"
          id="zz"
          placeholder="입력란"
          autoComplete="off"
          onChange={(e) => {
            setText(e.target.value);
            setTest(e.target.value);
          }}
          value={test}
        />
        <button
          onClick={() => {
            try {
              const code = utils.getFamilyCode(text);
              localStorage.setItem("logged", "1");
              localStorage.setItem("leader", text);
              localStorage.setItem("code", String(code));
              localStorage.setItem("date", String(Date.now()));
              setTest("");
              props.setLogged(true);
              props.setLeaderName(text);
            } catch (err) {
              setTest("");
              alert(err);
            }
          }}
        >
          로그인
        </button>
      </div>
      <img
        src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F77fe7964-89a3-4eb0-a25c-5edf0cd7f955%2FUntitled.png?table=block&id=b08ca041-3420-4735-9e60-b9f3c76024fd&spaceId=beaa8bbc-f504-4c20-b220-9fc699f70e12&width=2000&userId=14cc2ef3-04b9-41f7-9991-3bf06bfcb033&cache=v2"
        alt=""
      />
    </div>
  );
};
