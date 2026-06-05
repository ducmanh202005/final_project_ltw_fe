import React from "react";
import {Typography,Stack,Paper,Button} from "@mui/material";

import "./styles.css";
import {useParams,Link} from "react-router-dom";
import { useState,useEffect } from "react";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const {userId}=useParams();
    const [user,setUser]=useState({})

    useEffect(()=>{
      const fetchData=async()=>{
        const res=await fetch(`https://rdrvd6-8081.csb.app/api/user/${userId}`)
        const data=await res.json()
        setUser(data)
      }
      fetchData();
    },[userId])
    return (
        <>
          <Stack spacing={2}>
          <Typography variant="body1">First_name:{user.first_name}</Typography>
          <Typography variant="body1">Last_name:{user.last_name}</Typography>
          <Typography variant="body1">Location:{user.location}</Typography>
          <Typography variant="body1">Description:{user.description}</Typography>
          <Typography variant="body1">Occupation:{user.occupation}</Typography>
          <Button component={Link} to={`/photos/${userId}`}>Xem anh</Button>
        </Stack>


        </>
    );
}

export default UserDetail;
