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

            {
                Array.isArray(todayMemo) && todayMemo.length === 0 ? 
                    <div className="alert">금일 생성한 메모가 없습니다.</div>
                 : null
            }
        </div>
    )
};

export default TodayPage;