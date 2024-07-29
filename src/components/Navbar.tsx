import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === 'undefined' || !token) {
            if (location.pathname !== '/signup') {
                navigate('/login');
                localStorage.removeItem('token');
            }
        } else {
            setIsLoggedIn(true);
            fetch(`${apiUrl}/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then(data => setUsername(data.users.username))
                .catch(error => console.log('Error', error));
        }
    }, [navigate]);


    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false)
        navigate('/login', { state: { successMessage: 'You have successfully logged out' } })
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" sx={{ margin: 0 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button component={RouterLink} to='/' sx={{ textDecoration: 'none', color: '#fff' }}>
                        Homepage
                    </Button>
                    {isLoggedIn ? (
                        <>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Typography sx={{
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'blue[500]',
                                    fontSize: '14px',
                                    padding: '6px 16px', fontWeight: '300',
                                }} >Hello, {username.charAt(0).toUpperCase() + username.slice(1)}</Typography>
                                <Button onClick={handleLogout} color="inherit">Logout</Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button component={RouterLink} to="/login" color="inherit">Login</Button>
                                <Button component={RouterLink} to="/signup" color="inherit">Register</Button>
                            </Box>
                        </>
                    )}

                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default Navbar
