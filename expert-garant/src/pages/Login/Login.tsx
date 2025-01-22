import { Box, Button, Card, CardContent, Container, Divider, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/User/UserContext';
import { AuthContext } from '../../context/Auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  
  const { user } = useContext(UserContext);
  const { login, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    if (user.username !== username) {
      setUsernameError(true);
      return;
    }

    if (user.password !== password) {
      setPasswordError(true);
      return;
    }

    login();
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
            <TextField 
              error={usernameError} 
              label="Username" 
              variant="outlined" 
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError(false);
              }} 
            />
            <TextField 
              error={passwordError} 
              label="Password" 
              variant="outlined" 
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }} 
              type="password" 
            />
            <Button variant="contained" onClick={handleLogin}>Login</Button>
            <Divider />
            <Link to="/reset-password">Reset Password</Link>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;
