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
import { Loading } from "./Loading";

export const AttendacePost = (props: any) => {
  const [loading, setLoading] = useState(false);
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
      alert("토,일,월요일에만 출석부 기록 가능합니다.");
      navigate("/");
    }
  };
  const [members, setMembers] = useState([]);
  const [checkedArr, setCheckedArr] = useState([{ index: -1, attend: "" }]);
  let data = 0;
  // const [data, setData] = useState(0);
  const count: arrType[] = [];
  const get = () => {
    const fetch = axios
      .get(`${baseUrl}/members?name=${localStorage.getItem("leader")}`)
      .then((res) => {
        setMembers(res.data.familyInfo.members);

        if (res.data.attendanceInfo !== null) {
          const pushArr: Array<{ index: number; attend: string }> = [];

          res.data.attendanceInfo.map((member: any, index: any) => {
            const checked = ["🟢", "🟡"];

            if (checked.includes(member[0])) {
              pushArr.push({ index: index, attend: member[0] });
            } else {
              pushArr.push({ index: index, attend: "" });
            }
          });

          setCheckedArr(pushArr);
          return;
        }

        return;
      })
      .catch((err) => console.log(err));
    return fetch;
  };

  useEffect(() => {
    checkoutAble();
    get();
  }, []);

  const resetCount = () => {
    for (let i = 0; i < count.length; i++) {
      count[i].index = -1;
      count[i].attend = "";
    }
  };
  console.log(data);
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
  for (let i = 0; i < members.length; i++) {
    count.push({ index: -1, attend: "" });
  }
  return (
    <>
      <Header setLogged={props.setLogged} name={props.leaderName} />
      {loading && <Loading />}
      <div
        id="trangition"
        className="main"
        onClick={() => {
          const section = document.getElementById("section");
          const article = document.getElementById("article");
          if (section && article) {
            resetSection();
            section.style.display = "none";
            article.style.display = "none";
          }
        }}
      >
        <p>🟢:출석 🟡:예배 </p>
        <div id="attend_info">
          <h4>
            {nowDate.year - 2000}년 {nowDate.month}월
          </h4>
          <h2>{nowDate.week}주차</h2>
          <div>
            <small>1. 온 사람 체크</small>
            <small>1. 우측 하단 '기록' 클릭</small>
            <small>1. 내역 확인</small>
            <small>1. '기록' 다시 클릭</small>
            <small>1. 대기</small>
          </div>
        </div>

        <div className="attendance_list">
          {members.map((member, index) => {
            const checked = checkedArr[index].attend;
            const attendType = [];
            count[index].attend = checked;
            count[index].index = checkedArr[index].index;
            if (checked === "🟢") {
              attendType.push("✔");
              attendType.push("");
            } else if (checked === "🟡") {
              attendType.push("");
              attendType.push("✔");
            } else {
              attendType.push("");
              attendType.push("");
            }
            return (
              <>
                <h3>{member}</h3>
                <div className="check">
                  <button
                    id={String(index + "🟢")}
                    className="attend"
                    onClick={(e) => {
                      count[index].index = index;
                      count[index].attend = "🟢";
                      e.currentTarget.textContent = "✔";
                      const otherCheck = document.getElementById(`${index}🟡`);
                      if (otherCheck) {
                        otherCheck.textContent = "";
                      }
                      const a = cutingAttend(count);
                      editCount(a);
                      resetSection();
                    }}
                  >
                    {attendType[0]}
                  </button>
                  <button
                    id={String(index + "🟡")}
                    className="pray"
                    onClick={(e) => {
                      count[index].index = index;
                      count[index].attend = "🟡";
                      e.currentTarget.textContent = "✔";
                      const otherCheck = document.getElementById(`${index}🟢`);
                      if (otherCheck) {
                        otherCheck.textContent = "";
                      }
                      const a = cutingAttend(count);
                      editCount(a);
                      resetSection();
                    }}
                  >
                    {attendType[1]}
                  </button>
                </div>
              </>
            );
          })}
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
        <h2
          id="checkCount"
          onClick={() => {
            const sendData = cutingAttend(count);
            const section = document.getElementById("section");
            const article = document.getElementById("article");
            if (section && article) {
              if (article.style.display === "none" && section.style.display === "none") {
                sendData.map((source) => {
                  const div = document.createElement("div");
                  div.textContent = `${members[source.index]} : ${source.attend}`;
                  section?.appendChild(div);
                });
                section.style.display = "grid";
                article.style.display = "flex";
              } else {
                resetSection();
                section.style.display = "none";
                article.style.display = "none";
              }
            }
          }}
        >
          {checkedArr.length}/{count.length}
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
                  const trangition = document.getElementById("trangition");
                  if (trangition) {
                    trangition.style.opacity = "0.3";
                  }
                  try {
                    if (sendData.length === 0) throw new Error("아무도 출석 안함?");
                    setLoading(true);
                    await axios.post(`${baseUrl}/attendance`, { name: localStorage.getItem("leader"), list: sendData });
                    await axios.patch(`${baseUrl}/attendance`);

                    setLoading(false);
                    alert("기록 완료");
                    if (trangition) {
                      trangition.style.opacity = "1";
                    }
                  } catch (err) {
                    if (trangition) {
                      trangition.style.opacity = "1";
                    }
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
