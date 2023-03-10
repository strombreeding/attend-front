import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, { baseUrl } from "./App";
import reportWebVitals from "./reportWebVitals";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const version = async () => {
  const compareVersion = await (await axios.get(`${baseUrl}/version`)).data;
  console.log(compareVersion, "ㅎㅇㅎㅇ");
  const nowVersion = localStorage.getItem("version");
  if (nowVersion !== compareVersion) {
    localStorage.setItem("version", compareVersion);
    document.getElementsByTagName("body")[0].innerHTML = `
        <h1 id = "reboot">재 실행 해주세요.</h1>
      `;
    alert("버전 업데이트가 필요합니다. 재 실행 해주세요.");
  }
};
version();
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// <React.StrictMode>
{
  /* </React.StrictMode> */
}
