import { Box, Typography } from '@mui/material'
import React from 'react'

const CustomMapCountCard = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                boxShadow: .5,
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                width: 100,
                borderRadius: 2
            }} px={1} py={1} border={'2px solid #7EDD8F'}>
            <Typography sx={{  fontFamily: `'Poppins' sans-serif`,fontSize:14}}>Store</Typography>
            <Box sx={{
                padding: 2,
                height: 20,
                width: 25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                background: 'red',
                position: 'absolute', right: -5,
                top: -10
            }}>
                <Typography style={{ fontSize: '12', color: '#ffff' ,  fontFamily: `'Poppins' sans-serif`}}>10</Typography>

            </Box>
        </Box>
    )
}

export default CustomMapCountCard