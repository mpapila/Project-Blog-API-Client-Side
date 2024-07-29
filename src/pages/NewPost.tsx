import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { Editor } from "@tinymce/tinymce-react"
import React, { useState } from "react"
import { ErrorResponse } from '../type'
import { useNavigate } from "react-router-dom"


const NewPost = () => {
    const [content, setContent] = useState('')
    const token = localStorage.getItem('token')
    const [errors, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string[]>([])
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL
    const tinyApi = import.meta.env.TINYMCE_API_KEY
    const handleContentChange = (newContent: string) => {
        setContent(newContent)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget)
        const body = {
            title: data.get('title'),
            content,
            isPublished: true
        }
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
        const URL = `${apiUrl}/posts/new`
        const response = await fetch(URL, options)
        const responsePayload = await response.json();

        console.log('body', body)
        console.log('responsePayload', responsePayload)
        if (responsePayload.errors) {
            const newErrors = responsePayload.errors.map((error: ErrorResponse) => (error.msg))
            setError(true)
            setErrorMessage(newErrors)
        }
        navigate(`/posts/${responsePayload.id}`, { state: { successMessage: "Post created successfully!" } })
    }

    return (
        <div style={{ minHeight: '80vh', backgroundColor: 'white' }}>
            <Container component='main' >
                <Box
                    sx={{
                        marginLeft: 8,
                        display: 'flex',
                        flexDirection: 'column',

                    }}
                >
                    <Typography component="h1" variant='h5'
                        sx={{ marginTop: 8 }}
                    >
                        Create New Content
                    </Typography>
                    {errors && (
                        <Box sx={{ mt: 2 }}>
                            {errorMessage.map((msg, index) => (
                                <Typography key={index} color='error'>
                                    {msg}
                                </Typography>
                            ))}
                        </Box>
                    )}
                    <Box component='form' onSubmit={handleSubmit} >
                        <TextField
                            sx={{ mt: 4, mb: 4 }}
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoFocus
                        />
                        <Editor
                            apiKey={`${tinyApi}`}
                            value={content}
                            init={{
                                branding: false,
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={handleContentChange}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>

                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default NewPost
