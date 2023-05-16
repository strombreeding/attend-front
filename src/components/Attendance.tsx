import axios from "axios";
import { useEffect, useState } from "react";
import "../css/Main.css";
import { Header } from "./Header";
import { arrType } from "../types/types";
import { useNavigate } from "react-router-dom";
import { cutingAttend } from "../utils/utilsFuc";
import { baseUrl } from "../App";
import * as utils from "../utils/utilsFuc";
import { Loading } from "./Loading";
const canDays = [0, 1, 2, 3, 4];

export const AttendacePost = (props: any) => {
  const navigate = useNavigate();
  const checkoutAble = () => {
    if (!canDays.includes(new Date().getDay())) {
      alert("일~목요일에만 이용 가능");
      navigate("/");
    }
  };

  const [loading, setLoading] = useState(false);
  localStorage.setItem("checkArr", "0");
  const nowDate = {
    week: utils.getNowWeek(),
    year: utils.getDate().year,
    month: utils.getDate().month,
    date: utils.getDate().date,
  };

  const [counter, setCounter] = useState(0);
  const [members, setMembers] = useState([]);
  const [checkedArr, setCheckedArr] = useState([{ index: -1, type: { attend: "", pray: "" } }]);

  const [count, setCount] = useState([{ index: -1, type: { attend: "", pray: "" } }]);
  const get = () => {
    const fetch = axios
      .get(`${baseUrl}/members?name=${localStorage.getItem("leader")}`)
      .then((res) => {
        setMembers(res.data.familyInfo.members);

        if (res.data.attendanceInfo !== null) {
          const pushArr: Array<{ index: number; type: { attend: string; pray: string } }> = [];
          const pushCount: arrType[] = [];
          let saveCounter = 0;
          console.log(res.data.attendanceInfo);
          res.data.attendanceInfo.map((member: any, index: any) => {
            const saveForCount = { attend: "", pray: "" };
            pushArr.push({ index, type: { attend: member[0], pray: member[1] } });

            if (member[0] === "TRUE") {
              saveForCount.attend = "🟢";
            }
            if (member[1] === "TRUE") {
              saveForCount.pray = "🟡";
            }
            if (member[0] !== "FALSE" && member[1] !== "FALSE") {
              ++saveCounter;
            } else if (member[0] === "TRUE") {
              ++saveCounter;
            } else if (member[1] === "TRUE") {
              ++saveCounter;
            }
            pushCount.push({ index, type: saveForCount });
          });
          setCounter(saveCounter);
          setCount(pushCount);
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
      const attend = document.getElementById(`${i}🟢`);
      const pray = document.getElementById(`${i}🟡`);
      if (attend && pray) {
        attend.textContent = "";
        pray.textContent = "";
      }
      count[i].index = i;
      count[i].type.attend = "";
      count[i].type.pray = "";
      checkedArr[i].index = i;
      checkedArr[i].type.attend = "FALSE";
      checkedArr[i].type.pray = "FALSE";
      setCounter(0);
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
        <div id="attend_info">
          <div>
            <h3>기록 방법~</h3>

            <small>1. 온 사람 체크</small>
            <small>2. 중앙 하단 n/N 또는 '기록' 클릭</small>
            <small>3. 내역 확인</small>
            <small>4. '기록' 클릭</small>
            <small>*초기화: 전부 체크해제</small>
          </div>
          <br />
          <h4>
            {nowDate.year - 2000}년 {nowDate.month}월
          </h4>
          <h2>{nowDate.week}주차</h2>
          <p>🟢:가족모임 🟡:예배 🟣:두 항목 클릭</p>
        </div>

        <div className="attendance_list">
          {members.map((member, index) => {
            const attendType = ["", ""];
            if (checkedArr.length >= index && checkedArr[index] !== undefined) {
              if (checkedArr[index].type.attend === "TRUE") {
                attendType[0] = "✔";
              }
              if (checkedArr[index].type.pray === "TRUE") {
                attendType[1] = "✔";
              }
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
                      if (e.currentTarget.textContent === "✔") {
                        e.currentTarget.textContent = "";
                        count[index].type.attend = "";
                        checkedArr[index].type.attend = "FALSE";
                        if (checkedArr[index].type.pray === "FALSE") {
                          setCounter(counter - 1);
                        }
                      } else {
                        count[index].type.attend = "🟢";
                        checkedArr[index].type.attend = "TRUE";
                        e.currentTarget.textContent = "✔";
                        if (checkedArr[index].type.pray === "FALSE") {
                          setCounter(counter + 1);
                        }
                      }

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
                      if (e.currentTarget.textContent === "✔") {
                        e.currentTarget.textContent = "";
                        count[index].type.pray = "";
                        checkedArr[index].type.pray = "FALSE";
                        if (checkedArr[index].type.attend === "FALSE") {
                          setCounter(counter - 1);
                        }
                      } else {
                        count[index].type.pray = "🟡";
                        checkedArr[index].type.pray = "TRUE";
                        e.currentTarget.textContent = "✔";
                        if (checkedArr[index].type.attend === "FALSE") {
                          setCounter(counter + 1);
                        }
                      }

                      resetSection();
                    }}
                  >
                    {attendType[1]}
                  </button>
                  <button
                    id={String(index + "🟣")}
                    className="select_all"
                    onClick={(e) => {
                      count[index].index = index;
                      if (checkedArr[index].type.attend === "TRUE" && checkedArr[index].type.pray === "FALSE") {
                        count[index].type.pray = "";
                        checkedArr[index].type.pray = "FALSE";
                        count[index].type.attend = "";
                        checkedArr[index].type.attend = "FALSE";
                        setCounter(counter - 1);
                      } else if (checkedArr[index].type.attend === "FALSE" && checkedArr[index].type.pray === "TRUE") {
                        count[index].type.pray = "";
                        checkedArr[index].type.pray = "FALSE";
                        count[index].type.attend = "";
                        checkedArr[index].type.attend = "FALSE";
                        setCounter(counter - 1);
                      } else if (checkedArr[index].type.attend === "TRUE" && checkedArr[index].type.pray === "TRUE") {
                        count[index].type.pray = "";
                        checkedArr[index].type.pray = "FALSE";
                        count[index].type.attend = "";
                        checkedArr[index].type.attend = "FALSE";
                        setCounter(counter - 1);
                      } else {
                        count[index].type.pray = "🟡";
                        checkedArr[index].type.pray = "TRUE";
                        count[index].type.attend = "🟢";
                        checkedArr[index].type.attend = "TRUE";
                        setCounter(counter + 1);
                      }

                      resetSection();
                    }}
                  ></button>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <article id="article" style={{ display: "none" }}>
        <h3>내역 확인후, 기록버튼 클릭</h3>
        <p>🟢:가족모임 🟡:예배 </p>

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
        <h2
          id="checkCount"
          onClick={() => {
            const sendData = cutingAttend(count);
            const section = document.getElementById("section");
            const article = document.getElementById("article");
            if (section && article) {
              if (article.style.display === "none" && section.style.display === "none") {
                sendData.map((source, i) => {
                  const div = document.createElement("div");
                  div.textContent = `${members[source.index]} : ${source.type.attend}${source.type.pray}`;
                  if (source.index === -1) {
                    div.textContent = `${members[i]} : `;
                  }
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
          {counter}/{count.length}
        </h2>
        <div
          className="attendance_end"
          onClick={async () => {
            const sendData = cutingAttend(checkedArr);
            const checkedList = cutingAttend(count);
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
                    if (counter === 0) throw new Error("아무도 출석 안함?");
                    setLoading(true);
                    await axios.post(`${baseUrl}/attendance`, { name: localStorage.getItem("leader"), list: sendData });

                    setLoading(false);
                    alert("기록 완료");
                    if (trangition) {
                      trangition.style.opacity = "1";
                    }
                    navigate("/");
                  } catch (err) {
                    if (trangition) {
                      trangition.style.opacity = "1";
                    }
                    alert(err);
                  }
                  break;
                default:
                  checkedList.map((source, i) => {
                    const div = document.createElement("div");
                    div.textContent = `${members[source.index]} : ${source.type.attend}${source.type.pray}`;
                    if (source.index === -1) {
                      div.textContent = `${members[i]} : `;
                    }
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
