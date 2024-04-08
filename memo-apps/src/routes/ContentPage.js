import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteMemo } from "../store";
import * as DOMPurify from "dompurify";
import "./ContentPage.css";

const ContentPage = () => {

    const [menu, setMenu] = useState(false);
    const contentRef = useRef();
    let memoList = useSelector((state) => state.memo);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let {id} = useParams();

    let currentItem = memoList.find((memo) => memo.id == id);

    return(
        <div className="ContentPage" onClick={(e) => {
          if(e.target !== contentRef.current) {
            setMenu(false)
          }
        }}>
              <div className="main-content">
                    <h2>{currentItem.title}</h2>
                    <div className="tag">
                      <p>{currentItem?.subTitle}</p>
                      <div className="menu-container">
                        <p className="menu-icon" onClick={(e) => {
                          e.stopPropagation();
                          setMenu(!menu)
                        }}>. . .</p>
                        {
                          menu ? (
                            <>
                            <div className="menu">
                            <p className="delete" onClick={(e) => {
                            let result = window.confirm("해당 메모를 삭제하시겠습니까?");
                            if(result) {
                              dispatch(deleteMemo(currentItem.id));
                              alert("삭제됨");
                              navigate('/');
                            }
                            if(!result) {
                              alert("취소됨");
                              setMenu(false);
                            }
                            }}>삭제</p>

                            <p className="modify" onClick={() => {
                              navigate(`/modify/${currentItem.id}`);
                            }}>수정</p>
                        </div>
                            </>
                          ) : null
                        }
                      </div>
                    </div>
                    <div className="viwer"
                    style={{width : "59vw", height : "55vh", border : "1px solid black", marginTop : "30px"}} 
                    dangerouslySetInnerHTML={{__html : DOMPurify.sanitize(currentItem.content)}}>
                    </div>
                  </div>
          </div>
    )
};

export default ContentPage;