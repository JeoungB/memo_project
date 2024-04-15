import "../css/SelectGroupMemo.css";
import "../mediaCss/SelectGroupMedia.css";
import { useDispatch, useSelector } from "react-redux";
import star from "../imgs/star2.png";
import yellowStar from "../imgs/yellow-star.png";
import checkIcon from "../imgs/check-icon.png";
import { addGroupMemo, checkMemo, setSelectModal, canleCheck } from "../store";
import { useParams } from "react-router-dom";

const SelectGroupMemo = () => {
  const memoList = useSelector((state) => state.memo);
  const groupMemo = useSelector((state) => state.groupMemo);
  const darkMode = useSelector((state) => state.darkMode);
  let { id } = useParams();
  let dispatch = useDispatch();

  let currentGroup = groupMemo.find((groupMemo) => groupMemo.id == id);
  let noneGoupMemos = memoList.filter((memoList) => memoList.group === "");

  return (
    <div className="select-groupmemo">
      <div
        className="select-modal"
        style={{
          backgroundColor: darkMode ? "#2B2B2B" : "white",
          border: darkMode ? "black" : "",
        }}
      >
        <div className="select-contents">
          {noneGoupMemos.map((noneGoupMemos) => {
            return (
              <div
                className="content-container select-container"
                style={{
                  backgroundColor: darkMode
                    ? "rgba(216, 216, 216, 0.123)"
                    : "white",
                }}
                key={noneGoupMemos.id}
                onClick={() => {
                  dispatch(checkMemo(noneGoupMemos.id));
                }}
              >
                <div className="content select">
                  {noneGoupMemos.check ? (
                    <div className="check">
                      <img src={checkIcon} alt="체크 이미지" />
                    </div>
                  ) : null}
                  <div className="memo-color"></div>
                  <h2>{noneGoupMemos.title}</h2>
                  <div
                    className="subtitle"
                    style={{
                      backgroundColor: darkMode
                        ? "gray"
                        : "rgba(167, 166, 166, 0.373)",
                      display: noneGoupMemos.subTitle ? "" : "none",
                    }}
                  >
                    {noneGoupMemos.subTitle}
                  </div>
                </div>
                <div className="memo-menu select-memo-menu">
                  <p style={{ color: darkMode ? "white" : "gray" }}>
                    {noneGoupMemos.date}
                  </p>
                  {
                    noneGoupMemos.modify ? (
                      <p style={{fontSize : '14px'}}>수정됨</p>
                    ) : null
                  }
                  <i className="fa-solid fa-trash-can"></i>
                  <i className="fa-solid fa-pen-to-square"></i>
                  <div className="important">
                    {noneGoupMemos.important ? (
                      <img alt="important-star" src={yellowStar} />
                    ) : darkMode ? (
                      <i className="fa-solid fa-star"></i>
                    ) : (
                      <img alt="important-star" src={star} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="select-bottom"
          style={{ backgroundColor: darkMode ? "#2B2B2B" : "white" }}
        >
          <button
            className="add-memo"
            style={{
              backgroundColor: darkMode ? "transparent" : "",
              border: darkMode ? "1px solid white" : "",
              color: darkMode ? "white" : "",
            }}
            onClick={() => {
              dispatch(addGroupMemo([currentGroup.id, currentGroup.color]));
              dispatch(setSelectModal(false));
            }}
          >
            add
          </button>
          <button
            className="cancel"
            onClick={() => {
              dispatch(setSelectModal(false));
              let cancleMemo = noneGoupMemos.filter((noneGoupMemos) => {
                return (
                  noneGoupMemos.group === "" && noneGoupMemos.check === true
                );
              });
              let cancleMemoId = [];
              cancleMemo.forEach((element) => {
                cancleMemoId.push(element.id);
              });
              dispatch(canleCheck(cancleMemoId));
            }}
          >
            cancel
          </button>
        </div>
      </div>

      <div
        className="select-container-out"
        onClick={() => {
          dispatch(setSelectModal(false));
        }}
      ></div>
    </div>
  );
};

export default SelectGroupMemo;
