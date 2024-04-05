import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import star from "../imgs/star2.png";
import yellowStar from "../imgs/yellow-star.png";
import "./HomePage.css";
import { deleteMemo, importantMemo } from "../store";

// 이미지 출저.
// <a href="https://www.flaticon.com/kr/free-icons/" title="별 아이콘">별 아이콘  제작자: rizky adhitya pradana - Flaticon</a>

const HomePage = (props) => {

    const memoList = useSelector((state) => state.memo);
    const searchDatas = useSelector((state) => state.searchMemos);
    const [memo, setMemo] = useState(memoList);
    const [title, setTitle] = useState("Home");
    const [subTitle, setSubTitle] = useState("Memos");
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const handleImportant = (id) => {
      dispatch(importantMemo(id));
    }

    useLayoutEffect(() => {
      if(memoList !== undefined) {
        setMemo(memoList);
      }

      if(props.todayMemo !== undefined) {
        setMemo(props.todayMemo);
        setTitle("Today");
        setSubTitle("Today Memos");
      };

      if(props.importantMemos !== undefined) {
        setMemo(props.importantMemos);
        setTitle("Important");
        setSubTitle("Important Memos");
      }
    }, [memoList]);

    useLayoutEffect(() => {
      if(Array.isArray(props.searchData) && props.searchData.lenght !== 0) {
        setMemo(props.searchData);
        setTitle("Search");
        setSubTitle(searchDatas.value);
      }
    }, [searchDatas.value]);

    return(
        <div className="homepage">
              <div className="main">
                <h2>{title}</h2>
                <div className="tag">
                  {
                    props.searchData !== undefined ? (
                      <p>"{subTitle}" 에 대한 검색 결과</p>
                    ) : (
                      <p>{subTitle}</p>
                    )
                  }
                  <p className="addmemo" onClick={() => {
                    navigate('/write');
                  }}>+ Addmemo</p>
                </div>
                <div className="content-box">
                  {
                    memo.map((memoList) => {
                      return <div className="content-container" key={memoList.id}>
                      <div className="content" onClick={() => {navigate(`/content/${memoList.id}`)}}>
                        <div className="memo-color" style={{backgroundColor : `${memoList.color}`}}></div>
                        <h2>{memoList.title}</h2>
                        <div className="subtitle">{memoList.subTitle}</div>
                        </div>
                        <div className="memo-menu" onClick={() => {navigate(`/content/${memoList.id}`)}}>
                        <p>{memoList.date}</p>
                        <i className="fa-solid fa-trash-can" onClick={(e) => {
                          e.stopPropagation();
                          let result = window.confirm(`${memoList.title}을 삭제하시겠습니까?`);
                          if(result) {
                            dispatch(deleteMemo(memoList.id));
                          }
                        }}></i>
                        <i className="fa-solid fa-pen-to-square" onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/modify/${memoList.id}`);
                        }}></i>
                        <div className="important">
                          {
                            memoList.important ? (
                              <img alt="important-star" src={yellowStar} onClick={(e) => {
                                e.stopPropagation();
                                handleImportant(memoList.id)}}/>
                            ) : (
                              <img alt="important-star" src={star} onClick={(e) => {
                                e.stopPropagation();
                                handleImportant(memoList.id)}}/>
                            )
                          }
                        </div>
                        </div>
                        </div>
                    })
                  }
                </div>
              </div>
        </div>
    )
}

export default HomePage;