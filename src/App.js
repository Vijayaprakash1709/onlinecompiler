// import React, { useState } from "react";
// import { Container, Button,Grid, MenuItem, Box, Typography, CircularProgress, Select, InputLabel, FormControl, TextField } from "@mui/material";
// import { Editor } from "@monaco-editor/react";
// import { useTheme, useMediaQuery } from "@mui/material";
// import "./App.css";

// const App = () => {
//   const [input, setInput] = useState(localStorage.getItem('input') || ``);
//   const [output, setOutput] = useState(``);
//   const [languageId, setLanguageId] = useState(localStorage.getItem('language_Id') || 'python');
//   const [userInput, setUserInput] = useState(``);
//   const [loading, setLoading] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const handleEditorChange = (value) => {
//     setInput(value);
//     localStorage.setItem('input', value);
//   };

//   const handleUserInputChange = (event) => {
//     setUserInput(event.target.value);
//   };

//   const handleLanguageChange = (event) => {
//     setLanguageId(event.target.value);
//     localStorage.setItem('language_Id', event.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setOutput("Creating Submission...\n");

//     const data = JSON.stringify({
//       language: languageId,
//       version: 'latest',
//       code: input,
//       input: userInput || null,
//     });

//     try {
//       const response = await fetch('https://online-code-compiler.p.rapidapi.com/v1/', {
//         method: 'POST',
//         headers: {
//           'x-rapidapi-key': '1bd042778fmshd4b16d97e812af0p1395bejsn19af4753d4d1',
//           'x-rapidapi-host': 'online-code-compiler.p.rapidapi.com',
//           'Content-Type': 'application/json',
//         },
//         body: data,
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const jsonResponse = await response.json();
//       setOutput(`Results : \nTime Taken : ${jsonResponse.cpuTime} , Memory : ${jsonResponse.memory}\nLanguage : ${jsonResponse.language.id}\nOutput : \n\t ${jsonResponse.output || jsonResponse.error}`);
//     } catch (error) {
//       setOutput(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//     <Container className="container" >
//       <Typography variant="h4" component="h1" gutterBottom className="heading">
//         Online Compiler
//       </Typography>
      
//       <div style={{display:'flex',flexDirection:'row',gap:'5%',justifyContent:'center'}}>
//       <FormControl variant="outlined" className="language-select" >
//         <InputLabel id="language-label">Language</InputLabel>
//         <Select
//           labelId="language-label"
//           id="language"
//           value={languageId}
//           onChange={handleLanguageChange}
//           label="Language"
//         >
//           <MenuItem value="python3" className="language-menu-item">
//             Python
//           </MenuItem>
//           <MenuItem value="cpp" className="language-menu-item">
//             C++
//           </MenuItem>
//           <MenuItem value="c" className="language-menu-item">
//             C
//           </MenuItem>
//           <MenuItem value="java" className="language-menu-item">
//             Java
//           </MenuItem>
//         </Select>
//       </FormControl>
//       <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading} className="run-button">
//         {loading ? <CircularProgress size={24} /> : 'Run Code'}
//       </Button>
//       </div>
//       {/* <div style={{display:'flex',gap:'10px',width:'100%'}}>
//       <Box className="editor-container" style={{ width: '70%',fontSize:'50px',fontWeight:'bold' }}>
//         <Editor
//           height="80vh"
//           fontSize="50px"
//           defaultLanguage={languageId}
//           value={input}
//           onChange={handleEditorChange}
//           theme="vs-dark" 
//           options={{
//             selectOnLineNumbers: true,
//             automaticLayout: true,
//             fontSize: 20, 
//             // fontWeight: 'italic',
//             //gap between letters
//             letterSpacing: '1px',
//             fontFamily: 'rockwell, Monaco, monospace', 
//           }}
          
//         />
//       </Box>
//       <div style={{display:'flex',flexDirection:'column',width:'50%'}}>
//       <Box sx={{ mt: 2 }} style={{width:'100%',height:'30vh'}}>
//         <Typography variant="h6" gutterBottom>
//           Enter Your Inputs Here :
//         </Typography>
//         <TextField
//           label="User Input"
//           multiline
//           rows={7}
//           variant="outlined"
//           fullWidth
//           value={userInput}
//           onChange={handleUserInputChange}
//           sx={{
//             backgroundColor: '#f5f5f5',
//             borderRadius: 1,
//             '& .MuiInputLabel-root': { color: '#3f51b5' },
//             '& .MuiOutlinedInput-root': {
//               '& fieldset': {
//                 borderColor: '#3f51b5',
//               },
//               '&:hover fieldset': {
//                 borderColor: '#3f51b5',
//               },
//               '&.Mui-focused fieldset': {
//                 borderColor: '#3f51b5',
//               },
//             },
//           }}
//         />
//       </Box>
      
//       <Box mt={4} className="output-box">
//         <Typography variant="h6" gutterBottom>
//           Your Output :
//         </Typography>
//         <Box className="output-area" id="output">
//           {output}
//         </Box>
        
//       </Box>
//       </div>
//       </div> */}

