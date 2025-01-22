import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';

function Header() {
  const { logout, isLoggedIn } = useContext(AuthContext);

  return (
    <AppBar component="nav">
        <Toolbar>
            <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
                Эксперт-Гарант
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {isLoggedIn && (
                    <Button sx={{ color: '#fff' }} onClick={logout}>
                        Logout
                    </Button>
                )}
            </Box>
        </Toolbar>
    </AppBar>
  );
}

export default Header;