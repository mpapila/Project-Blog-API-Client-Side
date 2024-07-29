import { Box, Container, Typography } from '@mui/material'

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                py: 3,
                mt: 'auto',
                textAlign: 'center',

            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body1">© 2024 Mehmet Papila. All rights reserved.</Typography>
                <Typography variant="body2">
                </Typography>
            </Container>
        </Box>
    )
}

export default Footer
