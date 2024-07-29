import { Box, Container, Fab, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';

function FloatingAddButton() {


    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'end'
                }}
            >
                <Tooltip title='Add New Content!'
                    sx={{
                        '& .MuiTooltip-tooltip': {
                            bgcolor: 'primary.main',
                            fontSize: '5rem', // Adjust the font size as needed
                        },
                    }}
                >
                    <Box
                        sx={{
                            position: "fixed",
                            bottom: (theme) => theme.spacing(2),
                        }}>
                        <Fab color="primary" component={RouterLink} to="/posts/new"  >
                            <AddIcon />
                        </Fab>
                    </Box>
                </Tooltip>
            </Container >
        </>
    )
}

export default FloatingAddButton