// <Grid container spacing={2}>
//         <Grid item xs={12} md={7}>
//           <Box
//             className="editor-container"
//             sx={{
//               height: { xs: '60vh', md: '80vh' },
//               width:{xs:'100%'},
//               fontSize: '50px',
//               fontWeight: 'bold',
//             }}
//           >
//             <Editor
//               height="80vh"
//               defaultLanguage={languageId}
//               value={input}
//               onChange={handleEditorChange}
//               theme="vs-dark"
//               options={{
//                 selectOnLineNumbers: true,
//                 automaticLayout: true,
//                 fontSize: 20,
//                 letterSpacing: '1px',
//                 fontFamily: 'rockwell, Monaco, monospace',
//                 lineNumbers: isMobile ? "on" : "on",
//                 lineNumbersMinChars: isMobile ?  2 :  4,
//               }}
//             />
//           </Box>
//         </Grid>
//         <Grid item xs={12} md={5}>
//           <Box
//             sx={{
//               mt: 2,
//               width: '100%',
//               height: '30vh',
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Enter Your Inputs Here:
//             </Typography>
//             <TextField
//               label="User Input"
//               multiline
//               rows={7}
//               variant="outlined"
//               fullWidth
//               value={userInput}
//               onChange={handleUserInputChange}
//               sx={{
//                 backgroundColor: '#f5f5f5',
//                 borderRadius: 1,
//                 '& .MuiInputLabel-root': { color: '#3f51b5' },
//                 '& .MuiOutlinedInput-root': {
//                   '& fieldset': {
//                     borderColor: '#3f51b5',
//                   },
//                   '&:hover fieldset': {
//                     borderColor: '#3f51b5',
//                   },
//                   '&.Mui-focused fieldset': {
//                     borderColor: '#3f51b5',
//                   },
//                 },
//               }}
//             />
//           </Box>
//           <Box
//             sx={{
//               mt: 4,
//               width: '100%',
//             }}
//             className="output-box"
//           >
//             <Typography variant="h6" gutterBottom>
//               Your Output:
//             </Typography>
//             <Box
//               className="output-area"
//               id="output"
//               sx={{
//                 // backgroundColor: '#f5f5f5',
//                 padding: 2,
//                 borderRadius: 1,
//                 minHeight: '35vh',
//                 whiteSpace: 'pre-wrap',
//                 border: '1px solid #ddd',
//                 overflow: 'auto',
//               }}
//             >
//               {output}
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//     </div>
//   );
// };

// export default App;


import React, { useState , useEffect} from "react";
import { Container, Button, Grid, MenuItem, Box, Typography, CircularProgress, Select, InputLabel, FormControl, TextField } from "@mui/material";
import { Editor } from "@monaco-editor/react";
import { useTheme, useMediaQuery } from "@mui/material";
import "./App.css";

const App = () => {
  const [input, setInput] = useState(localStorage.getItem('input') || ``);
  const [output, setOutput] = useState(``);
  const [languageId, setLanguageId] = useState(localStorage.getItem('language_Id') || '#');
  const [userInput, setUserInput] = useState(``);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  
  //clear localstorage using useeffect
  useEffect(() => {
    localStorage.clear();
  })

  
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
    if(event.target.value === '5'){
      setInput(`print("Hello World")`);
    }
    if(event.target.value === '7'){
      setInput(`#include <iostream>\nusing namespace std;\nint main() {\n\tcout << "Hello World";\n\treturn 0;\n}`);
    }
    if(event.target.value === '6'){
      setInput(`#include <stdio.h>\nint main() {\n\tprintf("Hello World");\n\treturn 0;\n}`);
    }
    if(event.target.value === '4'){
      setInput(`import java.util.*; \n public class Progman {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}`);
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput("Creating Submission...\n");

    const data = new URLSearchParams();
    data.append("LanguageChoice", languageId);
    data.append("Program", input);
    data.append("Input", userInput || "");

    try {
      const response = await fetch('https://code-compiler.p.rapidapi.com/v2', {
        method: 'POST',
        headers: {
          'x-rapidapi-key': '1bd042778fmshd4b16d97e812af0p1395bejsn19af4753d4d1', // Replace with your RapidAPI key
          'x-rapidapi-host': 'code-compiler.p.rapidapi.com',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonResponse = await response.json();
      // setOutput(`Results : \nTime Taken : ${jsonResponse.cpuTime} , Memory : ${jsonResponse.memory}\nLanguage : ${jsonResponse.language.id}\nOutput : \n\t ${jsonResponse.output || jsonResponse.error}`);
      setOutput(jsonResponse.Result || jsonResponse.Errors);
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
              <MenuItem value="#" >
              Select Language </MenuItem>
              

              <MenuItem value="4" className="language-menu-item">
                Java
              </MenuItem>
              <MenuItem value="5" className="language-menu-item">
                Python
              </MenuItem>
              <MenuItem value="7" className="language-menu-item">
                C++
              </MenuItem>
              <MenuItem value="6" className="language-menu-item">
                C
              </MenuItem>
              
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading} className="run-button">
            {loading ? <CircularProgress size={24} /> : 'Run Code'}
          </Button>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Box
              className="editor-container"
              sx={{
                height: { xs: '60vh', md: '80vh' },
                width: { xs: '100%' },
                fontSize: '50px',
                fontWeight: 'bold',
              }}
            >
              <Editor
                height="80vh"
                defaultLanguage={languageId===4?"java":languageId===5?"python3":languageId===6?"c":languageId===7?"cpp":"java"}
                value={input}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                  selectOnLineNumbers: true,
                  automaticLayout: true,
                  fontSize: 20,
                  letterSpacing: '1px',
                  fontFamily: 'rockwell, Monaco, monospace',
                  lineNumbers: isMobile ? "on" : "on",
                  lineNumbersMinChars: isMobile ? 2 : 4,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                mt: 2,
                width: '100%',
                height: '30vh',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Enter Your Inputs Here:
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
            <Box
              sx={{
                mt: 4,
                width: '100%',
              }}
              className="output-box"
            >
              <Typography variant="h6" gutterBottom>
                Your Output:
              </Typography>
              <Box
                className="output-area"
                id="output"
                sx={{
                  padding: 2,
                  borderRadius: 1,
                  minHeight: '35vh',
                  whiteSpace: 'pre-wrap',
                  border: '1px solid #ddd',
                  overflow: 'auto',
                }}
              >
                {output}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;

