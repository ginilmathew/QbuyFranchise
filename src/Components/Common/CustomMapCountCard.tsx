import { Box, Typography } from '@mui/material'
import React, { memo } from 'react'

type props = {
    label :string,
    count:number,
    all?:boolean,
    width?:number,
    color:string,
    onclick:any;
}


const CustomMapCountCard = memo(({label,count,all,width,color,onclick}:props) => {
  
    return (
        <Box
            onClick={()=>onclick()}
            sx={{
                cursor:'pointer',
                position: 'relative',
                boxShadow: .5,
                display: 'flex',
                alignItems: 'center',
                background: color,
                width:width ? width : 100,
                borderRadius: 2
            }} px={1} py={1} border={'2px solid #7EDD8F'}>
            <Typography sx={{  fontFamily: `'Poppins' sans-serif`,fontSize:14}}>{label}</Typography>
            {!all &&
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
                <Typography style={{ fontSize: '12', color: '#ffff' ,  fontFamily: `'Poppins' sans-serif`}}>{count}</Typography>

            </Box>}
        </Box>
    )
})

export default CustomMapCountCard