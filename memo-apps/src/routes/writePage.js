import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMemo } from "../store";
import { updateMemo } from "../store";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import axios from "axios";
import spinner from "../imgs/Rolling-1s-200px.gif"
import "react-quill/dist/quill.snow.css";
import "./write.css";

const WritePage = (props) => {
  const [title, setTitle] = useState("");
  const [titleWarning, setTitleWarning] = useState(false);
  const [subTitle, setsubTitle] = useState("");
  const [subtitleWarning, setSubTitleWarning] = useState(false);
  const [content, setContent] = useState("");
  const [loding, setLoding] = useState(false);
  const darkMode = useSelector((state) => state.darkMode);
  const quillRef = useRef();
  const TEXT_LENGHT = /^.{0,10}$/ 
  let dispatch = useDispatch();
  let navigates = useNavigate();

  useEffect(() => {
    if(props.currentMemo !== undefined) {
      setTitle(props.currentMemo.title);
      setsubTitle(props.currentMemo.subTitle);
      setContent(props.currentMemo.content);
    }
  }, []);



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

    if(!title.trim()) {
      setTitleWarning(true);

      return 0;
    }

    if(!title.match(TEXT_LENGHT)) {
      setTitleWarning(true);
      return 0;
    }

    if(!subTitle.match(TEXT_LENGHT)) {
      setSubTitleWarning(true);

      return 0;
    }

    let newMemo = {
      id : Date.now(),
      title : title,
      subTitle : subTitle,
      content : content,
      date : date,
      important : false,
      group : "",
      check : false,
      color : ""
    }

    dispatch(addMemo(newMemo));
    
    alert("생성되었습니다.");
    navigates('/');
  };

  const handleModify = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

    let newMemo = {
      id : Date.now(),
      title : title,
      subTitle : subTitle,
      content : content,
      date : date,
      important : false,
      group : "",
      check : false,
      color : ""
    }

    dispatch(updateMemo([props.id, newMemo]));
    
    alert("수정되었습니다.");
    navigates('/');
  };

  return (
    <div className="writepage">
      <h2>Addmemo</h2>
      <div className="write-container">
        <div className="inputs">
          {
            titleWarning ? (
              <p className="inputs-p1">*제목을 작성해 주세요 (공백X, 10자 이내)</p>
            ) : null
          }
        <input type="text" value={title} name="title" placeholder="제목을 작성해 주세요 (1 ~ 10자)" onChange={(e) => {setTitle(e.target.value)}}></input>
        {
          subtitleWarning ? (
            <p className="inputs-p2">10자 이내</p>
          ) : null
        }
        <input type="text" value={subTitle} name="subTitle" placeholder="메모에 대한 설명을 적어주세요 (0 ~ 10자)" onChange={(e) => {setsubTitle(e.target.value)}}></input>
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
        {
          props.id === undefined ? (
            <button className="submit" style={{backgroundColor : darkMode ? 'transparent' : '', border : darkMode ? '1px solid white' : '', color : darkMode ? 'white' : ''}} onClick={handleSubmit}>create</button>
          ) : (
            <button className="submit modify" style={{backgroundColor : darkMode ? 'transparent' : '', border : darkMode ? '1px solid white' : '', color : darkMode ? 'white' : ''}} onClick={handleModify}>modify</button>
          )
        }
      </div>
    </div>
  );
};

export default WritePage;
