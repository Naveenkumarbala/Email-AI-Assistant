import { useState } from 'react';
import './App.css';
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
    <div className="reply-container">
      <Typography variant='h3' component="h1" gutterBottom className="title-text" >
       ✨ <strong>Email AI Assistant</strong>
        </Typography>
        <p>Craft perfect responses with AI-powered suggestions</p>
      </div>
      <div className="grid-container">
        <Box className="input-box">
          <Typography variant="h6" gutterBottom>
            ✉️ Original Email Content
          </Typography>
                <TextField
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            className="textarea"
            label="Enter your email content here..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ 
              mb: 2,
              '& .MuiInputLabel-root': { color: 'white' }, 
              '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                color: 'white', 
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' } 
              }
            }}
            InputLabelProps={{
              style: { color: 'white' } // Ensures label remains white
            }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: 'white', '&.Mui-focused': { color: 'white' } }}>
  📝 Tone (Optional)
</InputLabel>
            <Select
              value={tone || ''}
              label="Tone (Optional)"
              onChange={(e) => setTone(e.target.value)}
               sx={{ color: 'white', '& .MuiSvgIcon-root': { color: 'white' } }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <div className="button-container">
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : " Generate Smart Reply"}
            </Button>
          </div>
        </Box>

        {/* Right: Generated Reply */}
        {generatedReply && (
          <Box className="output-box">
            <div className="generated">
            <Typography variant="h6" gutterBottom   sx={{ color: '#FF8C00' }} >
               ✨ <strong>Generated Reply</strong>
            </Typography>
             <Button
              className="copy-button"
              onClick={() => navigator.clipboard.writeText(generatedReply)}
            >
          <ContentCopyRoundedIcon sx={{ color: '#ff8c00' }} />
              </Button>
              </div>
       <TextField
              fullWidth
              multiline
              rows={8}
              className="textarea"
              value={generatedReply}
              inputProps={{ readOnly: true }}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Removes border
                '& .MuiInputBase-input': { 
                  color: 'white', // Sets text color to white
                  scrollbarWidth: 'thin', // For Firefox
                  scrollbarColor: '#ff8c00 transparent', // Firefox scrollbar color

                  '&::-webkit-scrollbar': {
                    width: '5px' // Thin scrollbar
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#ff8c00', // Scrollbar color
                    borderRadius: '10px' // Rounded edges
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent' // Transparent track
                  },
                  '&::-webkit-scrollbar-button': {
                    display: 'none' // Hides upper and lower arrow buttons
                  }
                }
              }}
            />

          </Box>
        )}
      </div>
      </div>
      
  );
}

export default App;
