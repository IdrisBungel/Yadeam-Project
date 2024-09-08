import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ForgotPassword from './ForgotPassword';
import getSignInTheme from './theme/getSignInTheme';
import '@fontsource/roboto';  // Defaults to weight 400
import VpnKeyIcon from '@mui/icons-material/VpnKey';  // Import the key icon



const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(5),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '430px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 10px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  padding: 20,
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 20%, 0.5), hsl(220, 30%, 5%))',
  }),
}));



const SignInTheme = createTheme(getSignInTheme('dark'),{
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',  // Ensures Roboto is used as the default font
    body1: {
      fontSize: '16px',  // You can adjust this for regular text
    },
    h2: {
      fontSize: '1.75rem',  // Adjust the size for the heading
      fontWeight: 'bold',
    },
    button: {
      fontSize: '1rem',  // Adjust for button font
      textTransform: 'none',  // Prevents uppercase transformation
    },
  },
});


export default function SignIn() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });
  };

  const validateInputs = () => {
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    let isValid = true;

    if (!username.value || username.value.trim() === "") {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid username.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <ThemeProvider theme={SignInTheme}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3
           }}>
            <img
              src="/MainLogo.png"
              alt="Yadeam Logo"
              style={{ width: '200px', height: 'auto' }}
            />
          </Box>

          <Typography
            component="h2"
            variant="h2"
            sx={{
              width: '100%',
              fontSize: 'clamp(1.2rem, 7vw, 1.7rem)', 
              fontWeight: 'bold',                   
              fontFamily: 'Roboto, sans-serif',     
              mt: '1.6rem',
            }}
          >
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            {/* Username field with icon */}
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="username"
                type="text"
                name="username"
                placeholder="username"
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                  style: { fontSize: '18px' }, 
                }}
              />
            </FormControl>

<FormControl>
  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <FormLabel htmlFor="password">Password</FormLabel>
  </Box>
  <TextField
    error={passwordError}
    helperText={passwordErrorMessage}
    name="password"
    placeholder="••••••••"
    type={showPassword ? 'text' : 'password'}
    id="password"
    autoComplete="current-password"
    autoFocus
    required
    fullWidth
    variant="outlined"
    color={passwordError ? 'error' : 'primary'}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          {/* You can use a key icon here */}
          <VpnKeyIcon />
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={handleTogglePasswordVisibility} edge="end">
            {showPassword ? (
              <VisibilityOffIcon style={{ fontSize: '15px' }} />  // Eye icon to toggle visibility
            ) : (
              <VisibilityIcon style={{ fontSize: '15px' }} />  // Eye icon to toggle visibility
            )}
          </IconButton>
        </InputAdornment>
      ),
      style: { fontSize: '17px' },  // Customize font size inside TextField
    }}
  />
</FormControl>


            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: -1.5 }}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Link
                component="button"
                onClick={handleClickOpen}
                variant="body2"
              >
                Forgot your password?
              </Link>
            </Box>

            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <span>
                <Link href="#" variant="body2" sx={{ alignSelf: 'center' }}>
                  Register
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </ThemeProvider>
  );
}
