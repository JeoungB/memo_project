import HomePage from "./HomePage";
import { useSelector } from "react-redux";
import "../css/SearchPage.css";
import "../mediaCss/SearchPageMedia.css";
import notFoundIcon from "../imgs/not-found.png";

const SearchPage = () => {
  const memoList = useSelector((state) => state.memo);
  const searchDatas = useSelector((state) => state.searchMemos);

  let searchData = memoList.filter((memoList) => {
    return memoList.title.indexOf(searchDatas.value) > -1;
  });

  return (
    <div className="searchpage">
      <HomePage searchData={searchData} />
      {Array.isArray(searchData) && searchData.length === 0 ? (
        <div className="alert">
          <img
            className="search-icon"
            src={notFoundIcon}
            alt="찾을 수 없음 돋보기"
          />
          <p>해당 메모가 없습니다</p>
        </div>
      ) : null}
    </div>
  );
};

export default SearchPage;
