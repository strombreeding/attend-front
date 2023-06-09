import * as utils from "../utils/utilsFuc";
import "../css/Etc.css";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../App";
import { Loading } from "./Loading";
export const canDays = [0, 1, 2, 3, 4, 5];

export const Etc = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const onClick = (content: string) => {
    navigate(content);
  };
  const checkoutAble = () => {
    if (!canDays.includes(new Date().getDay())) {
      alert("일~목요일에만 이용 가능");
      navigate("/");
    }
  };
  const getEtc = async () => {
    const etc = await axios.get(`${baseUrl}/etc?name=${localStorage.getItem("leader")}`);
    const res = etc.data;
    console.log(res);
    setValue(res);
  };
  useEffect(() => {
    checkoutAble();
    getEtc();
  }, []);
  return (
    <>
      <Header setLogged={props.setLogged} name={props.leaderName} />
      {loading && <Loading />}

      <div id="trangition" className="main">
        <div id="etc_div">
          <h3>특이사항 기재</h3>
          <textarea
            placeholder="기타 등등 "
            id=""
            cols={30}
            rows={10}
            defaultValue={value}
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
              const trangition = document.getElementById("trangition");
              if (trangition) {
                trangition.style.opacity = "0.3";
              }
              setLoading(true);

              try {
                await axios.post(`${baseUrl}/etc`, { text, name: localStorage.getItem("leader") });
                setLoading(false);
                alert("저장 완료");
                onClick("/");
              } catch (err) {
                if (trangition) trangition.style.opacity = "1";

                alert(err);
              }
            }}
          >
            저장
          </button>
        </div>
      </div>
    </>
  );
};
