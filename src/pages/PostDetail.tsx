import { useEffect, useRef, useState } from 'react'
import { PostData } from '../type'
import { useLocation, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import FloatingAddButton from '../components/FloatingAddButton'
import { Alert, Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { LocationType } from '../type';
import CheckIcon from '@mui/icons-material/Check';



function PostDetail() {
    const [post, setCurrentPost] = useState<PostData>()
    const { postId } = useParams<{ postId: string }>()
    const [loading, setIsLoading] = useState(true)
    const formRef = useRef<HTMLFormElement>(null);
    const token = localStorage.getItem("token");
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const location = useLocation()
    const apiUrl = import.meta.env.VITE_API_URL



    // const navigate = useNavigate();



    console.log('post', post)


    useEffect(() => {

        const state: LocationType = location.state;

        if (state?.successMessage) {
            setSuccessMessage(state?.successMessage)
            setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
        }

        fetch(`${apiUrl}/posts/${postId}`)
            .then(response => response.json())
            .then(data => {
                setCurrentPost(data)
                setIsLoading(false)
            })
            .catch(err => console.log('Error ', err))
    }, [])

    if (!post) {
        return <Loading />;
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const body = { comment: data.get('comment') }
        const bodyString = JSON.stringify(body)
        const headers = {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
        const options = {
            body: bodyString,
            method: "POST",
            headers,
        }
        const URL = `${apiUrl}/posts/${postId}/comment/new`
        const response = await fetch(URL, options)
        const responsePayload = await response.json()
        if (responsePayload.message) {
            console.log('success', responsePayload)
            if (formRef.current) {
                formRef.current.reset()
            }
            setIsLoading(true)
            fetch(`${apiUrl}/posts/${postId}`)
                .then(response => response.json())
                .then(data => setCurrentPost(data))
                .catch(err => console.log('Error ', err))
            setIsLoading(false)
            setSuccessMessage('Your comment has been posted.')
            setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
        } else {
            console.log('failed', responsePayload)
        }
    };

    return (
        <>

            {loading && (<Loading />)}
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
            <div >
                <FloatingAddButton />
                <Box sx={{
                    padding: '25px',
                    width: 'auto',
                    backgroundColor: '#F6F6F6',
                    borderRadius: 1,
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'end',
                            marginRight: '15px',
                            marginBottom: '20px'
                        }}
                    >
                        <Typography
                            variant="body1" color='GrayText'
                            sx={{ lineHeight: 2 }}
                        >
                            {new Date(post.date).toDateString()}
                        </Typography>
                        <Typography variant='body1' color='GrayText'>
                            {post.user.username.charAt(0).toUpperCase() + post.user.username.slice(1)}
                        </Typography>
                    </Box>
                    <Typography variant='h4' marginBottom='20px'>
                        {post?.title}
                    </Typography>
                    <Typography component="div">
                        <div
                            dangerouslySetInnerHTML={{ __html: `${post.content}` }}
                        />
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        ref={formRef}
                        sx={{
                            padding: '40px 40px 0'
                        }}
                    >
                        <Typography variant='h5' marginBottom='20px'>
                            Leave a comment
                        </Typography>
                        <Typography variant='subtitle1'>
                            Message
                        </Typography>
                        <TextField
                            label="Your Comment"
                            id='comment'
                            name='comment'
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ marginBottom: 2 }}
                        />
                        <Button type='submit' variant='contained' color='primary'>
                            Submit
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            padding: '40px'
                        }}
                    >
                        <Typography variant='h5' marginBottom='20px'>
                            Leave a comment ({post.comment.length})
                        </Typography>
                        <Box
                            sx={{
                                padding: '0 40px 40px',
                            }}
                        >
                            {post.comment.map((eachComment) => (
                                <Box key={eachComment.id}>
                                    <Card sx={{
                                        marginBottom: 2,
                                    }}>
                                        <CardContent

                                            sx={{
                                                padding: '14px',

                                            }}
                                        >
                                            <Typography fontWeight='bold' variant='subtitle1'
                                                sx={{ lineHeight: '.75' }}
                                            >
                                                {eachComment.user.username.charAt(0).toUpperCase() + eachComment.user.username.slice(1)}
                                            </Typography>
                                            <Typography variant="caption" color='GrayText'
                                                sx={{ fontSize: '0.63rem' }}
                                            >
                                                {new Date(eachComment.date).toLocaleString("en-US")}
                                            </Typography>
                                            <Typography marginTop='5px' marginBottom={0}
                                                fontSize='14px'
                                            >
                                                {eachComment.content}
                                            </Typography>
                                        </CardContent>
                                    </Card>

                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </div >
        </>
    )
}

export default PostDetail
