import { useEffect, useRef, useState } from "react";
import "./AddProject.css";
import { ChromePicker } from 'react-color';

const AddProject = () => {

    const [color, setColor] = useState('#ffffff');
    const [modal, setModal] = useState(false);
    // 이거는 사이드 바에서 만들어서 여기로 props로 넘겨줘야겠다.
    const [colorModal, setColorModal] = useState(false);
    const projectRef = useRef();

    const handleChangeComplete = (color) => {
        setColor(color.hex);
    }

  return (
    <div className="AddProject">
        {
            modal
        }
      <div className="modal">
      <h1>new project</h1>
      <div style={{backgroundColor : `${color}`}} className="project-tag" onClick={() => {
        setColorModal(!colorModal);
      }}></div>

      {
        colorModal ? (<div className="color">
        <ChromePicker color={color} onChangeComplete={handleChangeComplete}/>
        </div>) : null
      }
        <p className="modal-p1"><span>*</span>프로젝트 제목을 적어주세요</p>
        <input className="project-title" type="text" name="title" placeholder="Title"></input>

        <p className="modal-p2">프로젝트의 간단한 설명을 적어주세요 (0 ~ 10자)</p>
        <input className="sub-title" type="text" name="sub-title" placeholder="subTitle"></input>

        <div className="buttons">
        <button className="create">create</button>
        <button className="cancel" onClick={() => {
            setModal(false);
        }}>cancel</button>
        </div>
      </div>
      <div className="modal-containers"></div>
    </div>
  );
};

export default AddProject;
