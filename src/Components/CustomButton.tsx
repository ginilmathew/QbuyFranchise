import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

type Inputs = {
    label: string,
    onClick: React.MouseEventHandler | any,
    endIcon: boolean,
    startIcon: boolean,
    IconStart: any,
    IconEnd: any,
    height: any,
    btncolor: string,
    disabled?: boolean,
    width?:number

}




const Custombutton = ({ label, onClick, endIcon, startIcon, disabled, IconStart, IconEnd, height, btncolor,width }: Inputs) => {
    return (
        <>

            <Button
                disabled={disabled ? disabled : false}
                variant='contained'
                onClick={onClick} sx={{
                    margin:0,
                    fontFamily: `'Poppins' sans-serif`,
                    height: height,
                    px: 2,
                  
                    width:width ? width : 100,
                    background: btncolor ? btncolor : '#58d36e',
                    color: '#ffff',
                    ':hover': {
                        bgcolor: btncolor ? btncolor : '#58d36e',
                    }
                }}
                startIcon={startIcon && <IconStart />}
                endIcon={endIcon && <IconEnd />}
            >
                {label}
            </Button>


        </>
    )
}

export default Custombutton