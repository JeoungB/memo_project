import { useParams } from "react-router-dom";
import HomePage from "./HomePage";
import { useSelector } from "react-redux";

const SearchPage = () => {

    const memoList = useSelector((state) => state.memo);
    const searchDatas = useSelector((state) => state.searchMemos);

    let searchData = memoList.filter((memoList) => {
        return memoList.title.indexOf(searchDatas.value) > -1;
    });

    // 이제 검색 페이지에 데이터 넘겨줘서 쓰면 됨.
    // 검색 창에서 엔터 치면 검색되는것도

    return(
        <div className="searchpage">
            <HomePage title="search" />
        </div>
    )
};

export default SearchPage;