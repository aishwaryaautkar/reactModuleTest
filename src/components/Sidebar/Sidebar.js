import React, { useEffect, useState, useRef} from "react";
import "./Sidebar.css";
import CreateNotes from "../Create Notes/CreateNotesL";
import LNotesTitle from "../Notes Title/LNotesTitle";

function Sidebar() {
  const [titles, setTitles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [groupTitlesParent, setgroupTitlesParent] = useState(
    JSON.parse(localStorage.getItem("groupTitles")) || []
  );

  useEffect(() => {
    const data = localStorage.getItem("groupTitles");
    if (data) {
      setgroupTitlesParent(JSON.parse(data));
    } else {
      setgroupTitlesParent([]);
    }
  }, []);

  useEffect(() => {
    if (groupTitlesParent.length > 0) {
      const obj = JSON.parse(localStorage.getItem("groupTitles"));
      const result = Object.keys(obj).map((key) => [obj[key]]);
      setTitles(result);
    }
  }, [groupTitlesParent]);

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return() =>{
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showPopup]);

  return (
    <div className="sidebar">
      <div className="sidebar_title">Pocket Notes</div>
      <div className="sidebar_create_notes_btn">
        
        <button onClick={handleClick}>
          <span id="add">+</span>
          
        </button>
      </div>
      <div className="sidebar_note_titles">
        {titles.length > 0 ? (
          titles.map((title, index) => <LNotesTitle key={index} title={title} />)
        ) : (
          <div>
          </div>
        )}
      </div>
      {showPopup && (
        <div className="popup_overlay">
          <div ref={popupRef}>
            <CreateNotes
              groupTitlesParent={groupTitlesParent}
              setgroupTitlesParent={setgroupTitlesParent}
              onClose={handleClose}
            />
            </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
