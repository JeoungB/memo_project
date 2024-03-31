import { useEffect, useState } from "react";
import WritePage from "./writePage";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ModifyPage = () => {

    const [pages, setPages] = useState(true);
    const memoList = useSelector((state) => state.memo);
    let {id} = useParams();

    let currentMemo = memoList.find((memoList) => memoList.id == id);


    return(
        <div className="modify">
            <WritePage id={id} currentMemo={currentMemo} />
        </div>
    )
};

export default ModifyPage;