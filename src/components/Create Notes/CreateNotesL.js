import React, { useState } from "react";
import "./CreateNotesL.css";

function CreateNotesL({ groupTitlesParent, setgroupTitlesParent, onClose }) {
  const [groupTitle, setgroupTitle] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [groupTitleError, setgroupTitleError] = useState("");

  const genrategroupTitle = (e) => {
    setgroupTitle(e.target.value);
    setgroupTitleError("");
  };

  const manageColor = (e) => {
    const div = e.target;
    setBgColor(getComputedStyle(div).backgroundColor);
  };

  const saveName = () => {
    setShowErrors(true);
    if (groupTitle.trim() === "") {
      setgroupTitleError("Group name is empty");
    } 
    else{
      const newGroup = { name: groupTitle, color: bgColor };
      setgroupTitlesParent([...groupTitlesParent, newGroup]);
      localStorage.setItem("groupTitles", JSON.stringify([...groupTitlesParent, newGroup]));
      onClose();
    }
  };

  return (
    <div className="popup">
      <div className="popup_title">Create New Notes Group</div>
      <div className="popup_input">
        <span>Group Name</span>
        <input
          value={groupTitle}
          onChange={genrategroupTitle}
          type="text"
          placeholder="Enter your group name...."
        />
      </div>
            {showErrors && <p className="errorText">{groupTitleError}</p>}
      <div className="popup_choose_color">
        <span>Choose Color</span>
        <div className="popup_color">
          <div
            className={'popup_color_1'}
            onClick={manageColor}
          ></div>
          <div
            className={'popup_color_2'}
            onClick={manageColor}
          ></div>
          <div
            className={'popup_color_3'}
            onClick={manageColor}
          ></div>
          <div
            className={'popup_color_4'}
            onClick={manageColor}
          ></div>
          <div
            className={'popup_color_5'}
            onClick={manageColor}
          ></div>
          <div
            className={'popup_color_6'}
            onClick={manageColor}
          ></div>
        </div>
      </div>
      <div className="popup_close">
        <button onClick={saveName}>
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateNotesL;
