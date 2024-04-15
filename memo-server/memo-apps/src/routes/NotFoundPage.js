import { useEffect, useState } from "react";
import nonePage from "../imgs/404.png";
import "../css/NotFoundPage.css";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const [count, setCount] = useState(5);
  let navigate = useNavigate();

  useEffect(() => {
    setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      setTimeout(() => {});
    };
  }, []);

  return (
    <div className="notfoundpage">
      <div className="container">
        <img
          className="none-page-icon"
          src={nonePage}
          alt="없는 페이지 이미지"
        />
        <p className="none-text">존재하지 않는 페이지</p>
        <p style={{ fontSize: "20px" }}>{count}초 후 메인 페이지로 돌아가요</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
