import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Chat from "./Chat";
import { login, logout, selectUser } from "./features/appSlice";
import { auth } from "./firebase";
import Login from "./Login";
import PreviewScreen from "./PreviewScreen";
import SnapList from "./SnapList";
import WebCapture from "./WebCapture";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            email: authUser.email,
            photo: authUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  });
  return (
    <div className="App">
      <img
        className="snapchatLogo"
        src="https://www.adlibweb.com/wp-content/uploads/2019/01/1472577598_119719_1472577690_noticia_normal.jpg"
        alt="image"
      />
      <Router>
        <Switch>
          <Route path="/chatview">
            <Chat />
          </Route>
          <Route exact path="/snaplist">
            <SnapList />
          </Route>
          <Route path="/preview">
            <PreviewScreen />
          </Route>
          <Route exact path="/">
            {!user ? <Login /> : <WebCapture />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
