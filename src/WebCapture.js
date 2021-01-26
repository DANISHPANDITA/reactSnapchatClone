import React from "react";
import "./WebCapture.css";
import Webcam from "react-webcam";
import { RadioButtonUncheckedRounded } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { setImage } from "./features/imageSlice";
import { Link } from "react-router-dom";
function WebCapture() {
  const dispatch = useDispatch();
  const webcamRef = React.useRef(null);
  const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
  };
  const capture = React.useCallback(() => {
    const imageRef = webcamRef.current.getScreenshot();
    dispatch(setImage(imageRef));
  }, [webcamRef, dispatch]);

  return (
    <div className="WebCapture">
      <Webcam
        className="WebCam"
        audio={false}
        width={videoConstraints.width}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        height={videoConstraints.height}
        videoConstraints={videoConstraints}
      />
      <Link to="/preview">
        <RadioButtonUncheckedRounded
          className="CaptureButton"
          onClick={capture}
        />
      </Link>
    </div>
  );
}

export default WebCapture;
