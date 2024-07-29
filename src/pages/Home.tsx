import { Alert, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import FloatingAddButton from "../components/FloatingAddButton";
import travelBackground from '../public/travel-background.jpg'
import { useEffect, useState } from "react";
import { LocationType, PostData } from "../type";
import CheckIcon from '@mui/icons-material/Check';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link, useLocation } from "react-router-dom";
import Loading from "../components/Loading";


function Home() {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState<PostData>()
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const location = useLocation();
    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        // setTimeout(function () {
        //     setLoading(false)
        // }, 5000)
        const state: LocationType = location.state;
        if (state?.successMessage) {
            setSuccessMessage(state?.successMessage)
            setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
        }

        fetch(`${apiUrl}/posts`)
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                setLoading(false);
            });
    }, [])

    // console.log('posts', posts)

    return (
        <>
            <FloatingAddButton />
            <Box
                sx={{
                    backgroundImage: `url(${travelBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: "300px",
                    justifyContent: 'center',
                    alignItems: "center"
                }}
            >
            </Box>

            {loading && (<Loading />)}

            <Grid container spacing={2} mt='25px' mb='25px' ml={0}>
                {posts?.allPosts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <Card sx={{
                            maxWidth: 345, minHeight: 200, maxHeight: 200, marginRight: '3px', marginBottom: '3px',
                            // backgroundColor: '#001C30'
                            backgroundColor: '#F6F6F6'
                        }}>
                            <CardContent  >
                                <Typography variant="body2" color='GrayText'>
                                    {new Date(post.date).toDateString()}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div" color='#111827'>
                                    {post.title.length > 30 ? `${post.title.substring(0, 20)}...` : post.title}
                                </Typography>
                                <Typography variant="body2" color='GrayText' component="div">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: `${post.content.substring(0, 100)}...` }}
                                    />
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                    marginRight: '3px',
                                    marginTop: '20px'
                                }}><Link style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    textDecoration: 'none',
                                    color: 'inherit'
                                }} to={`/posts/${post.id}`}

                                >
                                        <ChatBubbleOutlineIcon fontSize='small' />
                                        {post.comment.length}
                                    </Link>
                                    <Link to={`/posts/${post.id}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "#111827",
                                        }}>
                                        <Typography variant='body2' display="flex" justifyContent="end"> Read</Typography>
                                    </Link>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {successMessage && (
                <Alert
                    icon={<CheckIcon sx={{ color: 'white' }} fontSize="inherit" />}
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

        </>
    )
}

export default Home
