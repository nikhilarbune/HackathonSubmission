import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { NewSubmission, Home, Navbar, SubmissionDetail} from './components';
import React, { Component } from 'react';
import { Box } from '@mui/material'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error)
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Box
        sx={{ 
          width: "100vw",
          backgroundColor: "#F2F3F7"
        }}
      >
        <Navbar/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="addSubmission" element={<NewSubmission />} />
            <Route path="addSubmission/:title" element={<NewSubmission />} />
            <Route path="submission/:title" element={<SubmissionDetail />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ErrorBoundary>
  );
}

export default App;
