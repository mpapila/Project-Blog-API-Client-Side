import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ErrorResponse } from '../type';
import Loading from '../components/Loading';




function Signup() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState<string[]>([])
    const [errors, setErrors] = useState(false)
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setErrorMessage([])
        e.preventDefault();
        setLoading(true);

        const data = new FormData(e.currentTarget);
        const body = {
            username: data.get('username'),
            email: data.get('email'),
            isAuthor: true,
            password: data.get('password')
        }
        // console.log('body', body)
        const bodyString = JSON.stringify(body)
        const headers = {
            "Content-Type": "application/json"
        }
        const options = {
            body: bodyString,
            method: "POST",
            headers
        }
        const URL = `${apiUrl}/user/new`

        const response: Response = await fetch(URL, options)

        const responsePayload = await response.json();
        if (responsePayload.errors) {
            const newErrors = responsePayload.errors.map((error: ErrorResponse) => (error.msg));
            setErrors(true)
            setErrorMessage(newErrors);
        }

        if (responsePayload.error) {
            console.error(responsePayload.error)
            setErrors(true)
            setErrorMessage([responsePayload.error])
        }
        if (response.ok) {
            setLoading(false);
            navigate('/login', { state: { successMessage: 'User created successfully' } })
        }



    }
    return (
        <div
            style={{ minHeight: '80vh' }}
        >
            {loading && <Loading />}

            <Container component='main' maxWidth="xs" sx={{ backgroundColor: 'white' }}>
                <Box
                    sx={{
                        marginBottom: 8,
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        {errors && (
                            <Box sx={{ mt: 2 }}>
                                {errorMessage.map((msg, index) => (
                                    <Typography key={index} color='error'>
                                        {msg}
                                    </Typography>
                                ))}
                            </Box>
                        )}
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id="email"
                            type='email'
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            type='password'
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete="password"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Button component={RouterLink} to="/login" variant="text" sx={{ textDecoration: 'underline', textTransform: 'none' }}>
                            Already have an account? Sign in
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default Signup
