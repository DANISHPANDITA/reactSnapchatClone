import { Avatar } from "@material-ui/core";
import { StopRounded } from "@material-ui/icons";
import React from "react";
import "./SnapRow.css";
import ReactTimeago from "react-timeago";
import { useDispatch } from "react-redux";
import { openImage } from "./features/appSlice";
import { db } from "./firebase";
import { useHistory } from "react-router";
function SnapRow({ id, name, profilePic, read, timestamp, image }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const openSnap = () => {
    if (!read) {
      dispatch(openImage(image));
      db.collection("snapChat").doc(id).set({ read: true }, { merge: true });
    }
    history.replace("/chatview");
  };
  return (
    <div className="SnapRow" onClick={openSnap}>
      <div className="Snap">
        <Avatar className="snapRowAvatar" src={profilePic} alt="" />
        <div className="details">
          <h5>{name}</h5>
          <p>
            {!read && <p>Tap To view</p>}
            {
              <ReactTimeago
                date={new Date(timestamp?.toDate()).toUTCString()}
              />
            }
          </p>
        </div>
      </div>
      {!read && <StopRounded className="newSnapSymbol" />}
    </div>
  );
}

export default SnapRow;
