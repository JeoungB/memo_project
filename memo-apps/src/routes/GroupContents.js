import './GroupContents.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import noneMemo from '../imgs/none-memo.png';
import { allDeleteGroupMemo, setSelectModal } from '../store';
import yellowStar from "../imgs/yellow-star.png";
import star from "../imgs/star2.png";
import { importantMemo } from "../store";
import { deleteGroupMemo } from '../store';
import { deleteGroup } from '../store';
import { useState } from 'react';

const GroupContents = () => {

    const groupMemo = useSelector((state) => state.groupMemo);
    const selectModal = useSelector((state) => state.selectModal);
    const memoList = useSelector((state) => state.memo);
    const darkMode = useSelector((state) => state.darkMode);
    const [menubar, setmenubar] = useState(false);
    let {id} = useParams();
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const handleImportant = (id) => {
      dispatch(importantMemo(id));
    }

    let currentGroup = groupMemo.find((groupMemo) => groupMemo.id == id);
    let groupMemos = memoList.filter((memoList) => memoList.group === currentGroup.id);

    return(
        <div className="groupcontents">
            <div className="main">
                  <h2>{currentGroup.title}</h2>
                  <div className="tag">
                    <p>{currentGroup.subTitle}</p>
                    <div className='addmemo group-menus' style={{color : darkMode ? 'white' : ''}} onClick={() => {setmenubar(!menubar)}}> . . .
                    {
                      menubar ? (
                        <div className='menus-container'>
                        <div className="addmemo group-addmemo" onClick={(e) => {
                          dispatch(setSelectModal(true));
                        }}>메모 추가</div>
                        <div className="addmemo delete-group" onClick={(e) => {
                          let result = window.confirm(`${currentGroup.title} 그룹을 삭제하시겠습니까?`);
                          if(result) {
                            navigate('/');
                           dispatch(deleteGroup(currentGroup.id));
                          dispatch(allDeleteGroupMemo(currentGroup.id));
                          }
                        }}>그룹 삭제</div>
                        </div>
                      ) : null
                    }
                    </div>
                  </div>

                  <div className="content-box">
                    {
                      Array.isArray(groupMemos) && groupMemos.length === 0 ? (
                        
                  <div className='contents'>
                  <img src={noneMemo} alt='메모 없음' />
                <p>그룹에 대한 메모가 없어요</p>
                <p>메모를 추가해 보세요!</p>
                <button className='addgroup-memo' onClick={() => {
                  dispatch(setSelectModal(!selectModal));
                }}>그룹에 메모 추가하기</button>
                </div>
                      ) : (
                        groupMemos?.map((groupMemos) => {
                          return <div className="content-container" key={groupMemos.id}>
                          <div className="content" style={{backgroundColor : darkMode ? 'rgba(216, 216, 216, 0.123)' : ''}} onClick={() => {
                            navigate(`/content/${groupMemos.id}`)}}>
                            <div className="memo-color" style={{backgroundColor : `${groupMemos.color}`}}></div>
                            <h2>{groupMemos.title}</h2>
                            <p className='group-out' onClick={(e) => {
                              e.stopPropagation();
                              let result = window.confirm(`${groupMemos.title} 메모를 ${currentGroup.title}에서 삭제하시겠습니까?`);
                              if(result) {
                                dispatch(deleteGroupMemo(groupMemos.id));
                              }
                            }}>
                              <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            </p>
                            <div className="subtitle">{groupMemos.subTitle}</div>
                            </div>
                            <div className="memo-menu">
                            <p>{groupMemos.date}</p>
                            <i className="fa-solid fa-trash-can"></i>
                            <i className="fa-solid fa-pen-to-square"></i>
                            <div className="important">
                              {
                                groupMemos.important ? (
                                  <img alt="important-star" src={yellowStar} onClick={(e) => {
                                    e.stopPropagation();
                                    handleImportant(groupMemos.id)}}/>
                                ) : (
                                  darkMode ? (
                                    <i className="fa-solid fa-star" onClick={(e) => {
                                      e.stopPropagation();
                                      handleImportant(memoList.id)}}></i>
                                  ) : (
                                    <img alt="important-star" src={star} onClick={(e) => {
                                      e.stopPropagation();
                                      handleImportant(groupMemos.id)}}/>
                                  )
                                )
                              }
                            </div>
                            </div>
                            </div>
                        })
                      )
                      
                    }
                  </div>
                </div>
        </div>
    )
};

export default GroupContents;