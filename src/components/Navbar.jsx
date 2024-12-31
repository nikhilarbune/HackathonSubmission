import React from 'react'
import logo from "../img/logo.png"
import { Box, CardMedia } from '@mui/material'
const Navbar = () => {
    return (
        <Box
            sx={{
                height: "60px",
                width: "100vw",
                backgroundColor: "white",
            }}
        >
            <a href="/">
                <CardMedia
                    component="img"
                    sx={{ width: 100, padding: "10px 150px" }}
                    image={logo}
                    alt="."
                />
            </a>
        </Box>
    )
}

export default Navbar