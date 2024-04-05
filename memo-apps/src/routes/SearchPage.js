import HomePage from "./HomePage";
import { useSelector } from "react-redux";
import './SearchPage.css';

const SearchPage = () => {

    const memoList = useSelector((state) => state.memo);
    const searchDatas = useSelector((state) => state.searchMemos);

    let searchData = memoList.filter((memoList) => {
        return memoList.title.indexOf(searchDatas.value) > -1;
    });

    return(
        <div className="searchpage">
            <HomePage searchData={searchData} />
            {
                Array.isArray(searchData) && searchData.length === 0 ? (
                    <div className="alert">"{searchDatas.value}" 에 대한 메모가 없어요!</div>
                ) : null
            }
        </div>
    )
};

export default SearchPage;