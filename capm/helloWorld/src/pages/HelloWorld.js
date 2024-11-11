import React from "react";
import { Box, Typography } from "@material-ui/core"; // Import Box for layout

export default function NotFound() {
  return (
    <Box
      display="flex"             
      justifyContent="center"    
      alignItems="center"        
      height="100vh"             
      textAlign="center"     
    >
      <Typography variant="h4" color="textPrimary">
        Hello World..
      </Typography>
    </Box>
  );
}
