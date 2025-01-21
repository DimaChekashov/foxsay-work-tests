import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {

  }

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box sx={{ maxWidth: 500, width: '100%', margin: '0 auto' }}>
        <Card variant="outlined">
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 3 }}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <TextField label="Username" variant="outlined" />
            <TextField label="Password" variant="outlined" type="password" />
            <Button variant="contained" onClick={handleLogin}>Login</Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;
