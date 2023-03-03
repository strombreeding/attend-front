import * as utils from "../utils/utilsFuc";
import "../css/Members.css";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { useState } from "react";
import { baseUrl } from "../App";
import axios from "axios";
import { Loading } from "./Loading";

export const Members = (props: any) => {
  const [newFace, setNewFace] = useState("");
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState("");
  const navigate = useNavigate();
  const onClick = (content: string) => {
    navigate(content);
  };
  return (
    <>
      <Header setLogged={props.setLogged} name={props.leaderName} />
      {loading && <Loading />}
      <div id="trangition" className="main">
        <div id="members_div">
          <div>
            <h3>뉴페이스 추가</h3>
            <small>새가족 이름을 적고 저장을 누르세요</small>
            <input
              type="text"
              placeholder="새가족 이름"
              maxLength={10}
              value={newFace}
              onChange={(e) => {
                setNewFace(e.target.value);
              }}
            />
            <button
              onClick={async () => {
                const confirmText = window.confirm(`${newFace} 님을 가족 구성원에 추가할까요?`);

                if (confirmText) {
                  setLoading(true);
                  const trangition = document.getElementById("trangition");
                  if (trangition) {
                    trangition.style.opacity = "0.3";
                  }
                  try {
                    await axios.get(`${baseUrl}/sheetIds`);
                    await axios.post(`${baseUrl}/members`, {
                      newFaceName: newFace,
                      name: localStorage.getItem("leader"),
                    });
                    setNewFace("");

                    setLoading(false);
                    if (trangition) trangition.style.opacity = "1";

                    alert("추가 완료!");
                  } catch (err) {
                    if (trangition) trangition.style.opacity = "1";

                    alert(err);
                  }
                }
              }}
            >
              저장
            </button>
          </div>
          <div>
            <h3>구성원 제거</h3>
            <small>삭제할 이름을 적고 저장을 누르세요</small>
            <input
              type="text"
              placeholder="구성원 이름"
              maxLength={10}
              value={target}
              onChange={(e) => {
                setTarget(e.target.value);
              }}
            />
            <button
              onClick={async () => {
                const confirmText = window.confirm(`${target} 님을 가족 구성원에서 제거하시겠습니까?`);
                if (confirmText) {
                  setLoading(true);
                  const trangition = document.getElementById("trangition");
                  if (trangition) {
                    trangition.style.opacity = "0.3";
                  }
                  try {
                    const a = await axios.get(`${baseUrl}/sheetIds`);
                    console.log(a);
                    await axios.delete(`${baseUrl}/members`, {
                      data: {
                        target,
                        name: localStorage.getItem("leader"),
                      },
                    });
                    setTarget("");
                    if (trangition) trangition.style.opacity = "1";
                    setLoading(false);

                    alert("삭제 완료!");
                  } catch (err) {
                    if (trangition) trangition.style.opacity = "1";

                    alert(err);
                  }
                }
              }}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
