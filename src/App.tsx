import "./App.css";
import react, { useState, useContext } from "react";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Main } from "./components/Main";
import { BrowserRouter, Routes } from "react-router-dom";

function App() {
  const loggedIn = localStorage.getItem("logged") === "1" ? true : false;
  const [logged, setLogged] = useState(loggedIn);
  const [leaderName, setLeaderName] = useState(localStorage.getItem("leader"));
  console.log("나는 록드", logged);
  return (
    <div className="App">
      {logged === true ? (
        <>
          <Header name={leaderName} />
          <Main />
        </>
      ) : (
        <Login setLogged={setLogged} setLeaderName={setLeaderName} />
      )}
    </div>
  );
}

export default App;
