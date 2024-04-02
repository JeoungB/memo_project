import { useSelector } from "react-redux";
import HomePage from "./HomePage";
import "./Today.css";

const TodayPage = () => {

    const memoList = useSelector((state) => state.memo);
    let day = new Date();
    let today = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDay();
    let todayMemo = memoList.filter((memoList) => memoList.date === today);

    return(
        <div className="today">
            <HomePage todayMemo={todayMemo} />
        </div>
    )
};

export default TodayPage;