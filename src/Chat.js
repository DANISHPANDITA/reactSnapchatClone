import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./Chat.css";
import { closeImage, ImageOpen } from "./features/appSlice";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
function Chat() {
  const selectImage = useSelector(ImageOpen);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectImage) {
      alert("Already Viewed");
      exit();
    }
  });
  const exit = () => {
    dispatch(closeImage(selectImage));
    history.replace("/snaplist");
  };
  return (
    <div className="chatScreen">
      <div className="chatTimer">
        {" "}
        <CountdownCircleTimer
          isPlaying
          duration={10}
          size={40}
          strokeWidth={6}
          colors={[
            ["#004777", 0.33],
            ["#F7B801", 0.33],
            ["#A30000", 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            } else {
              return remainingTime;
            }
          }}
        </CountdownCircleTimer>
      </div>

      <img src={selectImage} alt="Couldn't Load.." onClick={exit} />
    </div>
  );
}

export default Chat;
