import ReactDOM from "react-dom/client";
import "./index.css";
import App, { baseUrl } from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// version();
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// <React.StrictMode>
{
  /* </React.StrictMode> */
}
