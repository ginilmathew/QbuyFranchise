import { Box, Typography } from '@mui/material'
import React from 'react'

type props = {
    label: string;
    text: string
}

const CustomLabelHeader = ({ label, text }: props) => {
    return (
        <Box mt={.5}>
            <Typography py={.5} sx={{ fontFamily: `'Poppins' sans-serif`, fontSize: 16, letterSpacing: .5 }}>{label}</Typography>
            <Typography style={{ border: '1px solid #bdbdbd', minHeight: 40,width:'100%', alignItems: 'center', display: 'flex', paddingLeft: 3, fontFamily: `'Poppins' sans-serif`, fontSize: 14, borderRadius: 5, letterSpacing: 1 }}>{text}</Typography>
        </Box>
    )
}

export default CustomLabelHeader