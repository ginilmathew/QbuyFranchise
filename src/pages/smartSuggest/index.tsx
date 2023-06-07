import CustomMap from '@/Components/Common/CustomMap'
import { postData } from '@/CustomAxios'
import { Box, Typography } from '@mui/material'
import React from 'react'
import useSWR from 'swr'
const fetchuser = async () => {
  const value = {
    type: process.env.NEXT_PUBLIC_TYPE
  }

  const response = await postData('franchisee/smartsuggest', value)
  const data = await response.data.data;
  return data
}



const SmartSuggest = () => {

  const { data, error, isLoading } = useSWR('revenuelist', fetchuser, { refreshInterval: 1000 });

  console.log({ data },'FETCH FRACHISE')
  return (
    <Box px={5} py={2} pt={10} mt={0}>
      <Box my={5}>
        <Typography sx={{ color: '#58d36e', fontSize: 30, fontWeight: 'bold', letterSpacing: 1, fontFamily: `'Poppins' sans-serif`, }}>Smart Suggest</Typography>
        <Box >
          <CustomMap path={location} onComplete={null} />
        </Box>
      </Box>
    </Box>
  )
}

export default SmartSuggest