import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { baseUrl } from "../App";
import "../css/Login.css";
import { NowDate } from "../types/types";
import * as utils from "../utils/utilsFuc";
// import { Select } from "./Select";

export const Login = (props: any) => {
  const [text, setText] = useState("");
  const [test, setTest] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();
  const [originPw, setOriginPw] = useState("");
  const [pwText, setPwText] = useState("");
  let pw = "";
  const getPassword = async () => {
    const response = await axios.get(`${baseUrl}/password`);
    setOriginPw(response.data);
  };
  const tryLogin = (password: string) => {
    const password_text = document.getElementById("password_text") as HTMLInputElement;
    const password_input = document.getElementById("password_input") as HTMLInputElement;
    if (password_text && password_input) {
      password_text.value = "";
      password_text.style.display = "none";
      password_input.value = password_input.value + "*";
    }
    if (password.length !== originPw.length) return;
    if (password !== originPw) {
      const password_text = document.getElementById("password_text") as HTMLInputElement;
      const password_input = document.getElementById("password_input") as HTMLInputElement;
      if (password_text) {
        password_text.value = "비밀번호 오류!";
        password_input.value = "";
        password_text.style.display = "";
        pw = "";
      }
      return;
    }
    const selecter = document.getElementById("selecter");
    const passwordDiv = document.getElementById("password");
    if (selecter && passwordDiv) {
      selecter.style.display = "";
      passwordDiv.style.display = "none";
    }
  };
  useEffect(() => {
    getPassword();
  }, []);
  return (
    <>
      <div className="login">
        <p id="title">청년마을</p>
        <div id="password">
          <input readOnly id="password_input" type="text" />
          <input readOnly id="password_text" type="text" value={"암호!"} />
          <div id="grid">
            <button
              onClick={(e) => {
                const value = e.currentTarget.textContent;
                const a = pwText + "*";
                if (value) {
                  pw = pw + value;
                  tryLogin(pw);
                  // setPwText(a);
                }
              }}
            >
              1
            </button>
            <button
              onClick={(e) => {
                const value = e.currentTarget.textContent;
                const a = pwText + "*";
                if (value) {
                  pw = pw + value;
                  tryLogin(pw);
                  // setPwText(a);
                }
              }}
            >
              2
            </button>
            <button
              onClick={(e) => {
                const value = e.currentTarget.textContent;
                const a = pwText + "*";
                if (value) {
                  pw = pw + value;
                  tryLogin(pw);
                  // setPwText(a);
                }
              }}
            >
              3
            </button>
            <button
              onClick={(e) => {
                const value = e.currentTarget.textContent;
                const a = pwText + "*";
                if (value) {
                  pw = pw + value;
                  tryLogin(pw);
                  // setPwText(a);
                }
              }}
            >
              4
            </button>
            <button
              onClick={(e) => {
                const value = e.currentTarget.textContent;
                const a = pwText + "*";
                if (value) {
                  pw = pw + value;
                  tryLogin(pw);
                  // setPwText(a);
                }
              }}
            >
              5
            </button>
            <button
              onClick={(e) => {
                const value = e.currentTarget.textContent;
                const a = pwText + "*";
                if (value) {
                  pw = pw + value;
                  tryLogin(pw);
                  // setPwText(a);
                }
              }}
            >
              6
            </button>
            <button
              onClick={(e) => {
                const value = e.currentTarget.textContent;
                const a = pwText + "*";
                if (value) {
                  pw = pw + value;
                  tryLogin(pw);
                  // setPwText(a);
                }
              }}
            >
              7
            </button>
            <button
              onClick={(e) => {
                const value = e.currentTarget.textContent;
                const a = pwText + "*";
                if (value) {
                  pw = pw + value;
                  tryLogin(pw);
                  // setPwText(a);
                }
              }}
            >
              8
            </button>
            <button
              onClick={(e) => {
                const value = e.currentTarget.textContent;
                const a = pwText + "*";
                if (value) {
                  pw = pw + value;
                  tryLogin(pw);
                  // setPwText(a);
                }
              }}
            >
              9
            </button>
            <button
              onClick={(e) => {
                const value = e.currentTarget.textContent;
                const a = pwText + "*";
                if (value) {
                  pw = pw + value;
                  tryLogin(pw);
                  // setPwText(a);
                }
              }}
            >
              *
            </button>
            <button
              onClick={(e) => {
                const value = e.currentTarget.textContent;
                const a = pwText + "*";
                if (value) {
                  pw = pw + value;
                  tryLogin(pw);
                  // setPwText(a);
                }
              }}
            >
              0
            </button>
            <button
              onClick={(e) => {
                const value = e.currentTarget.textContent;
                const a = pwText + "*";
                if (value) {
                  pw = pw + value;
                  tryLogin(pw);
                  // setPwText(a);
                }
              }}
            >
              #
            </button>
          </div>
        </div>
        <div id="selecter" style={{ display: "none" }}>
          <h3>가족 선택후 로그인</h3>

          <select
            name=""
            id="zz"
            onChange={(e) => {
              setText(e.target.value);
              setTest(e.target.value);
            }}
          >
            <option value="none">가족을 선택하세요</option>
            {utils.useFulReaderName.map((option: string) => {
              return <option value={option[1] + option[2]}>{option}</option>;
            })}
          </select>

          <button
            className="login_btn"
            onClick={() => {
              try {
                const code = utils.getFamilyCode(text);
                localStorage.setItem("logged", "1");
                localStorage.setItem("leader", text);
                localStorage.setItem("code", String(code));
                localStorage.setItem("date", String(Date.now()));
                setTest("");
                props.setLogged(true);
                props.setLeaderName(text);
              } catch (err) {
                setTest("");
                alert(err);
              }
            }}
          >
            로그인
          </button>
        </div>
        <img src="/youth_logo.png" alt="" />
      </div>
    </>
  );
};
