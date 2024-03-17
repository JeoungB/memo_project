/* eslint-disable */
import "./App.css";
import "./reset.css";
import searchIcon from "./imgs/searchIcon.png";
import homeIcon from "./imgs/home-icon.png";
import calenderIcon from "./imgs/calender-icon.png";
import importantIcon from "./imgs/important-icon.png";
import WritePage from "./routes/writePage";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import datas from './data.json';
import { useEffect, useState } from "react";
import HomePage from "./routes/HomePage";

function App() {
  
  const [data, setData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    setData(() => {
      let newData = [...datas.contents];
      return newData;
    });
  }, []);

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={
          <>
            <header className="header">
        <h1>MEMOS</h1>
        <p>Login</p>
      </header>

      <div className="main-container">
        <div className="sidebar">
          <div className="sidebar-menu home" onClick={() => {
            navigate('/home');
          }}>
            <h2>
              <img src={homeIcon}></img>
              Home
            </h2>
            <p>{data.length}</p>
          </div>

          <div className="sidebar-menu today">
            <h2>
              <img src={calenderIcon}></img>
              Today
            </h2>
            <p>0</p>
          </div>

          <div className="sidebar-menu important">
            <h2>
              <img src={importantIcon}></img>
              Important
            </h2>
            <p>0</p>
          </div>

          <div className="sidebar-menu projects">
            <h2>Projects</h2>
          </div>
        </div>

        <div className="content-container">
          <div className="search">
            <img src={searchIcon}></img>
            <input type="text" name="search" placeholder="Search" />
          </div>

          <Outlet></Outlet>
        </div>
        </div>
          </>
        }>
            <Route
              path="/home"
              element={<HomePage data={data} />}
            />
            <Route path="/write" element={<WritePage />} />
        </Route>
      </Routes>

      

          {/* <Routes>
            <Route
              path="/"
              element={<HomePage data={data} />}
            />

            <Route path="/write" element={<WritePage />} />
          </Routes> */}
        </div>
  );
}

export default App;
