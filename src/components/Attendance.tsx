import axios from "axios";
import { useEffect, useState } from "react";
import "../css/Main.css";
import { Header } from "./Header";
import { arrType } from "../types/types";
import { useNavigate } from "react-router-dom";
import { cutingAttend } from "../utils/utilsFuc";
import { baseUrl } from "../App";
import { Home } from "./Home";

export const AttendacePost = (props: any) => {
  const canDays = [0, 1];
  const navigate = useNavigate();
  const checkoutAble = () => {
    if (!canDays.includes(new Date().getDay())) {
      alert("주일 또는 월요일에만 출석부 기록 가능합니다.");
      navigate("/");
    }
  };
  const [members, setMembers] = useState([]);
  const [data, setData] = useState();
  const count: arrType[] = [];
  const get = () => {
    const fetch = axios
      .get(`${baseUrl}/members?name=${localStorage.getItem("leader")}`)
      .then((res) => {
        setMembers(res.data.members);
      })
      .catch((err) => console.log(err));
    return fetch;
  };

  useEffect(() => {
    // checkoutAble();
    get();
  }, []);

  for (let i = 0; i < members.length; i++) {
    count.push({ index: -1, attend: "" });
  }
  const resetCount = () => {
    for (let i = 0; i < count.length; i++) {
      count[i].index = -1;
      count[i].attend = "";
    }
  };
  const resetSection = () => {
    const a = document.getElementById("section");
    const b = document.getElementById("article");
    if (a && b) {
      while (a?.hasChildNodes()) {
        a.removeChild(a.firstChild as Node);
      }
      b.style.display = "none";
      a.style.display = "none";
    }
  };
  console.log(count);
  return (
    <>
      <Header setLogged={props.setLogged} name={props.leaderName} />

      <div id="trangition" className="main">
        <small>🟢:출석 🟡:예배 🔴:취소</small>
        <p>모두 체크 후, 맨 아래 버튼</p>
        <div className="attendance_list">
          {members.map((member, index) => (
            <>
              <h4>{member}</h4>
              <div className="check">
                <div
                  id={String(index)}
                  className="attend"
                  onClick={(e) => {
                    count[index].index = index;
                    count[index].attend = "🟢";
                    console.log(count);
                    resetSection();
                  }}
                ></div>
                <div
                  id={String(index)}
                  className="pray"
                  onClick={(e) => {
                    count[index].index = index;
                    count[index].attend = "🟡";
                    console.log(count);

                    resetSection();
                  }}
                ></div>
                <div
                  id={String(index)}
                  className="not_attend"
                  onClick={(e) => {
                    count[index].index = index;
                    count[index].attend = "🔴";
                    console.log(count);

                    resetSection();
                  }}
                ></div>
              </div>
            </>
          ))}
        </div>
        <article id="article" style={{ display: "none" }}>
          <h3>내역 확인후, 기록버튼 클릭</h3>
          <section id="section"></section>
        </article>
        <div className="btns">
          <div
            className="reset"
            onClick={() => {
              resetSection();
              resetCount();
            }}
          >
            초기화
          </div>
          <div
            className="attendance_end"
            onClick={async () => {
              const sendData = cutingAttend(count);
              const section = document.getElementById("section");
              const article = document.getElementById("article");
              if (section && article) {
                switch (section.style.display) {
                  case "grid":
                    try {
                      if (sendData.length === 0) throw new Error("아무도 출석 안함?");
                      // await axios.post(`${baseUrl}/attendance`, { name: localStorage.getItem("leader"), list: sendData });
                      // await axios.patch(`${baseUrl}/attendance`);
                    } catch (err) {
                      alert(err);
                    }
                    break;
                  default:
                    sendData.map((source) => {
                      const div = document.createElement("div");
                      div.textContent = `${members[source.index]} : ${source.attend}`;
                      section?.appendChild(div);
                    });
                    section.style.display = "grid";
                    article.style.display = "flex";
                    break;
                }
              }
            }}
          >
            기록
          </div>
        </div>
      </div>
    </>
  );
};
