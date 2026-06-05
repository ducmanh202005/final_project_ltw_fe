import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemButton,
  Chip,
  Stack,
} from "@mui/material";
import {useState,useEffect} from"react";
import "./styles.css";
import models from "../../modelData/models";
import { Link } from "react-router-dom";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList () {
  const [users,setUsers]=useState([])
  const [err,setErr]=useState('')
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const res=await fetch('https://rdrvd6-8081.csb.app/api/user/list')
        const data=await res.json()
        setUsers(data)
      }catch(e){
        setErr(e.message)
      }
    }
    fetchData()
  },[])
    return (
      <div>
        {err && <p>{err}</p>}
        <List component="nav">
          {users.map((item) => (
            <>
              <ListItem >
                <Stack direction="row" spacing={1} alignItems="center">
                      <ListItemButton component={Link} to={`/users/${item._id}`}>
                      <ListItemText primary={item.first_name+" "+item.last_name} 
                      />
                      </ListItemButton>
                      <Chip label={item.photo_count} color="success" size="small"/>
                      <Chip label={item.comment_count} color="error" size="small" component={Link} to={`/comments/${item._id}`}/>
                </Stack>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </div>
    );
}

export default UserList;
