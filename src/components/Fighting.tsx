import "../css/Home.css";
import "../css/Fight.css";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../App";
import { Loading } from "./Loading";

export const Fighting = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const onClick = (content: string) => {
    navigate(content);
  };
  return (
    <>
      <Header setLogged={props.setLogged} name={props.leaderName} />
      {loading && <Loading />}
      <div id="trangition" className="main">
        <div id="fight_box">
          <h2>응원 메시지를 작성하세요</h2>
          <p>닉네임을 입력하세요.(줄바꿈X)</p>
          <input
            style={{
              height: "30px",
              margin: "5px 0",
            }}
            type="text"
            placeholder="닉네임 입력(최대 10자)"
            onChange={(e) => {
              setAuthor(`${e.target.value}`);
            }}
            maxLength={10}
            minLength={2}
          />
          <small>{author.length}/10</small>
          <p>응원 메시지를 입력하세요. (줄바꿈X)</p>
          <input
            style={{
              height: "30px",
              margin: "5px 0",
            }}
            placeholder="메시지 입력(최대 45자)"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            maxLength={45}
            minLength={3}
          />
          <small>{content.length}/45</small>
          <br />
          <div
            style={{
              border: "solid 1px gray",
              width: "50px",
              padding: "5px 10px",
              margin: "10px 0",
            }}
            onClick={async () => {
              setLoading(true);
              const trangition = document.getElementById("trangition");
              if (trangition) {
                trangition.style.opacity = "0.3";
              }
              try {
                await axios.post(`${baseUrl}/fighting`, { content, author: `- ${author}` });
                setLoading(false);
                alert("메시지 등록!");
                navigate("/");
              } catch (err) {
                if (trangition) trangition.style.opacity = "1";

                alert(err);
              }
            }}
          >
            보내기
          </div>
          <small style={{ color: "red" }}>*메시지 유효기간 : 7일</small>
          <br />
          <h4>아래처럼 나옵니다.</h4>
          <p>{content}</p>
          <p>- {author}</p>
        </div>
      </div>
    </>
  );
};
