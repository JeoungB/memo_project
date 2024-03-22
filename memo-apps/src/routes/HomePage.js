import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import star from "../imgs/star2.png";
import yellowStar from "../imgs/yellow-star.png";
import "./HomePage.css";
import { importantMemo } from "../store";

// 이미지 출저.
// <a href="https://www.flaticon.com/kr/free-icons/" title="별 아이콘">별 아이콘  제작자: rizky adhitya pradana - Flaticon</a>

const HomePage = () => {

    let memoList = useSelector((state) => state.memo);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const handleImportant = (id) => {
      dispatch(importantMemo(id));
      // 리덕스에 클릭한 메모 id 보내고 important 바꾸고 map에서 important 상태에 따라 별 이미지 바꾸기
    }

    //console.log(memoList);

    return(
        <div className="homepage">
            <div className="main">
                  <h2>Home</h2>
                  <div className="tag">
                    <p>Memos</p>
                    <p className="addmemo" onClick={() => {
                      navigate('/write');
                    }}>+ Addmemo</p>
                  </div>
                  <div className="content-box">
                    {
                      memoList.map((memoList) => {
                        return <div className="content-container" key={memoList.id}>
                        <div className="content" onClick={() => {navigate(`/content/${memoList.id}`)}}>
                          <div className="memo-color"></div>
                          <h2>{memoList.title}</h2>
                          {/* 메모 터치 빨간 영역 조절. importnat true 면 별 노란색 */}
                          </div>
                          <div className="memo-menu">
                          <i className="fa-solid fa-trash-can"></i>
                          <i className="fa-solid fa-pen-to-square"></i>
                          <div className="important">
                            {
                              memoList.important ? (
                                <img alt="important-star" src={yellowStar} onClick={() => {handleImportant(memoList.id)}}/>
                              ) : (
                                <img alt="important-star" src={star} onClick={() => {handleImportant(memoList.id)}}/>
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