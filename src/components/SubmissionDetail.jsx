import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardMedia,Typography } from '@mui/material'
import {GitHub,Star,StarBorder,Delete,Edit,CalendarToday,OpenInNew} from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';

const SubmissionDetail = () => {
    const navigate = useNavigate()
    const {title} =  useParams();
    const [deletePopUp,setDeletePopUp] = useState(false);
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [uploadDate,setUploadDate] = useState("");
    const storedData = window.localStorage.getItem(title);
    const data = JSON.parse(storedData);
    const [star,setStar] = useState(data.favorite);

    const handleClick=()=>{
        data.favorite^=1;
        setStar(data.favorite)
        localStorage.setItem(data.title, JSON.stringify(data));
    }
    const handleDelete=()=>{
        localStorage.removeItem(title);
        navigate("/")
    }
    const handleEdit=()=>{
        navigate(`/addSubmission/${title}`)
    }
    const parseDate = (str) => {
        if (!str) return null;
        var date = new Date(str);
        console.log(date)
        var options = {  month: 'short', day : '2-digit', year: 'numeric' };
        var formattedDate = date.toLocaleDateString('en-US', options).replace(/,/g,'');
        return formattedDate;
    };
    useEffect(()=>{
       setStartDate(parseDate(data.startDate))
       setEndDate(parseDate(data.endDate))
       setUploadDate(parseDate(data.date))
    },[title])
   
    return (
        <Box sx={{width:"100vw",height:"fit-content",overflow:"hidden"}}>
            <Card
                sx={{
                    width: "100vw",
                    backgroundColor: "#003145",
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                    boxSizing: "border-box",
                    p: "100px 150px",
                    gap: "60"
                }}
            >
                <Box sx={{ color: "white", marginRight: "100px" }}>
                    <Box sx={{display:"flex",alignItems:"center",gap:6}}>
                        <CardMedia
                            component="img"
                            sx={{ width:"130px",height:"140px",objectFit:"cover",borderRadius:"10px"}}
                            image={data.coverImage}
                            alt="."
                        />
                        <Typography sx={{ fontWeight: "bold", fontSize: "40px",wordWrap: "break-word" }}>{data.title}</Typography>
                    </Box>
                    <Typography sx={{ m: "20px 0px", fontSize: "20px", overflow: "wrap", fontFamily: "inherit",wordWrap: "break-word"}}>{data.summary}</Typography>
                    <Box sx={{display:'flex',alignItems:"center",gap:3}}>
                        <Button onClick={handleClick} sx={{m:"0px -20px",p:0}} >{(star===1)?<Star sx={{color:"white",p:0}}/>:<StarBorder sx={{color:"white",p:0}}/>}</Button>
                        <Box sx={{height:"30px",width:"0.5px",backgroundColor:"#AAAAAA"}}></Box>
                        <Button sx={{padding: "3px 15px", color: "#eeeeee", backgroundColor: "#255973", textTransform: "capitalize", fontSize: "14px", borderRadius: "15px",'&:hover': { backgroundColor: '#255973'}, }}><CalendarToday sx={{ color: 'white',height:"17px" }} />{uploadDate}</Button>
                    </Box>
                </Box>
                <Box sx={{position:"absolute",right:"100px",top:"180px",display:"flex",flexDirection:"column",justifyItems:"flex-start",alignItems:"flex-start",gap:2}}>
                    <Button onClick={handleEdit} sx={{width:"120px",p:"7px 30px",border:"2px solid white",borderRadius:"10px",color:"white",textTransform:"capitalize",fontSize:"15px"}}><Edit/>&nbsp;Edit</Button>
                    <Button onClick={()=>{setDeletePopUp(true);}} sx={{width:"120px",p:"7px 30px",border:"2px solid white",borderRadius:"10px",color:"white",textTransform:"capitalize",fontSize:"15px"}}><Delete/>&nbsp;Delete</Button>
                </Box>
            </Card>
            <Card sx={{display:"flex",p:"50px"}}>
                <Box sx={{flex:2,p:"0px 100px"}}>
                   <Typography sx={{color:"#000000",fontSize:"20px"}}>Description</Typography>
                   <Typography sx={{color:"#444444",p:"20px 0px",fontSize:"17px",wordWrap: "break-word"}}>{data.description}</Typography>
                </Box>
                <Box sx={{flex:1,display:"flex",flexDirection:"column",gap:1.5,mr:"150px"}}>
                    <Typography sx={{color:"#999999",fontSize:"18px"}}>Hackathon</Typography>
                    <Typography sx={{fontSize:"25px",wordWrap: "break-word"}}>{data.hackathonName}</Typography>
                    <Typography sx={{color:"#999999",fontSize:"15px",mb:"30px",display:"flex",alignItems:"center",fontFamily:"monospace"}}><CalendarToday sx={{fontSize:"18px"}}/>&nbsp;{startDate} - {endDate}</Typography>
                    <Button component={Link} to={data.githubRepo} sx={{width:"200px",p:"7px 20px",border:"2px solid #777777",borderRadius:"10px",color:"#555555",textTransform:"capitalize",fontSize:"15px"}}><GitHub/>&nbsp;Github Repository</Button>
                    <Button component={Link} to={data.otherLink}  sx={{width:"200px",p:"7px 20px",border:"2px solid #777777",borderRadius:"10px",color:"#555555",textTransform:"capitalize",fontSize:"15px"}}><OpenInNew/>&nbsp;Other Link</Button>  
                </Box>
            </Card>
            {deletePopUp && 
            <Box sx={{position:"fixed",top:0,width:"100vw",height:"100vh",backgroundColor:"rgb(0,0,0,0.5)",display:"flex",justifyContent:"center",alignItems:"center"}}>
                   <Box sx={{width:"30%",height:"180px",borderRadius:"20px",background:"white",p:"25px 20px ",boxSizing:"border-box"}}>
                    <Typography sx={{fontSize:"20px",fontWeight:500}}>Delete Model</Typography>
                    <Typography sx={{fontSize:"14px",color:"#999999"}}>This action is irreversible. Are you sure you want to delete this model?</Typography>
                    <Box sx={{display:"flex",width:"100%",height:"45%",justifyContent:"flex-end",alignItems:"flex-end",gap:2}}>
                        <Button onClick={()=>{setDeletePopUp(false)}} sx={{p:"7px 13px",color:"#333333",border:"2px solid #444444", borderRadius:"10px",textTransform:"capitalize",fontSize:"16px",boxSizing:"border-box"}}>Cancel</Button>
                        <Button onClick={handleDelete} sx={{p:"7px 13px",background:"red",color:"white",borderRadius:"10px",textTransform:"capitalize",fontSize:"16px",'&:hover': { backgroundColor: 'red'}}}>Delete</Button>
                    </Box>
                </Box>
            </Box>}
        </Box>
    )
}
export default SubmissionDetail