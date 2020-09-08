import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login/Login";
import { useStateValue } from "./ContextAPI/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Switch>
              <Route path="/rooms/:roomId" component={Chat} />
              <Route path="/" component={Sidebar} />
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
