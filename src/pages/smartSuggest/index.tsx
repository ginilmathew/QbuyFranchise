import CustomMap from '@/Components/Common/CustomMap'
import { Box, Typography } from '@mui/material'
import React from 'react'

const SmartSuggest = () => {


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