import * as utils from "../utils/utilsFuc";
import "../css/Main.css";
import { Home } from "./Home";
import { useState } from "react";
import { AttendacePost } from "./Attendance";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Header";

export const Main = (props: any) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance_post" element={<AttendacePost />} />
      </Routes>
    </BrowserRouter>
  );
};
