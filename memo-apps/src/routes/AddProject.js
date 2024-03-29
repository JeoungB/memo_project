import { useEffect, useState } from "react";
import "./AddProject.css";
import { ChromePicker } from 'react-color';
import { useDispatch, useSelector  } from "react-redux";
import { addGroup, setModal } from "../store";

const AddProject = () => {

    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [color, setColor] = useState('#');
    const [notification, setNotification] = useState(true);
    const [colorModal, setColorModal] = useState(false);
    const [modalAnimation, setModalAnomation] = useState("fadeout");
    let modalState = useSelector((state) => state.modal);
    let dispatch = useDispatch();

    useEffect(() => {

      if(modalState === true) {
        setModalAnomation("fadein");
      }
    }, [colorModal]);

    const createNewGroup = () => {

      let newGroup = {
        id : Date.now(),
        title : title,
        subTitle : subTitle,
        color : color
      }

      dispatch(addGroup(newGroup));
    };

    const handleChangeComplete = (color) => {
        setColor(color.hex);
    }

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
      <div className={`modal + ${modalAnimation}`}>
      <h1>new group memo</h1>
      <div style={{backgroundColor : `${color}`}} className="project-color-tag" onClick={() => {
        setColorModal(!colorModal);
      }}>
        {
          notification ? (
            <div className="notification">Check Group Color!
            <div className="point"></div>
          </div>
          ) : null
        }
      </div>

      {
        colorModal ? (<div className="color">
        <ChromePicker color={color} onChangeComplete={handleChangeComplete}/>
        </div>) : null
      }
        <p className="modal-p1"><span>*</span>그룹 제목을 적어주세요</p>
        <input className="project-title" type="text" name="title" placeholder="   Title" onChange={(e) => {
          setTitle(e.target.value);
        }}></input>

        <p className="modal-p2">그룹의 간단한 설명을 적어주세요 (0 ~ 10자)</p>
        <input className="sub-title" type="text" name="sub-title" placeholder="   subTitle" onChange={(e) => {
          setSubTitle(e.target.value);
        }}></input>

        <div className="buttons">
        <button className="create" onClick={() => {createNewGroup()}}>create</button>
        <button className="cancel" onClick={() => {
                    setModalAnomation("fadeout");
                    setTimeout(() => {
                      dispatch(setModal(false));
                    }, 500);
        }}>cancel</button>
        </div>
      </div>
      
      <div className="modal-containers" onClick={() => {
        setModalAnomation("fadeout");
        setTimeout(() => {
          dispatch(setModal(false));
        }, 500);
      }}></div>
    </div>
  );
};

export default AddProject;
