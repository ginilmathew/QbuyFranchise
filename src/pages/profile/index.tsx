import { fetchData } from '@/CustomAxios';
import { Avatar, Box, Grid, Typography } from '@mui/material'
import useSWR from 'swr'
import React from 'react'
import CustomLabelHeader from '@/Components/Common/CustomLabelHeader';
import CustomBox from '@/Components/Common/CustomBox';


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








            <CustomBox title='Details'>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={3}>
                        <CustomLabelHeader label='Franchisee Name' text={data?.franchise_name} />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <CustomLabelHeader label='Owner Name' text={data?.owner_name} />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <CustomLabelHeader label='Email' text={data?.email} />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <CustomLabelHeader label='Mobile' text={data?.mobile} />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <CustomLabelHeader label='Address' text={data?.address} />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <CustomLabelHeader label='Franchisee ID' text={data?.franchise_id} />
                    </Grid>

                </Grid>

            </CustomBox>
        </Box>
    )
}

export default Profile