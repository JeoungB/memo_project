import HomePage from "./HomePage";
import { useSelector } from "react-redux";
import "../css/ImportantMemoPage.css";
import "../mediaCss/ImportantMemoPageMedia.css";
import notImportant from "../imgs/not-important.png";

const ImportantMemoPage = () => {
  const memoList = useSelector((state) => state.memo);
  let importantMemos = memoList.filter(
    (memoList) => memoList.important === true
  );

  return (
    <div className="important-memo-page">
      <HomePage importantMemos={importantMemos} />

      {Array.isArray(importantMemos) && importantMemos.length === 0 ? (
        <div className="alert">
          <img
            className="not-important"
            src={notImportant}
            alt="중요 메모 없음 아이콘"
          />
          <p>중요 메모가 없습니다</p>
        </div>
      ) : null}
    </div>
  );
};

export default ImportantMemoPage;
