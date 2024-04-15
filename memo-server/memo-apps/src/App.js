/* eslint-disable */

// 이미지 출저.
// <a href="https://www.flaticon.com/kr/free-icons/" title="별 아이콘">별 아이콘  제작자: rizky adhitya pradana - Flaticon</a>
import "./css/App.css";
import "./css/reset.css";
import "./mediaCss/AppMedia.css";
import searchIcon from "./imgs/searchIcon.png";
import home from "./imgs/house-solid.svg";
import calender from "./imgs/calender.svg";
import star from "./imgs/star.svg";
import arrow from "./imgs/arrow.svg";
import sun from "./imgs/sun.png";
import moon from "./imgs/moon.png";
import barArrow from "./imgs/bar-arrow.png";
import WritePage from "./routes/writePage";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HomePage from "./routes/HomePage";
import ContentPage from "./routes/ContentPage";
import AddProject from "./routes/AddProject";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { setModal } from "./store";
import { changeSearch } from "./store";
import { setDark } from "./store";
import GroupContents from "./routes/GroupContents";
import SelectGroupMemo from "./routes/SelectGroupMemo";
import ModifyPage from "./routes/ModifyPage";
import TodayPage from "./routes/TodayPage";
import ImportantMemoPage from "./routes/ImportantMemoPage";
import SearchPage from "./routes/SearchPage";
import NotFoundPage from "./routes/NotFoundPage";

let MenubarImg = styled.img`
  position: relative;
  left: 27px;
  transform: rotate(${(props) => props.$menubarImg}deg);
  cursor: pointer;
  transition-duration: 0.5s;
`;

let Category = styled.div`
  width: 100%;
  height: ${(props) => props.$categoryHeight}vh;
  position: absolute;
  top: 45px;
  overflow: hidden;
  overflow: auto;
`;

let Sidebar = styled.div`
width: 20%;
height: 100%;
padding-top: 45px;
margin-top: -80px;
position: fixed;
top: 160px;
z-index: 30;
background-color: rgba(128, 128, 128, 0.089);

@media (max-width : 800px) {
  width: ${(props) => props.$sideBarWidth}px;
  overflow: hidden;
  backdrop-filter: blur(20px);
}
`

