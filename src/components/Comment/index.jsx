import { Stack,Typography,Divider } from "@mui/material"
import React from "react"
import {useState,useEffect} from "react"
import {useParams} from"react-router-dom"
export default function Comment(){
    const {userId}=useParams()
    const [comments,setComments]=useState([])
    const [err,setErr]=useState('')
    useEffect(()=>{
        const fetchData=async()=>{
            try{
            const res=await fetch(`https://rdrvd6-8081.csb.app/api/user/comment/${userId}`)
            const data=await res.json()
            setComments(data)
            }catch(e){
                setErr(e.message)
            }
        }
        setErr('')
        fetchData()
    },[userId])
    return(
        <>
        {err && <p>{err}</p>}
        {comments.map((comment)=>(
            <Stack spacing={2}>
                <Typography variant="body1">{comment.comment}</Typography>
                <Typography variant="body1">{new Date(comment.date_time).toLocaleDateString()}</Typography>
                <Divider></Divider>
            </Stack>
        ))}
        </>
    )
}