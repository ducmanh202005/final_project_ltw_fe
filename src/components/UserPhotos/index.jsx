import React from "react";
import { Typography,Card,CardContent,Stack,Divider,CardMedia,Button,TextField} from "@mui/material";

import "./styles.css";
import {useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import fetchModel from "../../lib/fetchModelData";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos ({advance}) {
    const {userId} = useParams();
    const [photos,setPhotos]=useState([])
    const [idx,setIdx]=useState(0)
    const [comment,setComment]=useState('')
    const [status,setStatus]=useState('')
    const fetchData=async()=>{
        const res=await fetch(`https://rdrvd6-8081.csb.app/api/photo/${userId}`)
        const data=await res.json()
        setPhotos(data)
      }
    useEffect(()=>{
      fetchData()
    },[userId])

    const handleAdd=async(photoId)=>{
      try{
        setStatus('')
        const token=localStorage.getItem('token')
        const data=await fetchModel(`/comment/${photoId}`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          },
          body:JSON.stringify({comment:comment})
        })
        setStatus(data.message)
        fetchData()
      }catch(e){
        setStatus(e.message)
      }
    }


    const photosShow=advance ?[photos[idx]] :photos


    return (
      <>
        {photosShow.map((photo)=>(
          <>
            <Card>
              <CardMedia sx={{height:"300px", objectFit:"contain"}}component="img" image={require(`../../images/${photo.file_name}`)}></CardMedia>
              <CardContent>
                <Typography variant="body1">Ngày đăng:{new Date(photo.date_time).toLocaleDateString()}</Typography>
                <Divider></Divider>
                {photo.comments?.map((comment)=>(
                  <Stack spacing={1.5}>
                  <Typography variant="caption">Comment: {comment.comment}</Typography>
                  <Typography variant="caption">Nguoi dang: {comment.user.first_name+" "+comment.user.last_name}</Typography>
                  <Typography variant="caption">Ngay Comment: {new Date(comment.date_time).toLocaleDateString()}</Typography>
                  <Divider></Divider>
                  </Stack>
                ))}
                <Divider></Divider>
                <TextField label='comment' value={comment} onChange={(e)=>setComment(e.target.value)}></TextField>
                <Button onClick={(e)=>handleAdd(photo._id)}>Add comment</Button>
                {status && <p>{status}</p>}
              </CardContent>
            </Card>
          </>
        ))}
        {advance && (
          <>
            <p>Anh so{idx+1}/{photos.length}</p>
            <Button disabled={idx===0} onClick={()=>setIdx(idx-1)}>truoc</Button>
            <Button disabled={idx===photos.length-1} onClick={()=>{setIdx(idx+1)}}>sau</Button>
          </>
        )}
      </>
    );
}

export default UserPhotos;
