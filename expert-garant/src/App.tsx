import { Button, Grid2, useTheme } from '@mui/material';
import './App.css'

function App() {
  const theme = useTheme();

  return (
    <Grid2 sx={{ backgroundColor: theme.palette.background.paper }}>
      <Button variant="text">Text</Button>
    </Grid2>
  )
}

export default App
