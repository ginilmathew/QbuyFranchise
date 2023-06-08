import { fetchData } from '@/CustomAxios';
import { Avatar, Box, Grid, Typography } from '@mui/material'
import useSWR from 'swr'
import React from 'react'
import CustomLabelHeader from '@/Components/Common/CustomLabelHeader';


//below code for swr api call
const fetchuser = async () => {
    const response = await fetchData('franchisee/profile/view')
    const data = await response?.data?.data;
    return data
}



const Profile = () => {

    const { data, error, isLoading } = useSWR('profilelist', fetchuser);

    console.log({ data })


    return (
        <Box px={5} py={2} pt={10} mt={0}>
            <Box py={5}>
                <Typography fontSize={30} color={'#58D36E'} fontWeight={'bold'} sx={{ fontFamily: `'Poppins' sans-serif`, }} letterSpacing={1}>Profile</Typography>
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} py={10} flexDirection={'column'}  >
                <CustomLabelHeader label='Franchisee Name' text={data?.franchise_name}  />
                <CustomLabelHeader label='Owner Name' text={data?.owner_name} />
                <CustomLabelHeader label='Email' text={data?.email} />
                <CustomLabelHeader label='Mobile' text={data?.mobile} />
                <CustomLabelHeader label='Address' text={data?.address} />
                <CustomLabelHeader label='Franchisee ID' text={data?.franchise_id} />
            </Box>
        </Box>
    )
}

export default Profile