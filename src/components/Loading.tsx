import * as utils from "../utils/utilsFuc";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../App";
import { PacmanLoader } from "react-spinners";

export const Loading = (props: any) => {
  return (
    <>
      <div className="contentWrap">
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "45%",
            transform: "translate(-50%, -50%)",
            zIndex: "111",
          }}
        >
          <PacmanLoader color="#238ff3" size={65} />
          <h2 style={{ textAlign: "center" }}>로딩 중 .....</h2>
        </div>
      </div>
      {/* <div
        style={{
          padding: "100%",
          backgroundColor: "#c9dbec",
          opacity: "1",
        }}
      ></div> */}
    </>
  );
};
