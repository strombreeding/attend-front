import "./App.css";
import react, { useState, useContext, useEffect } from "react";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AttendacePost } from "./components/Attendance";
import { Home } from "./components/Home";
import { Etc } from "./components/Etc";
import { Members } from "./components/Members";
import { EumPw } from "./components/EumPw";
import { Fighting } from "./components/Fighting";
import useCookies from "react-cookie/cjs/useCookies";
import axios from "axios";

// export const baseUrl = "http://localhost:3001";
export const baseUrl = "http://34.168.170.240/api";
function App() {
  const version = async () => {
    const compareVersion = await (await axios.get(`${baseUrl}/version`)).data;
    console.log(compareVersion);
    const nowVersion = localStorage.getItem("version");
    console.log();
    if (nowVersion !== compareVersion) {
      localStorage.setItem("version", compareVersion);
      document.getElementsByTagName("body")[0].innerHTML = `
        <h1 id = "reboot">재 실행 해주세요.</h1>
      `;
      alert("버전 업데이트가 필요합니다. 재실행 해주세요.");
    }
  };
  useEffect(() => {
    version();
  }, []);
  const loggedIn = localStorage.getItem("logged") === "1" ? true : false;
  const [logged, setLogged] = useState(loggedIn);
  const [leaderName, setLeaderName] = useState(localStorage.getItem("leader"));
  const [cookie, setCookie, removeCookie] = useCookies();
  console.log(cookie);
  console.log("나는 록드", logged);
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
