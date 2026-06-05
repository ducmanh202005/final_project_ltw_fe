import './App.css';

import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import { useState } from 'react';
import Comment from './components/Comment';
import Login from './components/Login';
const App = (props) => {
  const [advance,setAdvance]=useState(false)
  const [log,setLog]=useState(()=>{
  try {
    const save = localStorage.getItem("user");
    return save ? JSON.parse(save) : null;
  } catch (e) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
  }
  })
  return (
      <Router>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar advance={advance} setAdvance={setAdvance} log={log} setLog={setLog}/>
            </Grid>
            <div className="main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="main-grid-item">
               {log && <UserList />}
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="main-grid-item">
                <Routes>
                  <Route
                      path="/users/:userId"
                      element = {log ?<UserDetail /> : <Navigate to="/login"/>}
                  />
                  <Route
                      path="/photos/:userId"
                      element = {log ? <UserPhotos advance={advance} /> :<Navigate to="/login"/>}
                  />
                  <Route path="/users" element={log?<UserList />:<Navigate to="/login"/>} />
                  <Route path='/comments/:userId' element={log?<Comment/>:<Navigate to="/login"/>}/>
                  <Route path='/login' element={<Login setLog={setLog}/>}/>
                </Routes>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Router>
  );
}

export default App;
