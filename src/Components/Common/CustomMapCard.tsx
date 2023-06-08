import { IMAGE_URL } from '@/Config'
import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

type props = {
    data: any

}
const CustomMapCard = ({ data }: props) => {

    console.log({ data })

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: 1 }}>
            <Box>
                <Avatar src={`${IMAGE_URL}${data?.logo}`} sx={{ height: 45, width: 45 }} variant='rounded'></Avatar>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
                <Typography sx={{ fontSize: 12, letterSpacing: 1, fontWeight: 'bold', fontFamily: `'Poppins' sans-serif` }}>{data?.name}</Typography>
                <Typography sx={{ fontSize: 10, letterSpacing: 1, color: 'grey', fontFamily: `'Poppins' sans-serif` }}>ID:#{data?.id}</Typography>
                <Typography sx={{ fontSize: 10, letterSpacing: 1, color: 'grey', fontFamily: `'Poppins' sans-serif` }}>Current Status:<span style={{ color: data?.status === 'active' ? 'green' : 'red', fontFamily: `'Poppins' sans-serif` }}>{data?.status}</span> </Typography>
            </Box>

        </Box>
    )
}

export default CustomMapCard