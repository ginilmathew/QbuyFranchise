import { Box, Typography } from '@mui/material'
import React from 'react'

type props = {
    label: string,
    nuberLabel:number
}


const CustomTableContent = ({ label,nuberLabel }: props) => {
    return (
        <Box display={'flex'} justifyContent={'center'} gap={1} border={'2px solid #daf5df'} px={2} py={1} alignItems={'center'} >
            <Typography>{label}</Typography>
            <Box sx={{ padding: 2,
                height: 20,
                width: 25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                background: 'red',
         
                }}>
                <Typography sx={{color:'#fff'}}>{nuberLabel}</Typography>
            </Box>
        </Box>
    )
}

export default CustomTableContent