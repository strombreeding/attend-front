import * as utils from "../utils/utilsFuc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AttendacePost = (props: any) => {
  const navigate = useNavigate();
  const get = () => {
    try {
      const a = axios
        .get(`http://34.168.170.240:3000/members?name=${localStorage.getItem("leader")}`)
        .then((res) => {
          console.log(res.data.members);
        })
        .catch((err) => console.log(err));
      return a;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  get();
  return <div className="home">{}</div>;
};
