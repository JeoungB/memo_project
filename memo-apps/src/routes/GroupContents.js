import './GroupContents.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import noneMemo from '../imgs/none-memo.png';
import { setSelectModal } from '../store';
import yellowStar from "../imgs/yellow-star.png";
import star from "../imgs/star2.png";
import gropOutIcon from "../imgs/group-out.png";
import { importantMemo } from "../store";

const GroupContents = () => {

    const groupMemo = useSelector((state) => state.groupMemo);
    const selectModal = useSelector((state) => state.selectModal);
    const memoList = useSelector((state) => state.memo);
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
                    <p className="addmemo" onClick={() => {
                      dispatch(setSelectModal(true));
                    }}>+ Add Group</p>
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
                          <div className="content" onClick={() => {navigate(`/content/${groupMemos.id}`)}}>
                            <div className="memo-color" style={{backgroundColor : `${groupMemos.color}`}}></div>
                            <h2>{groupMemos.title}</h2>
                            <p className='group-out' onClick={(e) => {
                              e.stopPropagation();
                              let result = window.confirm("메모를 그룹에서 삭제하시겠습니까?");
                              if(result) {
                                console.log("그룹에서 삭제")
                              }
                            }}>
                              <img src={gropOutIcon} alt='그룹에서 삭제' />
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
                                  <img alt="important-star" src={yellowStar} onClick={() => {handleImportant(groupMemos.id)}}/>
                                ) : (
                                  <img alt="important-star" src={star} onClick={() => {handleImportant(groupMemos.id)}}/>
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