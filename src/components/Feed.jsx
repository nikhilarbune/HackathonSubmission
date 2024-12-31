import React, { useEffect, useState } from 'react'
import { SubmissionCard } from './'
import { Box, Button, InputAdornment, Select, TextField, Paper, MenuItem, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search'

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    '& .MuiListItemText-primary': {
      color: theme.palette.common.white,
    },
  },
  '& .MuiListItemText-primary': {
    height:"30px"
  },
}));
const StyledPaper = styled(Paper)(({ theme }) => ({
  height: "40px",
  width: "100px",
}));

const Feed = () => {
  const [keys, setKeys] = useState(Object.keys(localStorage));
  const [all, setAll] = useState(true)
  const [searchValue, setSearchValue] = useState("")
  const [selectTiming, setSelectTiming] = useState("newest")

  const handleAllClick = () => {
    setAll(true);
    setKeys(Object.keys(localStorage));
  }
  const handleFavouriteClick = () => {
    setAll(false);
    const k = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (JSON.parse(localStorage.getItem(key)).favorite === 1) {
        k.push(key);
      }
    }
    setKeys(k);
  }
  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      const title = e.target.value;
      const myValue = JSON.parse(localStorage.getItem(title));
      if (myValue != null) {
        const k = [];
        k.push(title)
        setKeys(k);
      }
    }
  }
  useEffect(() => {
    if(keys){
     let k=keys;
     let items = keys.map((key) => {
      let item = JSON.parse(localStorage.getItem(key));
      item.key = key;
      return item;
    });
    items.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (selectTiming==="oldest") {
      k = items.map((item) => item.key);
    }
    else {
      k = items.map((item) => item.key).reverse();
    }
    setKeys(k)
    }
  }, [selectTiming,all])
  return (
    <Box sx={{ width: "80vw", height: "100vh", margin: "auto", mt: "30px" }}>
      <Box sx={{ height: "90px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Button sx={{ p: "3px 25px", textTransform: "capitalize", fontSize: "18px", borderRadius: "0px", color: all ? "black" : "#555555", borderBottom: all ? "4px solid green" : "none" }} onClick={handleAllClick}>All Submissions</Button>
          <Button sx={{ p: "3px 25px", textTransform: "capitalize", fontSize: "18px", borderRadius: "0px", color: !all ? "black" : "#555555", borderBottom: !all ? "4px solid green" : "none" }} onClick={handleFavouriteClick}>Favourite Submissions</Button>
        </Box>
        <Box sx={{ height: "40px", width: "460px", display: "flex", justifyContent: "space-between" }}>
          <TextField
           variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': {
              height: '40px',
              width: "290px",
              borderRadius: "30px", 
              border: "2px solid #555555",
              outline:"none"
            }, }}
            onChange={(e) => { setSearchValue(e.target.value) }}
            value={searchValue}
            onKeyDown={handleKeyDown}
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }} />
          <Select
            value={selectTiming}
            onChange={(e) => { setSelectTiming(e.target.value) }}
            sx={{ height: "40px", width: "150px", borderRadius: "30px", border: "2px solid #555555", '&:hover': { border: "2px solid #555555" } }}
            MenuProps={{
                sx: {
                  '& .MuiList-root': {
                    pt:"0px",pb:"0px",
                  },
                },
              classes: {
                paper: StyledPaper,
              },
            }}
          >
            <StyledMenuItem value="newest">
              <ListItemText primary="Newest" />
            </StyledMenuItem>
            <StyledMenuItem value="oldest">
              <ListItemText primary="Oldest" />
            </StyledMenuItem>
          </Select>
        </Box>
      </Box>
      <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
        {keys.map(key =>
          <SubmissionCard title={key} />
        )}
      </Box>
    </Box>
  )
}

export default Feed