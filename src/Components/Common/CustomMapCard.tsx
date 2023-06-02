import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

const CustomMapCard = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: 1 }}>
            <Box>
                <Avatar src='/images/panda.png' sx={{ height: 35, width: 35 }} variant='rounded'></Avatar>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
                <Typography sx={{ fontSize: 12, letterSpacing: .5, fontWeight: 'bold', fontFamily: `'Poppins' sans-serif` }}>ammu</Typography>
                <Typography sx={{ fontSize: 10, letterSpacing: 1, color: 'grey', fontFamily: `'Poppins' sans-serif` }}>ID:#00000</Typography>
                <Typography sx={{ fontSize: 10, letterSpacing: 1, color: 'grey', fontFamily: `'Poppins' sans-serif` }}>Current Status:<span style={{ color: 'red', fontFamily: `'Poppins' sans-serif` }}>Offline</span> </Typography>
            </Box>

        </Box>
    )
}

export default CustomMapCard