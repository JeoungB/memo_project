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
import { useSelector, useDispatch } from "react-redux";
import HomePage from "./routes/HomePage";
import ContentPage from "./routes/ContentPage";
import AddProject from "./routes/AddProject";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { setModal } from "./store";
import GroupContents from "./routes/GroupContents";
import SelectGroupMemo from './routes/SelectGroupMemo';
import ModifyPage from "./routes/ModifyPage";
import TodayPage from "./routes/TodayPage";

let MenubarImg = styled.img`
position: relative;
left: 27px;
transform: rotate(${props => props.$menubarImg}deg);
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

  const [menubarImg, setMenubarImg] = useState(-90);
  const [imgToggle, setimgToggle] = useState(false);
  const body = document.querySelector('body');
  const memoList = useSelector((state) => state.memo);
  const modalState = useSelector((state) => state.modal);
  const groupMemo = useSelector((state) => state.groupMemo);
  const selectModal = useSelector((state) => state.selectModal);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  // let memos = JSON.parse(sessionStorage.getItem('persist:memo')).memo;
  // console.log(memos)

  useEffect(() => {
    if(modalState === true) {
      body.style.overflowY = 'hidden';
      window.scrollTo(0,0);
    }
    if(modalState === false) {
      body.style.overflowY = '';
    }
  }, [modalState]);

  useEffect(() => {
    if(selectModal === true) {
      body.style.overflowY = 'hidden';
      window.scrollTo(0,0);
    }
    if(selectModal === false) {
      body.style.overflowY = '';
    }
  }, [selectModal]);

  useEffect(() => {
    if(!imgToggle) {
      setMenubarImg(-90);
    }

    if(imgToggle) {
      setMenubarImg(0);
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
              <img src={home} alt="메인 홈" />
              home
            </h2>
            <p>{memoList.length}</p>
          </div>

          <div className="sidebar-menu today" onClick={() => {
            navigate('/today');
          }}>
            <h2>
            <img src={calender} alt="금일 생성된 메모" />
              today
            </h2>
            <p>0</p>
          </div>

          <div className="sidebar-menu important">
            <h2>
            <img src={star} alt="중요한 메모" />
              important
            </h2>
            <p>0</p>
          </div>
          <div className="line"></div>
          <div className="sidebar-menu projects">
            <MenubarImg $menubarImg={menubarImg} src={arrow} onClick={() => {
              setimgToggle(!imgToggle);
            }}></MenubarImg>
            <h2>groupMemos</h2>
            <p className="add-project" onClick={() => {
              dispatch(setModal(true));
            }}>+</p>

            {
              groupMemo.map((groupMemo) => {
                return <div className="projects-list" key={groupMemo.id} onClick={() => {
                  navigate(`/group/${groupMemo.id}`);
                }}>
                <div className="list-icon" style={{backgroundColor : `${groupMemo.color}`}}></div>
                {groupMemo.title}
              </div>
              })
            }

          </div>
        </div>

        <div className="content-container">
          <div className="search">
            <img src={searchIcon}></img>
            <input type="text" name="search" placeholder="Search" />
          </div>
        </div>
        </div>
        {
          modalState ? (
            <AddProject />
          ) : null
        }

        {
          selectModal ? (
            <SelectGroupMemo />
          ) : null
        }
        <Outlet></Outlet>
        </div>
      }>
        <Route path="/" element={<HomePage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/today" element={<TodayPage />} />
        <Route path="/modify/:id" element={<ModifyPage />} />
        {/* content URL 파람에 선택한 제목도 같이 추가하기 group 도 */}
        <Route path="/group/:id" element={<GroupContents />} />
      <Route path="/content/:id" element={<ContentPage />} />
      </Route>

      <Route path="/*" element={<div>없는 페이지</div>} />
      </Routes>
        </div>
  );
}

export default App;
