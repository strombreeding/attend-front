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
          src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F77fe7964-89a3-4eb0-a25c-5edf0cd7f955%2FUntitled.png?table=block&id=b08ca041-3420-4735-9e60-b9f3c76024fd&spaceId=beaa8bbc-f504-4c20-b220-9fc699f70e12&width=2000&userId=14cc2ef3-04b9-41f7-9991-3bf06bfcb033&cache=v2"
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
