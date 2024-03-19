import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HomePage.css";

const HomePage = () => {

    let memoList = useSelector((state) => state.memo);
    let navigate = useNavigate();

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
                      memoList?.map((memoList) => {
                        return <div key={memoList.id} className="content" onClick={() => {navigate(`/content/${memoList.id}`)}}>
                          <h2>{memoList.title}</h2>

                          <div className="memo-menu">
                            <p>삭제</p>
                            <p>수정</p>
                            <p>{memoList.date}</p>
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