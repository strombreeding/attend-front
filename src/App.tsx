import "./App.css";
import react, { useState, useContext } from "react";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AttendacePost } from "./components/Attendance";
import { Home } from "./components/Home";
import { Etc } from "./components/Etc";
import { Members } from "./components/Members";
import { EumPw } from "./components/EumPw";
import { Fighting } from "./components/Fighting";

export const baseUrl = "http://34.168.170.240/api";
function App() {
  const loggedIn = localStorage.getItem("logged") === "1" ? true : false;
  const [logged, setLogged] = useState(loggedIn);
  const [leaderName, setLeaderName] = useState(localStorage.getItem("leader"));
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