function App() {
  const [menubarImg, setMenubarImg] = useState(0);
  const [categoryHeight, setCategoryHeight] = useState();
  const [imgToggle, setimgToggle] = useState(true);
  const [search, setSearch] = useState("");
  const [bar, setBar] = useState(false);
  const [barPosition, setBarPosition] = useState(0);
  const [sideBarWidth, setSideBarWidth] = useState(0);
  const body = document.querySelector("body");
  const memoList = useSelector((state) => state.memo);
  const searchDatas = useSelector((state) => state.searchMemos);
  const modalState = useSelector((state) => state.modal);
  const groupMemo = useSelector((state) => state.groupMemo);
  const selectModal = useSelector((state) => state.selectModal);
  const darkMode = useSelector((state) => state.darkMode);
  const sidebarRef = useRef(null);
  const barRef = useRef(null);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let day = new Date();
  let today =
    day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
  let todayMemo = memoList.filter((memoList) => memoList.date === today);
  let importantMemos = memoList.filter(
    (memoList) => memoList.important === true
  );

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if(!sidebarRef.current.contains(e.target) && !barRef.current.contains(e.target)) {
        setBar(false);
        setSideBarWidth(0);
        setBarPosition(0);
      }
    });

    return() => {
      window.addEventListener('click' , () => {});
    }
  }, []);

  useEffect(() => {
    if(bar === false) {
      setSideBarWidth(0);
      setBarPosition(0);
    }

    if(bar === true) {
      setSideBarWidth(200);
      setBarPosition(200);
    }
  }, [bar]);

  useEffect(() => {
    if (darkMode === true) {
      body.style.backgroundColor = "#2B2B2B";
      body.style.color = "white";
    }

    if (darkMode === false) {
      body.style.backgroundColor = "white";
      body.style.color = "black";
      body.style.transition = ".3s";
    }
  }, [darkMode]);

  useEffect(() => {
    if (imgToggle === false) {
      setCategoryHeight(0);
    }

    if (imgToggle === true) {
      setCategoryHeight("30");
    }
  }, [imgToggle]);

  useEffect(() => {
    if (modalState === true) {
      body.style.overflowY = "hidden";
      window.scrollTo(0, 0);
    }
    if (modalState === false) {
      body.style.overflowY = "";
    }
  }, [modalState]);

  useEffect(() => {
    if (selectModal === true) {
      body.style.overflowY = "hidden";
      window.scrollTo(0, 0);
    }
    if (selectModal === false) {
      body.style.overflowY = "";
    }
  }, [selectModal]);

  useEffect(() => {
    if (!imgToggle) {
      setMenubarImg(-90);
    }

    if (imgToggle) {
      setMenubarImg(0);
    }
  }, [imgToggle]);

  const enterKey = (e) => {
    if (e.key === "Enter" && search !== null && search) {
      dispatch(changeSearch(search));
      navigate(`/search/${search}`);
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <header
                className="header"
                style={{
                  backgroundColor: darkMode ? "#2B2B2B" : "",
                  transition: ".3s",
                }}
              >
                <h1
                  style={{
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/")}
                >
                  memos
                </h1>
                <div
                  className="darkmode"
                  onClick={() => {
                    dispatch(setDark());
                  }}
                >
                  {darkMode ? (
                    <img className="moon" src={moon} alt="moon" />
                  ) : (
                    <img className="sun" src={sun} alt="sun" />
                  )}
                </div>
              </header>

              <div className="main-container">
                <Sidebar className="sidebar" ref={sidebarRef} $sideBarWidth={sideBarWidth}>
                  <div
                    className="sidebar-menu home"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <h2>
                      <img src={home} alt="메인 홈" />
                      home
                    </h2>
                    <p>{memoList.length}</p>
                  </div>

                  <div
                    className="sidebar-menu today"
                    onClick={() => {
                      navigate("/today");
                    }}
                  >
                    <h2>
                      <img src={calender} alt="금일 생성된 메모" />
                      today
                    </h2>
                    <p>{todayMemo.length}</p>
                  </div>

                  <div
                    className="sidebar-menu important"
                    onClick={() => {
                      navigate("/important");
                    }}
                  >
                    <h2>
                      <img src={star} alt="중요한 메모" />
                      important
                    </h2>
                    <p>{importantMemos.length}</p>
                  </div>
                  <div className="line"></div>
                  <div className="sidebar-menu projects">
                    <MenubarImg
                      $menubarImg={menubarImg}
                      src={arrow}
                      onClick={() => {
                        setimgToggle(!imgToggle);
                      }}
                    ></MenubarImg>
                    <h2>Group</h2>
                    <p
                      className="add-project"
                      onClick={() => {
                        dispatch(setModal(true));
                      }}
                    >
                      +
                    </p>
                    <Category
                      $categoryHeight={categoryHeight}
                      className="category"
                    >
                      {groupMemo.map((groupMemo) => {
                        return (
                          <div
                            className="projects-list"
                            key={groupMemo.id}
                            onClick={() => {
                              navigate(`/group/${groupMemo.id}`);
                            }}
                          >
                            <div
                              className="list-icon"
                              style={{ backgroundColor: `${groupMemo.color}` }}
                            ></div>
                            {groupMemo.title}
                          </div>
                        );
                      })}
                    </Category>
                  </div>
                  <div
                    className="side-bar-darkmode"
                    onClick={() => {
                      dispatch(setDark());
                    }}
                  >
                    {darkMode ? (
                      <img className="moon" src={moon} alt="moon" />
                    ) : (
                      <img className="sun" src={sun} alt="sun" />
                    )}
                  </div>
                </Sidebar>
                <div className="bar" ref={barRef} style={{left : `${barPosition}px`}} onClick={() => setBar(!bar)}>
                    <img src={barArrow} alt="사이드 바 이미지" />
                </div>

                <div className="content-container">
                  <div className="search">
                    <input
                      type="text"
                      name="search"
                      placeholder="&nbsp;&nbsp;Search"
                      style={{ color: darkMode ? "white" : "" }}
                      onKeyDown={(e) => enterKey(e)}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    <div
                      className="search-img"
                      onClick={() => {
                        if (search !== null && search) {
                          dispatch(changeSearch(search));
                          navigate(`/search/${search}`);
                        }

                        if (!search) {
                          navigate("/");
                        }
                      }}
                    >
                      <img src={searchIcon}></img>
                    </div>
                  </div>
                </div>
              </div>
              {modalState ? <AddProject /> : null}

              {selectModal ? <SelectGroupMemo /> : null}
              <Outlet></Outlet>
            </div>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/today" element={<TodayPage />} />
          <Route path="/important" element={<ImportantMemoPage />} />
          <Route
            path={`/search/${searchDatas.value}`}
            element={<SearchPage />}
          />
          <Route path="/modify/:id" element={<ModifyPage />} />
          <Route path="/group/:id" element={<GroupContents />} />
          <Route path="/content/:id" element={<ContentPage />} />
        </Route>

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
