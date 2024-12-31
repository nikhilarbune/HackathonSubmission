import React, { useEffect, useState } from 'react'
import { Box,CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const SubmissionCard = ({ title }) => {
    const [days,setDays]=useState();
    const storedData = window.localStorage.getItem(title);
    const data = JSON.parse(storedData);

    useEffect(()=>{
        const currentDate = new Date();
        const oldDate = new Date(data.date);
        const diffInMilliseconds = Math.abs(currentDate- oldDate );
        const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
        setDays(diffInDays)
    },[title])
    
    console.log(data)
    return (
        <Box component={Link} to={`/submission/${title}`} sx={{ width: "31%", height: "300px", backgroundColor: "white", m: "20px 13px",p:"22px",borderRadius: "20px",boxSizing:"border-box",display:"flex",flexDirection:"column",justifyContent:"space-between",boxShadow:"3px 3px 3px 3px  #ffffff",textDecoration:"none"}}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <CardMedia
                    component="img"
                    sx={{ width: "110px", height: "120px", objectFit: "cover", borderRadius: "10px" }}
                    image={data.coverImage}
                    alt="."
                />
                <Typography sx={{fontWeight:"500",fontSize: "25px",color:"#111111",textTransform:"capatalize",wordWrap: "break-word"}}>{data.title}</Typography>
            </Box>
            <Typography sx={{color:"#555555",fontSize:"17px",mt:"20px",wordWrap: "break-word" }}>{data.summary}</Typography>
            <Typography sx={{color:"#999999",display:"flex",justifyContent:"flex-end",alignItems:"flex-end",width:"100%",height:"50%"}}><i>uploaded {days} days ago</i></Typography>
        </Box>
    )
}

export default SubmissionCard