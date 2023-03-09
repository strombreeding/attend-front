// import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";
import * as utils from "../utils/utilsFuc";

export const Header = (props: any) => {
  const navigate = useNavigate();

  const onClickImg = () => {
    navigate("/");
  };

  return (
    <header className="mom_header">
      <div className="header">
        <div>{props.name}가족</div>
      </div>
      <a onClick={onClickImg}>
        <img
          style={{
            padding: "4px",
          }}
          src="/youth_logo.png"
          alt=""
        />
      </a>
      <div
        onClick={() => {
          localStorage.clear();
          props.setLogged(false);
          window.location.href = "/";
        }}
      >
        로그아웃
      </div>
    </header>
  );
};
