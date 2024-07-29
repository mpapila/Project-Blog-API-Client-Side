import { Alert, Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { LocationType } from '../type';
import Loading from '../components/Loading';



function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const location = useLocation()
    const apiUrl = import.meta.env.VITE_API_URL


    useEffect(() => {
        const state: LocationType = location.state;

        if (state?.successMessage) {
            setSuccessMessage(state?.successMessage)
            setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
        }

    }, [])





    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData(e.currentTarget)
        const body = {
            username: data.get('username'),
            password: data.get('password')
        }

        // console.log('Form data:', body);

        const bodyString = JSON.stringify(body)
        const headers = {
            "Content-Type": "application/json"
        }
        const options = {
            body: bodyString,
            method: "POST",
            headers,
        }
        const URL = `${apiUrl}/user/login`
        const response = await fetch(URL, options)
        const responsePayload = await response.json()
        if (responsePayload.token) {
            localStorage.setItem("token", responsePayload.token)
            setLoading(false);
            navigate('/', { state: { successMessage: 'You have successfully logged in' } })
        } else {
            setErrorMessage(responsePayload.message)
            if (formRef.current) {
                formRef.current.reset();
            }
        }
    }

    return (
        <div
            style={{ minHeight: '80vh' }}
        >
            {loading && <Loading />}

            <Container component="main" maxWidth="xs" sx={{ backgroundColor: 'white', }}>
                <Box
                    sx={{
                        marginBottom: 8,
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant='h5'>
                        Log In
                    </Typography>

                    {errorMessage && (
                        <Typography color='error' sx={{ mt: 2 }}>
                            {errorMessage}
                        </Typography>
                    )}
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} ref={formRef}>
                        {successMessage && (
                            <Alert
                                icon={<LogoutIcon sx={{ color: 'white' }} fontSize="inherit" />}
                                severity="success"
                                sx={{
                                    mt: 2,
                                    position: 'fixed',
                                    bottom: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    mb: 2,
                                    bgcolor: 'success.main',
                                    color: 'white',
                                    borderRadius: '4px',
                                    boxShadow: 3,
                                    p: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: 'auto',
                                    maxWidth: '80%',
                                }}
                            >
                                {successMessage}
                            </Alert>
                        )}
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name='username'
                            autoFocus
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='password'
                            type='password'
                            id='password'

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                        <Button component={RouterLink} to="/signup" variant="text" sx={{ textDecoration: 'underline', textTransform: 'none' }}>
                            Don't have an account? Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>

            <Box
                sx={{
                    display: { xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' },
                    position: 'absolute',
                    top: '50%',
                    right: 0,
                    transform: 'translateY(-50%)',
                    p: 2,
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#f9f9f9',
                    boxShadow: 1,
                    width: '300px',
                    textAlign: 'center',
                }}
            >
                <Typography variant="body2" color="textSecondary">
                    Feeling rebellious? 😈 If you want to bypass the registration and jump straight in, use:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
                    Username: <span style={{ fontFamily: 'monospace' }}>admin</span><br />
                    Password: <span style={{ fontFamily: 'monospace' }}>adminadmin</span>
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    But hey, if you prefer doing things the right way, feel free to register! 😉
                </Typography>
            </Box>

            <Box
                sx={{
                    display: { xs: 'block', sm: 'block', md: 'block', lg: 'none', xl: 'none' },
                    position: 'sticky',
                    bottom: 0,
                    left: 0,
                    backgroundColor: '#f9f9f9',
                    borderTop: '1px solid #e0e0e0',
                    p: 2,
                    borderRadius: '8px',
                    boxShadow: 1,
                    width: '100%',
                    textAlign: 'center',
                }}
            >
                <Typography variant="body2" color="textSecondary">
                    Feeling rebellious? 😈 If you want to bypass the registration and jump straight in, use:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
                    Username: <span style={{ fontFamily: 'monospace' }}>admin</span><br />
                    Password: <span style={{ fontFamily: 'monospace' }}>adminadmin</span>
                </Typography>
            </Box>
        </div>
    )
}

export default Login
