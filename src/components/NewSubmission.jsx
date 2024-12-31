import React, { useState } from 'react';
import { Box, Input, TextField, Button, Typography, CardMedia, InputAdornment } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import img from "../img/img.png"
import reload from "../img/reload.png"
import { useNavigate, useParams } from 'react-router-dom';

const NewSubmission = () => {
  const {title} = useParams();
  const navigate = useNavigate();
  const [pic, setPic] = useState("")
  const [err, setErr] = useState(false)
  const [formState, setFormState] = useState({
    title: '',
    summary: '',
    description: '',
    coverImage: '',
    hackathonName: '',
    startDate: '',
    endDate: '',
    githubRepo: '',
    otherLink: '',
    pic:'',
    favorite:0,
    date : null
  });
  useState(()=>{
    if(title){
      const storedData = window.localStorage.getItem(title);
      const data = JSON.parse(storedData);
      setFormState(data);
      setPic(data.pic)
    }
  },[title])
  
  const handleImageUpload = (event) => {

    const value  = event.target.value;
    const file = event.target.files[0];
    if (file){
      setPic(event.target.value);
      const reader = new FileReader();
      const dated = new Date();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormState((prevState) => ({
          ...prevState,
          coverImage: reader.result, pic: value, date : dated 
        }));
      };
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const dated = new Date();
    setFormState((prevState) => ({ ...prevState, [name]: value ,date : dated }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(formState.endDate<formState.startDate){setErr(true); return;}
    if(title){ localStorage.removeItem(title);}
    localStorage.setItem(formState.title, JSON.stringify(formState));
    if(title) navigate(`/submission/${formState.title}`);
    else navigate("/");
  };

  return (
    <Box sx={{ width: "65vw", backgroundColor: "white", height: "fit-content", display: "flex", margin: "50px 160px", borderRadius: "20px" }} >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, width: "50vw", margin: "30px 50px", fontSize: '20px', color: "#333333", pb: "20px", borderBottom: "1px solid #CCCCCC" }}>
          <Typography sx={{ fontWeight: "bold", color: "#444444", fontSize: "30px" }}>{title?"Edit":"New"} Hackathon Submission</Typography>
          <label>Title</label>
          <TextField
            name="title"
            value={formState.title}
            onChange={handleChange}
            placeholder="Title of your submission"
            required
            sx={{ mt: "-30px" }}
          />
          <label>Summary</label>
          <TextField
            name="summary"
            multiline
            placeholder="A short summary of your submission (this will be visible with your submission)"
            value={formState.summary}
            onChange={handleChange}
            sx={{ mt: "-30px" }}
            required
          />
          <label>Description</label>
          <TextField
            name="description"
            multiline
            rows={4}
            placeholder="Write a long description of your project. You can describe your idea and approach here."
            value={formState.description}
            onChange={handleChange}
            sx={{ mt: "-30px" }}
            required
          />

          <label htmlFor="coverImage" >Cover Image</label>
          <Input
            type="file"
            name="coverImage"
            id="file"
            accept="image/*"
            onChange={handleImageUpload}
            sx={{ display: "none" }}
          />
          <label htmlFor="file">
            <Typography sx={{ color: "#BBBBBB", mt: "-35px" }}>Minimum resolution: 360px X 360px</Typography>
            {formState.coverImage ?
              <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "space-between", padding: "8px 20px", backgroundColor: "#F2F3F7", borderRadius: "5px" }}>
                <Box sx={{ display: 'flex', alignItems: "center", gap: 2 }}>
                  <CardMedia component="img"
                    sx={{ width: "60px", height: "60px", borderRadius: "3px", objectFit: "cover" }}
                    image={formState.coverImage}
                    alt="."
                  />
                  <Typography sx={{ color: "#333333" }}>{pic.substring(12,)}</Typography>
                </Box>
                <CardMedia component="img"
                  sx={{ width: 110 }}
                  image={reload}
                  alt="."
                />
              </Box> :
              <CardMedia
                component="img"
                sx={{ width: "100%" }}
                image={img}
                alt="."
              />
            }
          </label>

          <label>Hackathon Name</label>
          <TextField
            name="hackathonName"
            value={formState.hackathonName}
            placeholder="Enter the name of the hackathon"
            onChange={handleChange}
            sx={{ mt: "-30px" }}
            required
          />
          <Box sx={{display:"flex",width:"100%",gap:4}}>
            <Box sx={{display:"flex",flexDirection:"column",width:"50%",gap:2}}>
          <label>Hackathon Start Date</label>
          <TextField
            name="startDate"
            type="date"
            InputProps={{
              placeholder: "Select start date",
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarTodayIcon sx={{ color: 'action.active' }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
            value={formState.startDate}
            onChange={handleChange}
            sx={{  }}
            required
          />
          </Box>
          <Box sx={{display:"flex",flexDirection:"column",width:"50%",gap:2}}>
          <label>Hackathon End Date</label>
          <TextField
            name="endDate"
            type="date"
            value={formState.endDate}
            onChange={handleChange}
            sx={{ }}
            InputProps={{
              placeholder: "Select end date",
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarTodayIcon sx={{ color: 'action.active' }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          </Box>
          </Box>

          <label>Github Repository</label>
          <TextField
            name="githubRepo"
            type="url"
            value={formState.githubRepo}
            placeholder="Enter your submission's public Github repository link"
            sx={{ mt: "-30px" }}
            onChange={handleChange}
          />
          <label>Other Links</label>
          <TextField
            name="otherLink"
            type="url"
            value={formState.otherLink}
            placeholder="You can upload a video demo or URL of your demo app here."
            sx={{ mt: "-30px" }}
            onChange={handleChange}
          />
        {err && "Something went wrong!"}
        </Box>
        <Button type="submit" sx={{ height: "45px", padding: "10px 20px", color: "white", backgroundColor: "#44924C", textTransform: "capitalize", fontWeight: "bold", fontSize: "15px", borderRadius: "12px", margin: "-5px 50px", mb: "30px", '&:hover': { backgroundColor: '#44934C', }, }}>{title?"Save":"Upload"} Submission</Button>
      </form>
    </Box>
  )
}

export default NewSubmission






