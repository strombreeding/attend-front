import axios from "axios";
import { useEffect, useState } from "react";
import "../css/Main.css";
import { Header } from "./Header";
import { arrType } from "../types/types";
import { useNavigate } from "react-router-dom";
import { cutingAttend } from "../utils/utilsFuc";
import { baseUrl } from "../App";
import { Home } from "./Home";
import * as utils from "../utils/utilsFuc";

export const AttendacePost = (props: any) => {
  localStorage.setItem("checkArr", "0");
  const nowDate = {
    week: utils.getNowWeek(),
    year: utils.getDate().year,
    month: utils.getDate().month,
    date: utils.getDate().date,
  };
  const canDays = [0, 1];
  const navigate = useNavigate();
  // ***** 고쳐야함 유즈이펙트에서 밑에 함수 써야함
  const checkoutAble = () => {
    if (!canDays.includes(new Date().getDay())) {
      alert("주일 또는 월요일에만 출석부 기록 가능합니다.");
      navigate("/");
    }
  };
  const [members, setMembers] = useState([]);
  let data = 0;
  // const [data, setData] = useState(0);
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
  const editCount = (a: any[]) => {
    const b = document.getElementById("checkCount");
    if (b) {
      b.textContent = `${a.length}/${count.length}`;
    }
  };
  console.log(count);
  return (
    <>
      <Header setLogged={props.setLogged} name={props.leaderName} />

      <div id="trangition" className="main">
        <p>🟢:출석 🟡:예배 🔴:취소</p>
        <div id="attend_info">
          <h4>
            {nowDate.year - 2000}년 {nowDate.month}월
          </h4>
          <h2>{nowDate.week}주차</h2>
          <p>모두 체크 후, 맨 아래 버튼</p>
        </div>

        <div className="attendance_list">
          {members.map((member, index) => (
            <>
              <h3>{member}</h3>
              <div className="check">
                <div
                  id={String(index)}
                  className="attend"
                  onClick={(e) => {
                    count[index].index = index;
                    count[index].attend = "🟢";
                    const a = cutingAttend(count);
                    console.log(a);
                    editCount(a);
                    resetSection();
                  }}
                ></div>
                <div
                  id={String(index)}
                  className="pray"
                  onClick={(e) => {
                    count[index].index = index;
                    count[index].attend = "🟡";
                    const a = cutingAttend(count);
                    editCount(a);
                    resetSection();
                  }}
                ></div>
                <div
                  id={String(index)}
                  className="not_attend"
                  onClick={(e) => {
                    count[index].index = index;
                    count[index].attend = "🔴";
                    const a = cutingAttend(count);
                    editCount(a);
                    resetSection();
                  }}
                ></div>
              </div>
            </>
          ))}
        </div>
      </div>
      <article id="article" style={{ display: "none" }}>
        <h3>내역 확인후, 기록버튼 클릭</h3>
        <section id="section"></section>
      </article>
      <div className="btns">
        <div
          className="reset"
          onClick={() => {
            const a = document.getElementById("checkCount");
            if (a) {
              a.textContent = `0/${count.length}`;
            }
            resetSection();
            resetCount();
          }}
        >
          초기화
        </div>
        <h2 id="checkCount">
          {data}/{count.length}
        </h2>
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
                    await axios.post(`${baseUrl}/attendance`, { name: localStorage.getItem("leader"), list: sendData });
                    await axios.patch(`${baseUrl}/attendance`);
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
    </>
  );
};
