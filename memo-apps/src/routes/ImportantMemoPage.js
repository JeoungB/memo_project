import HomePage from "./HomePage";
import { useSelector } from "react-redux";
import './ImportantMemoPage.css';

const ImportantMemoPage = () => {

    const memoList = useSelector((state) => state.memo);
    let importantMemos = memoList.filter((memoList) => memoList.important === true);

    return(
        <div className="important-memo-page">
            <HomePage importantMemos={importantMemos} />
        </div>
    )
};

export default ImportantMemoPage;