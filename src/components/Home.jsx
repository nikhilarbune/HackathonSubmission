import React from 'react'
import { Box, Button, Card, CardMedia, Typography } from '@mui/material'
import {Feed} from './';
import { Link } from 'react-router-dom';
import logo1 from "../img/logo1.png"
import waves from "../img/waves.png"
const Home = () => {
    return (
        <Box>
            <Card
                sx={{
                    width: "100vw",
                    backgroundColor: "#003145",
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                    boxSizing: "border-box",
                    backgroundImage: `url(${waves})`,
                    backgroundSize: "100% 100%",
                    p: "50px 150px",
                    gap: "60"
                }}
            >
                <Box sx={{ color: "white", marginRight: "100px" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "40px" }}>Hackathon Submissions</Typography>
                    <Typography sx={{ m: "20px 0px", fontSize: "20px", overflow: "wrap", fontFamily: "inherit" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aliquid rerum sunt fuga. Dolor omnis obcaecati excepturi velit libero vitae quia minima, maxime molestiae animi architecto unde nobis rerum </Typography>
                    <Button component={Link} to="/addSubmission" sx={{ height: "50px", padding: "10px 20px", color: "white", backgroundColor: "#44924C", textTransform: "capitalize", fontWeight: "bold", fontSize: "15px", borderRadius: "12px", margin: "20px 0px", '&:hover': { backgroundColor: '#44934C', }, }}>Upload Submission</Button>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 220 }}
                    image={logo1}
                    alt="."
                />
            </Card>
            <Feed/>
        </Box>
    )
}

export default Home


