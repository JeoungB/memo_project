import { useLayoutEffect, useState } from "react";
import WritePage from "./writePage";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import noneMemo from "../imgs/not-group.png";
import "../css/ModifyPage.css";

const ModifyPage = () => {
  const [nonePage, setNonePage] = useState(false);
  const memoList = useSelector((state) => state.memo);
  let { id } = useParams();

  let currentMemo = memoList.find((memoList) => memoList.id == id);

  useLayoutEffect(() => {
    if (currentMemo === undefined) {
      setNonePage(true);
    }

    if (currentMemo !== undefined) {
      setNonePage(false);
    }
  }, [id]);

  return (
    <div className="modify">
      {nonePage ? (
        <div className="none-page">
          <img src={noneMemo} alt=" 존재하지 않는 메모" />
          <p
            style={{ fontSize: "26px", fontWeight: "600", marginBottom: "5px" }}
          >
            해당 메모는 존재하지 않습니다
          </p>
          <p style={{ fontSize: "20px" }}>올바른 주소로 돌아가 주세요.</p>
        </div>
      ) : (
        <WritePage id={id} currentMemo={currentMemo} />
      )}
    </div>
  );
};

export default ModifyPage;
