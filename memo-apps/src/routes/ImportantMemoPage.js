import HomePage from "./HomePage";
import { useSelector } from "react-redux";
import './ImportantMemoPage.css';

const ImportantMemoPage = () => {

    const memoList = useSelector((state) => state.memo);
    let importantMemos = memoList.filter((memoList) => memoList.important === true);

    return(
        <div className="important-memo-page">
            <HomePage importantMemos={importantMemos} />

            {
                Array.isArray(importantMemos) && importantMemos.length === 0 ?
                    <div className="alert">중요 메모가 없습니다.</div> : null
            }
        </div>
    )
};

export default ImportantMemoPage;