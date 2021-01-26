import {
  AccessAlarm,
  AttachFile,
  CloseRounded,
  CreateOutlined,
  InsertDriveFile,
  MusicNote,
  Title,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { resetImage, selectimage } from "./features/imageSlice";
import "./PreviewScreen.css";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "./firebase";
function PreviewScreen() {
  const [progress, setprogress] = useState(0);
  const image = useSelector(selectimage);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!image) {
      history.replace("/");
    }
  });
  const clear = () => {
    dispatch(resetImage());
  };
  const sendPic = () => {
    const id = uuidv4();
    const uploadTask = storage.ref(`photo/${id}`).putString(image, "data_url");
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setprogress(progress);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            break;
          case firebase.storage.TaskState.RUNNING:
            break;
          default:
            console.log("..");
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("photo")
          .child(id)
          .getDownloadURL()
          .then((downloadURL) => {
            db.collection("snapChat").add({
              imageUrl: downloadURL,
              Name: "Danish Pandita",
              read: false,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace("/snapList");
          });
      }
    );
  };
  return (
    <div className="Previewscreen">
      <img className="imagePreview" src={image} alt="" />
      <CloseRounded className="resetImage" onClick={clear} />
      <div className="RightTopIcons">
        <Title className="RightTopIcon" />
        <CreateOutlined className="RightTopIcon" />
        <InsertDriveFile className="RightTopIcon" />
        <MusicNote className="RightTopIcon" />
        <AttachFile className="RightTopIcon" />
        <AccessAlarm className="RightTopIcon" />
      </div>
      <button onClick={sendPic} className="sendPic">
        Send
      </button>
    </div>
  );
}

export default PreviewScreen;
