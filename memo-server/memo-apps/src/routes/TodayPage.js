import { useSelector } from "react-redux";
import HomePage from "./HomePage";
import "../css/Today.css";
import "../mediaCss/TodayMedia.css";
import notToday from "../imgs/not-today.png";

const TodayPage = () => {
  const memoList = useSelector((state) => state.memo);
  let day = new Date();
  let today =
    day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
  let todayMemo = memoList.filter((memoList) => memoList.date === today);

  return (
    <div className="today">
      <HomePage todayMemo={todayMemo} />

      {Array.isArray(todayMemo) && todayMemo.length === 0 ? (
        <div className="alert">
          <img
            className="not-today-icon"
            src={notToday}
            alt="금일 메모 없음 아이콘"
          />
          <p>금일 생성한 메모가 없습니다.</p>
        </div>
      ) : null}
    </div>
  );
};

export default TodayPage;
