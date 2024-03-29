import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMemo } from "../store";
import ReactQuill from "react-quill";
import axios from "axios";
import spinner from "../imgs/Rolling-1s-200px.gif"
import "react-quill/dist/quill.snow.css";
import "./write.css";

const WritePage = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setsubTitle] = useState("");
  const [content, setContent] = useState("");
  const [loding, setLoding] = useState(false);
  const quillRef = useRef();
  let dispatch = useDispatch();
  let navigates = useNavigate();

  const imageHandler = () => {
    // 이미지 삽입 할 input 생성.
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files[0];
      const formData = new FormData();
      // formData는 키-밸류 구조.
      formData.append("img", file);
      try {
        setLoding(true);
        const result = await axios.post("http://localhost:8080/img", formData);
        console.log("result", result);
        if(result) {
          setLoding(false);
        }
        const IMG_URL = result.data.url;

        // useRef를 사용해 선택된 에디터를 가져옴.
        // getSelection 으로 useRef에 선택된 에디터 영역을 가져옴.
        // insertEmbed : quill 에디터 함수. 이미지 삽입에 사용.
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, "image", IMG_URL);
      } catch (error) {
        console.log("이미지 업로드 실패", error);
        setLoding(true);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "image",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

    let newMemo = {
      id : Date.now(),
      title : title,
      subTitle : subTitle,
      content : content,
      date : date,
      important : false
    }

    dispatch(addMemo(newMemo));
    
    alert("생성되었습니다.");
    navigates('/');
  };

  return (
    // 메모 태그
    // 파일 첨부
    <div className="writepage">
      <h2>Addmemo</h2>
      <div className="write-container">
        <div className="inputs">
        <input type="text" name="title" placeholder="Title" onChange={(e) => {setTitle(e.target.value)}}></input>
        <input type="text" name="subTitle" placeholder="Memo Description" onChange={(e) => {setsubTitle(e.target.value)}}></input>
        </div>
        <div className="editor">
          <ReactQuill
            value={content}
            modules={modules}
            formats={formats}
            ref={quillRef}
            onChange={setContent}
            style={{
              height : "100%"
            }}
          />
          {
            loding ? (
              <div style={{
                width : "150px",
                height : "100px",
                position : "relative",
                top: "-50%",
                left : "50%",
                transform : "translate(-40%, -10%)",
                textAlign : "center"
              }}>
                <p>uploading...</p>
                <img style={{
                  width : "100px",
                  backgroundSize : "cover"
                }} src={spinner} alt="로딩중"/>
              </div>
            ) : null
          }
        </div>
        <button className="submit" onClick={handleSubmit}>submit</button>
      </div>
    </div>
  );
};

export default WritePage;
