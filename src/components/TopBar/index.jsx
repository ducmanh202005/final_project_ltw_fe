import React from "react";
import { AppBar, Toolbar, Typography,Button} from "@mui/material";

import "./styles.css";
import { useState,useEffect } from "react";
import {Link, useLocation,useNavigate} from "react-router-dom"
/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar ({advance,setAdvance,log,setLog}) {
  const location=useLocation()
  const [text,setText]=useState('')
  const navigate=useNavigate()
  useEffect(()=>{
    try{
      const fetchData=async()=>{
             const paths=location.pathname.split('/')
      const dau=paths[1]
      const cuoi=paths[2]
      if(!cuoi){
        setText('')
        return
      }
      if(dau==='users'||dau==='photos'){
        const res=await fetch(`https://rdrvd6-8081.csb.app/api/user/${cuoi}`)
        const data=await res.json()
        if(dau==='users'){
          setText(data.first_name+" "+data.last_name)
        }
        if(dau==='photos'){
          setText('Photo of '+data.first_name+" "+data.last_name)
        }
      } 
      }
      fetchData()
    }catch(e){

    }
  },[location.pathname])
  const handleLogOut=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setLog(null)
    navigate('/login')
  }
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <div style={{display:'flex' ,justifyContent:'space-between',width:'100%'}}>
              <Typography variant="h5" color="inherit">
            b23dckh074-doducmanh
          </Typography>
          {log && <div>Hi {log.first_name+" "+log.last_name}</div>}
          {log ? (<>
          <div>
            <input type="checkbox" checked={advance} onChange={(e)=>setAdvance(!advance)}/>Advance
          </div>
          <Typography variant="h5">{text}</Typography>
          <Button variant="contained" component="label">
            UpLoad
            <input type="file" hidden onChange={()=>{handleUpLoad}}/>
          </Button>
          <Button variant="contained" onClick={handleLogOut}>Log Out</Button>
          </>
          ):(
            <>
              <Button variant="contained" component={Link} to={"/login"}>Log In</Button>
            </>
          )}

          </div>
        </Toolbar>
      </AppBar>
    );
}

export default TopBar;
