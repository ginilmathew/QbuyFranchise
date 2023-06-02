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
            <Box sx={{background:'red',borderRadius:5,display:'flex',alignItems:'center'}}>
                <Typography sx={{color:'#fff'}} px={1} py={.5}>{nuberLabel}</Typography>
            </Box>
        </Box>
    )
}

export default CustomTableContent