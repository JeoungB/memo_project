/* eslint-disable */
import "./App.css";
import "./reset.css";
import searchIcon from "./imgs/searchIcon.png";
import home from "./imgs/house-solid.svg";
import calender from "./imgs/calender.svg";
import star from "./imgs/star.svg";
import arrow from "./imgs/arrow.svg";
import WritePage from "./routes/writePage";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./routes/HomePage";
import ContentPage from "./routes/ContentPage";
import AddProject from "./routes/AddProject";
import { useEffect, useState } from "react";
import styled, {keyframes} from "styled-components";

let MenubarImg = styled.img`
position: relative;
left: 27px;
transform: rotate(${props => props.$menuberImg}deg);
cursor: pointer;
transition-duration: .5s;
`;

let ProjectList = styled.div`
width: 100%;
position: relative;
top: 20px;
padding-left: 60px;
background-color: blue;
`;

function App() {

  const [menuberImg, setMenuberImg] = useState(-90);
  const [imgToggle, setimgToggle] = useState(false);
  let memoList = useSelector((state) => state.memo);
  let navigate = useNavigate();

  useEffect(() => {
    if(!imgToggle) {
      setMenuberImg(-90);
    }

    if(imgToggle) {
      setMenuberImg(0);
    }
  }, [imgToggle]);

  return (
    <div className="App">
    <Routes>  
      
      <Route path="/" element={ 
        <div>
          <header className="header">
        <h1 style={{
          textTransform : "uppercase"
        }}>memos</h1>
        <p>화면 테마</p>
      </header>

      <div className="main-container">
        <div className="sidebar">
          <div className="sidebar-menu home" onClick={() => {
            navigate('/');
          }}>
            <h2>
              <img src={home} />
              home
            </h2>
            <p>{memoList.length}</p>
          </div>

          <div className="sidebar-menu today">
            <h2>
            <img src={calender} />
              today
            </h2>
            <p>0</p>
          </div>

          <div className="sidebar-menu important">
            <h2>
            <img src={star} />
              important
            </h2>
            <p>0</p>
          </div>
          <div className="line"></div>
          <div className="sidebar-menu projects">
            <MenubarImg $menuberImg={menuberImg} src={arrow} onClick={() => {
              setimgToggle(!imgToggle);
            }}></MenubarImg>
            <h2>projects</h2>
            <p className="add-project">+</p>
            <div className="projects-list">
              <div className="list-icon">*</div>
              <p>ddd</p>
            </div>
          </div>
        </div>

        <div className="content-container">
          <div className="search">
            <img src={searchIcon}></img>
            <input type="text" name="search" placeholder="Search" />
          </div>
        </div>
        </div>
        <AddProject />
        <Outlet></Outlet>
        </div>
      }>
        <Route path="/" element={<HomePage />} />
        <Route path="/write" element={<WritePage />} />
        {/* content URL 파람에 선택한 제목도 같이 추가하기 */}
      <Route path="/content/:id" element={<ContentPage />} />
      </Route>
      </Routes>
        </div>
  );
}

export default App;
