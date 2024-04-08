import { useEffect, useState } from "react";
import "./AddProject.css";
import { ChromePicker } from 'react-color';
import { useDispatch } from "react-redux";
import { addGroup, setModal } from "../store";
import paletteIcon from "../imgs/palette-icon.png";

const AddProject = () => {

    const [title, setTitle] = useState("");
    const [titleWarning, setTitleWarning] = useState(false);
    const [subTitle, setSubTitle] = useState("");
    const [subtitleWarning, setSubTitleWarning] = useState(false);
    const [color, setColor] = useState('#');
    const [notification, setNotification] = useState(true);
    const [colorModal, setColorModal] = useState(false);
    const TEXT_LENGHT = /^.{0,20}$/ 
    let dispatch = useDispatch();

    const createNewGroup = () => {

      if(!title.trim()) {
        setTitleWarning(true);
        return 0;
      };

      if(!title.match(TEXT_LENGHT)) {
        setTitleWarning(true);
        return 0;
      };

      if(!subTitle.match(TEXT_LENGHT)) {
        setSubTitleWarning(true);
        return 0;
      }

      let newGroup = {
        id : Date.now(),
        title : title,
        subTitle : subTitle,
        color : color
      };

      dispatch(addGroup(newGroup));
      dispatch(setModal(false));
    };

    const handleChangeComplete = (color) => {
        setColor(color.hex);
    };

    useEffect(() => {
      if(color === '#') {
        setNotification(true);
      }
      if(color !== '#') {
        setNotification(false);
      }
    }, [color]);

  return (
    <div className="AddProject">
      <div className="modal">
      <h1>new group</h1>
      <div style={{backgroundColor : `${color}`}} className="project-color-tag" onClick={() => {
        setColorModal(!colorModal);
      }}>
        {
          notification ? (
            <div className="palette">
            <img src={paletteIcon} alt="팔레트 아이콘" />
            </div>
          ) : null
        }
      </div>

      {
        colorModal ? (<div className="color">
        <ChromePicker color={color} onChangeComplete={handleChangeComplete}/>
        </div>) : null
      }

      {
        titleWarning ? (
          <p className="modal-p1"><span>*</span>그룹 제목을 작성해주세요 (공백X, 20자 이내)</p>
        ) : null
      }
        <input className="project-title" type="text" name="title" placeholder="&nbsp;&nbsp;&nbsp;그룹 제목을 적어주세요 (0 ~ 20자)"
        onChange={(e) => {
          setTitle(e.target.value);
        }}></input>
        {
          subtitleWarning ? (
            <p className="modal-p2">20자 이내로 작성해주세요</p>
          ) : null
        }
        <input className="sub-title" type="text" name="sub-title" placeholder="&nbsp;&nbsp;&nbsp;그룹의 간단한 설명을 적어주세요 (0 ~ 20자)" onChange={(e) => {
          setSubTitle(e.target.value);
        }}></input>

        <div className="buttons">
        <button className="create" onClick={() => {createNewGroup()}}>create</button>
        <button className="cancel" onClick={() => {
                    dispatch(setModal(false));
        }}>cancel</button>
        </div>
      </div>
      
      <div className="modal-containers" onClick={() => {
        dispatch(setModal(false));
      }}></div>
    </div>
  );
};

export default AddProject;
