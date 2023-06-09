import "./App.css";
import { useState, useEffect } from "react";
import { Login } from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AttendacePost } from "./components/Attendance";
import { Home } from "./components/Home";
import { Etc } from "./components/Etc";
import { Members } from "./components/Members";
import { EumPw } from "./components/EumPw";
import { Fighting } from "./components/Fighting";
import useCookies from "react-cookie/cjs/useCookies";
import { registerServiceWorker } from "./sw";
import axios from "axios";

// export const baseUrl = "http://localhost:3001";
export const baseUrl = "https://jinytree.store/api";
function App() {
  const loggedIn = localStorage.getItem("logged") === "1" ? true : false;
  const [logged, setLogged] = useState(loggedIn);
  const [leaderName, setLeaderName] = useState(localStorage.getItem("leader"));

  useEffect(() => {
    registerServiceWorker();
    checkAppUpdate();
  }, []);

  const checkAppUpdate = async () => {
    try {
      const res = await axios.get(`${baseUrl}/version`);
      console.log(res);
      const serverVersion = res.data;
      if (localStorage.getItem("version") === null) {
        localStorage.setItem("version", serverVersion);
      }
      const clineVersion = localStorage.getItem("version");

      if (serverVersion !== clineVersion) {
        updateServiceWorker();
        resetHtml();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resetHtml = async () => {
    document.getElementsByTagName("body")[0].innerHTML = `
        <h1 id = "reboot">재 실행 해주세요.</h1>
      `;
    alert("버전 업데이트가 필요합니다. 재 실행 해주세요.");
  };
  const updateServiceWorker = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((regist) => {
        if (regist && regist.waiting) {
          regist.waiting.postMessage({
            type: "SKIP_WAITING",
          });
        }
      });
    }
  };

  return (
    <div className="App">
      {logged === true ? (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home setLogged={setLogged} leaderName={leaderName} />} />
              <Route
                path="/attendance_post"
                element={<AttendacePost setLogged={setLogged} leaderName={leaderName} />}
              />
              <Route path="/attendance_get" element={<Etc setLogged={setLogged} leaderName={leaderName} />} />
              <Route path="/attendance_newFace" element={<Members setLogged={setLogged} leaderName={leaderName} />} />
              <Route path="/eum_pw" element={<EumPw setLogged={setLogged} leaderName={leaderName} />} />
              <Route path="/fighting" element={<Fighting setLogged={setLogged} leaderName={leaderName} />} />
            </Routes>
          </BrowserRouter>
        </>
      ) : (
        <Login setLogged={setLogged} setLeaderName={setLeaderName} />
      )}
    </div>
  );
}

export default App;
