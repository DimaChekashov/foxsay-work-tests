import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext';
import { Box, Button, Card, CardContent, Container, Divider, TextField, Typography } from '@mui/material';
import { UserContext } from '../../context/User/UserContext';
import User from '../../types/User';

function ResetPassword() {
  const [newUser, setNewUser] = useState<User>({username: "", password: ""});
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  
  const { user, updateUser } = useContext(UserContext);
  const { login, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleReset = () => {
    if (newUser.username === "" || newUser.username === user.username) {
      setUsernameError(true);
      return;
    }

    if (newUser.password === "" || newUser.password === user.password) {
      setPasswordError(true);
      return;
    }

    updateUser(newUser);
    login();
  }

  return (
    <Container
      sx={{
        paddingTop: 8,
      }}
    >
      <Box sx={{ maxWidth: 500, width: '100%', margin: '0 auto' }}>
        <Card variant="outlined">
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 3 }}>
            <Typography variant="h4" gutterBottom>Reset Password</Typography>
            <TextField 
              error={usernameError} 
              label="Username" 
              variant="outlined" 
              onChange={(e) => {
                setNewUser({...newUser, username: e.target.value});
                setUsernameError(false);
              }} 
            />
            <TextField 
              error={passwordError} 
              label="Password" 
              variant="outlined" 
              onChange={(e) => {
                setNewUser({...newUser, password: e.target.value});
                setPasswordError(false);
              }} 
              type="password" 
            />
            <Button variant="contained" onClick={handleReset}>Login</Button>
            <Divider />
            <Link to="/login">Login</Link>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default ResetPassword;
