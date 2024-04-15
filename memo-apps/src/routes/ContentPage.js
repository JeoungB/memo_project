import { useNavigate, useParams } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteMemo } from "../store";
import * as DOMPurify from "dompurify";
import notContent from "../imgs/not-group.png";
import "./ContentPage.css";
import "./ContentPageMedia.css";

const ContentPage = () => {
  const [menu, setMenu] = useState(false);
  const contentRef = useRef();
  const darkMode = useSelector((state) => state.darkMode);
  const memoList = useSelector((state) => state.memo);
  const [currentItem, setCurrentItem] = useState([]);
  const [nonePage, setNonePage] = useState(false);
  let { id } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useLayoutEffect(() => {
    let currentItem = memoList.find((memo) => memo.id == id);
    if (currentItem !== undefined) {
      setCurrentItem(currentItem);
      setNonePage(false);
    }

    if (currentItem === undefined) {
      setNonePage(true);
    }
  }, [id, memoList]);

  return (
    <div
      className="ContentPage"
      onClick={(e) => {
        if (e.target !== contentRef.current) {
          setMenu(false);
        }
      }}
    >
      {nonePage ? (
        <div className="none-content">
          <img src={notContent} alt="존재하지 않는 메모" />
          <p className="none-text">해당 메모는 존재하지 않습니다</p>
          <p>올바른 주소로 돌아가 주세요.</p>
        </div>
      ) : (
        <div className="main-content">
          <h2>{currentItem.title}</h2>
          <div className="tag">
            <p>{currentItem?.subTitle}</p>
            <div className="menu-container">
              <p
                className="menu-icon"
                style={{ color: darkMode ? "white" : "" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setMenu(!menu);
                }}
              >
                . . .
              </p>
              {menu ? (
                <>
                  <div className="menu">
                    <p
                      className="delete"
                      onClick={(e) => {
                        let result =
                          window.confirm("해당 메모를 삭제하시겠습니까?");
                        if (result) {
                          dispatch(deleteMemo(currentItem.id));
                          alert("삭제됨");
                          navigate("/");
                        }
                        if (!result) {
                          alert("취소됨");
                          setMenu(false);
                        }
                      }}
                    >
                      삭제
                    </p>

                    <p
                      className="modify"
                      onClick={() => {
                        navigate(`/modify/${currentItem.id}`);
                      }}
                    >
                      수정
                    </p>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div
            className="viwer"
            style={{
              border: darkMode ? "1px solid white" : "1px solid black",
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(currentItem.content),
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ContentPage;
