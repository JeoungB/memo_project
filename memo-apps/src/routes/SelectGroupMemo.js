import "./SelectGroupMemo.css";
import { useDispatch, useSelector } from "react-redux";
import star from "../imgs/star2.png";
import yellowStar from "../imgs/yellow-star.png";
import checkIcon from "../imgs/check-icon.png";
import { useState } from "react";
import { addGroupMemo, checkMemo, setSelectModal } from "../store";
import { useParams } from "react-router-dom";

const SelectGroupMemo = () => {

    const memoList = useSelector((state) => state.memo);
    const groupMemo = useSelector((state) => state.groupMemo);
    let {id} = useParams();
    let dispatch  = useDispatch();

    let currentGroup = groupMemo.find((groupMemo) => groupMemo.id == id);
    let noneGoupMemos = memoList.filter((memoList) => memoList.group === "");

    return(
        <div className="select-groupmemo">
            <div className="select-modal">
                <div className="select-contents">
                    {
                        noneGoupMemos.map((noneGoupMemos) => {
                            return <div className="content-container select-container" key={noneGoupMemos.id} onClick={() => {
                                dispatch(checkMemo(noneGoupMemos.id));
                            }}>
                            <div className="content select">
                                {
                                    noneGoupMemos.check ? (
                                        <div className="check">
                                        <img src={checkIcon} alt="체크 이미지" />
                                    </div>
                                    ) : null
                                }
                              <div className="memo-color"></div>
                              <h2>{noneGoupMemos.title}</h2>
                              <div className="subtitle">{noneGoupMemos.subTitle}</div>
                              </div>
                              <div className="memo-menu select-memo-menu">
                              <p>{noneGoupMemos.date}</p>
                              <i className="fa-solid fa-trash-can"></i>
                              <i className="fa-solid fa-pen-to-square"></i>
                              <div className="important">
                                {
                                  noneGoupMemos.important ? (
                                    <img alt="important-star" src={yellowStar} />
                                  ) : (
                                    <img alt="important-star" src={star} />
                                  )
                                }
                              </div>
                              </div>
                              </div>
                        })
                    }
                </div>
                <div className="select-bottom">
                    <button className="add-memo" onClick={() => {
                        dispatch(addGroupMemo([currentGroup.id, currentGroup.color]));
                        dispatch(setSelectModal(false));
                    }}>add</button>
                    <button className="cancel" onClick={() => {
                        dispatch(setSelectModal(false));
                    }}>cancel</button>
                </div>
            </div>

            <div className="select-container-out" onClick={() => {
                console.log("dd")
            }}></div>
        </div>
    )
};

export default SelectGroupMemo;