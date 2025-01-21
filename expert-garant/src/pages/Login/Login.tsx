import { Box, Card, CardContent, Container } from '@mui/material';

function Login() {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box sx={{ maxWidth: 550, width: '100%', margin: '0 auto' }}>
        <Card variant="outlined">
          <CardContent>
          Login

          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;
