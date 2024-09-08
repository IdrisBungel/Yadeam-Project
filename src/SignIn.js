import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel'; // Import FormControlLabel
import FormLabel from '@mui/material/FormLabel'; // Import FormLabel
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
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ForgotPassword from './ForgotPassword';
import getSignInTheme from './theme/getSignInTheme';
import '@fontsource/roboto'; // Ensures Roboto is available globally

// Styled Components
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
  boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.05)',
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
      'radial-gradient(at 50% 50%, hsla(210, 100%, 33%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

const SignInTheme = createTheme(getSignInTheme('dark'), {
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    body1: {
      fontSize: '16px',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
    },
    button: {
      fontSize: '1rem',
      textTransform: 'none',
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

  // Toggle Password Visibility
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

    if (!username.value || username.value.trim() === '') {
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
          {/* Logo */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <img
              src="/MainLogo.png"
              alt="Yadeam Logo"
              style={{ width: '200px', height: 'auto' }}
            />
          </Box>

          {/* Sign In Heading */}
          <Typography
            component="h2"
            variant="h2"
            sx={{ fontSize: 'clamp(1.2rem, 7vw, 1.7rem)', mt: '1.6rem' }}
          >
            Sign in
          </Typography>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            {/* Username Field */}
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="username"
                name="username"
                placeholder="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
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

            {/* Password Field */}
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: { fontSize: '17px' },
                }}
              />
            </FormControl>

            {/* Remember Me and Forgot Password */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: -1.5,
              }}
            >
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Link
                component="button"
                onClick={() => setOpen(true)}
                variant="body2"
              >
                Forgot your password?
              </Link>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>

            {/* Register Link */}
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link href="#" variant="body2">
                Register
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </ThemeProvider>
  );
}
