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

    const memoList = useSelector((state) => state.memo);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const handleImportant = (id) => {
      dispatch(importantMemo(id));
    }

    //console.log(sessionStorage.getItem('memo'));

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
                          <div className="memo-color" style={{backgroundColor : `${memoList.color}`}}></div>
                          <h2>{memoList.title}</h2>
                          <div className="subtitle">{memoList.subTitle}</div>
                          </div>
                          <div className="memo-menu">
                          <p>{memoList.date}</p>
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