
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import Custombutton from '../CustomButton';
import CutomSearch from './CustomSearch';


interface props {
    Headerlabel: string,
    onClick: any,
    imprtBtn: boolean,
    addbtn: boolean,
    imprtlabel?: string
    onChange?: any,
    setState?: any

}

const CustomTableHeader = ({ Headerlabel, onClick, setState, imprtBtn, addbtn, imprtlabel, onChange }: props) => {

    type Inputs = {
        search: string,

    };

    const { register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        setValue, } = useForm<Inputs>();


    return (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} height={60}>
            <Typography fontSize={30} fontWeight={'bold'} color="#58D36E" letterSpacing={1} sx={{ fontFamily: `'Poppins' sans-serif`, }}>{Headerlabel}</Typography>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={3}>
                <CutomSearch  setState={setState}/>
                {imprtBtn &&
                    <Custombutton btncolor={'#5889D3'} height={40} endIcon={false} startIcon={true} label={imprtlabel ? imprtlabel : 'import Product'} onClick={() => null} IconEnd={KeyboardArrowDownIcon} IconStart={FilterAltIcon} />}
             
                {addbtn &&
                    <Custombutton btncolor='' height={40} endIcon={false} startIcon={true} label={'Add'} onClick={onClick} IconEnd={''} IconStart={AddIcon} />
                }
            </Box>
        </Box>
    )
}

export default CustomTableHeader