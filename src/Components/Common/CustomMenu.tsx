import { Box, Typography } from '@mui/material'
import React from 'react'

type props = {
    Icon: any,
    label: string,
    color: string,
    onclick: any

}


const CustomMenu = ({ Icon, label, color, onclick }: props) => {
    return (
        <Box onClick={onclick} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
            <Icon sx={{ color: color }} />
            <Typography sx={{ color: color }} fontSize={22}>{label}</Typography>
        </Box>
    )
}

export default CustomMenu