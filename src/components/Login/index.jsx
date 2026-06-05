import React,{useState,useEffect} from "react"
import { useNavigate } from "react-router-dom"
import {TextField,Stack,Button,Typography} from "@mui/material"
import fetchModel from "../../lib/fetchModelData"

export default function Login({setLog}){
    const [login,setLogin]=useState({login_name:'',password:''})
    const [form,setForm]=useState({login_name:'',password:'',first_name:'',last_name:'',location:'',occupation:'',description:''})
    const [err,setErr]=useState('')
    const navigate=useNavigate()
    const [register,setRegister]=useState(false)
    const handleClick1=async()=>{
        try{
            setErr('')
            const data=await fetchModel('/login',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(login)
            })
            localStorage.setItem('token',data.token)
            localStorage.setItem('user',JSON.stringify(data.user))
            setLog(data.user)
            navigate(`/users/${data.user._id}`)
        }catch(e){
            setErr(e.message)
        }
    }
    const handleClick2=async()=>{
        try{
            setErr('')
            const data=await fetchModel('/register',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                   login_name:form.login_name,
                   password:form.password,
                   first_name:form.first_name,
                   last_name:form.last_name,
                   location:form.location,
                   occupation:form.occupation,
                   description:form.description
                })
            })
            setErr(data.message)
        }catch(e){
            setErr(e.message)
        }
    }
    const handleChange1=(e)=>{
        const {name,value}=e.target
        setLogin({...login,[name]:value})
    }
       const handleChange2=(e)=>{
        const {name,value}=e.target
        setForm({...form,[name]:value})
    }
    return(
        <>
        <Stack spacing={1}>
        <TextField label="Login_name" name="login_name" value={login.login_name} onChange={(e)=>handleChange1(e)}></TextField>
        <TextField label="Password" name="password" value={login.password} onChange={(e)=>handleChange1(e)}></TextField>
        <Button variant="contained" onClick={handleClick1}>Login</Button>
        </Stack>
        {err && <p>{err}</p>}
       <button onClick={()=>setRegister(!register)}>Dang ky</button>
        {register && (
            <>
                <Stack spacing={1}>
                    <div>Dang ky Form</div>
                    <TextField label="login_name" name="login_name" value={form.login_name} onChange={handleChange2}></TextField>
                    <TextField label="password" name='password' value={form.password} onChange={handleChange2}></TextField>
                    <TextField label='first_name' name="first_name" value={form.first_name} onChange={handleChange2}></TextField>
                    <TextField label='last_name' name="last_name" value={form.last_name} onChange={handleChange2}></TextField>
                    <TextField label='location' name="location" value={form.location} onChange={handleChange2}></TextField>
                    <TextField label='occupation' name="occupation" value={form.occupation} onChange={handleChange2}></TextField>
                    <TextField label='description' name="description" value={form.description} onChange={handleChange2}></TextField>
                    <Button onClick={handleClick2}>Dang ky</Button>
                    {err && <p>{err}</p>}
                </Stack>
            </>
        )}
        </>
    )
}