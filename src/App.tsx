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
  // useEffect(() => {
  //   version();
  // }, []);
  const loggedIn = localStorage.getItem("logged") === "1" ? true : false;
  const [logged, setLogged] = useState(loggedIn);
  const [leaderName, setLeaderName] = useState(localStorage.getItem("leader"));
  const [cookie, setCookie, removeCookie] = useCookies();
  // const test = async () => {
  //   const queryCode = `
  //         query{
  //           getAllMembers{
  //             nick:nickname
  //           }
  //         }
  // 	`;
  //   const nick = "nick";
  //   const pw = "pw";
  //   const mutationCode = `
  //         mutation{
  //           addMember(addInput:{
  //             nickname:"${nick}"
  //             password:"${pw}"
  //           })
  //         }
  //   `;
  //   const mutation = {
  //     url: "https://atata.jinytree.shop/graphql",
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     data: JSON.stringify({
  //       query: mutationCode,
  //     }),
  //   };
  //   // const query = {
  //   //   url: "https://atata.jinytree.shop/members/all",
  //   //   method: "GET",
  //   //   headers: { "Content-Type": "application/json" },
  //   // };
  //   const query = {
  //     url: "https://atata.jinytree.shop/graphql",
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     data: JSON.stringify({
  //       query: queryCode,
  //     }),
  //   };
  //   const zz = await axios(mutation);
  //   console.log(zz);
  // };
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
