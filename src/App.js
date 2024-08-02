import React, { useState } from "react";
import { Container, Button, MenuItem, Box, Typography, CircularProgress, Select, InputLabel, FormControl, TextField } from "@mui/material";
import { Editor } from "@monaco-editor/react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState(localStorage.getItem('input') || ``);
  const [output, setOutput] = useState(``);
  const [languageId, setLanguageId] = useState(localStorage.getItem('language_Id') || 'python');
  const [userInput, setUserInput] = useState(``);
  const [loading, setLoading] = useState(false);

  const handleEditorChange = (value) => {
    setInput(value);
    localStorage.setItem('input', value);
  };

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguageId(event.target.value);
    localStorage.setItem('language_Id', event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput("Creating Submission...\n");

    const data = JSON.stringify({
      language: languageId,
      version: 'latest',
      code: input,
      input: userInput || null,
    });

    try {
      const response = await fetch('https://online-code-compiler.p.rapidapi.com/v1/', {
        method: 'POST',
        headers: {
          'x-rapidapi-key': '1bd042778fmshd4b16d97e812af0p1395bejsn19af4753d4d1',
          'x-rapidapi-host': 'online-code-compiler.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonResponse = await response.json();
      setOutput(`Results:\n${jsonResponse.output || jsonResponse.error}`);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Container className="container" >
      <Typography variant="h4" component="h1" gutterBottom className="heading">
        Online Compiler
      </Typography>
      
      <div style={{display:'flex',flexDirection:'row',gap:'5%',justifyContent:'center'}}>
      <FormControl variant="outlined" className="language-select" >
        <InputLabel id="language-label">Language</InputLabel>
        <Select
          labelId="language-label"
          id="language"
          value={languageId}
          onChange={handleLanguageChange}
          label="Language"
        >
          <MenuItem value="python3" className="language-menu-item">
            Python
          </MenuItem>
          <MenuItem value="cpp" className="language-menu-item">
            C++
          </MenuItem>
          <MenuItem value="c" className="language-menu-item">
            C
          </MenuItem>
          <MenuItem value="java" className="language-menu-item">
            Java
          </MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading} className="run-button">
        {loading ? <CircularProgress size={24} /> : 'Run Code'}
      </Button>
      </div>
      <div style={{display:'flex',gap:'10px',width:'100%'}}>
      <Box className="editor-container" style={{ width: '70%',fontSize:'50px',fontWeight:'bold' }}>
        <Editor
          height="80vh"
          fontSize="50px"
          defaultLanguage={languageId}
          value={input}
          onChange={handleEditorChange}
          theme="vs-dark" 
          options={{
            selectOnLineNumbers: true,
            automaticLayout: true,
            fontSize: 20, 
            // fontWeight: 'italic',
            //gap between letters
            letterSpacing: '1px',
            fontFamily: 'rockwell, Monaco, monospace', 
          }}
          
        />
      </Box>
      <div style={{display:'flex',flexDirection:'column',width:'50%'}}>
      <Box sx={{ mt: 2 }} style={{width:'100%',height:'30vh'}}>
        <Typography variant="h6" gutterBottom>
          Enter Your Inputs Here :
        </Typography>
        <TextField
          label="User Input"
          multiline
          rows={7}
          variant="outlined"
          fullWidth
          value={userInput}
          onChange={handleUserInputChange}
          sx={{
            backgroundColor: '#f5f5f5',
            borderRadius: 1,
            '& .MuiInputLabel-root': { color: '#3f51b5' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#3f51b5',
              },
              '&:hover fieldset': {
                borderColor: '#3f51b5',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3f51b5',
              },
            },
          }}
        />
      </Box>
      
      <Box mt={4} className="output-box">
        <Typography variant="h6" gutterBottom>
          Your Output :
        </Typography>
        <Box className="output-area" id="output">
          {output}
        </Box>
        
      </Box>
      </div>
      </div>
    </Container>
    </div>
  );
};

export default App;
