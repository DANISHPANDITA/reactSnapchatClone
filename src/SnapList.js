import { Avatar } from "@material-ui/core";
import {
  ModeCommentRounded,
  RadioButtonUncheckedRounded,
  SearchRounded,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUser } from "./features/appSlice";
import { auth, db } from "./firebase";
import "./SnapList.css";
import SnapRow from "./SnapRow";

function SnapList() {
  const [Snaps, setSnaps] = useState([]);

  const user = useSelector(selectUser);
  const history = useHistory();

  const handleLogout = () => {
    // eslint-disable-next-line no-restricted-globals
    var r = confirm("Confirm Logout");
    if (r) {
      auth.signOut();
      history.push("/");
    }
  };
  useEffect(() => {
    db.collection("snapChat")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setSnaps(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            snap: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className="snaplist">
      <div className="snapListTop">
        <Avatar
          src={user?.photo}
          alt=""
          className="avatarSnap"
          onClick={handleLogout}
        />
        <div className="InputSearch">
          <SearchRounded className="searchIcon" />
          <input autoFocus type="text" placeholder="Search For Friend." />
        </div>
        <ModeCommentRounded className="messageTopIcon" />
      </div>

      <div className="snapPeopleRow">
        {Snaps.map(({ id, snap }) => (
          <SnapRow
            key={id}
            id={id}
            name={snap.Name}
            profilePic={user?.photo}
            read={snap.read}
            timestamp={snap.timestamp}
            image={snap.imageUrl}
          />
        ))}
      </div>
      <RadioButtonUncheckedRounded
        className="GoToWebCam"
        onClick={() => history.push("/")}
      />
    </div>
  );
}

export default SnapList;
