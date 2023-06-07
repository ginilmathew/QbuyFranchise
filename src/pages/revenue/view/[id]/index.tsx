import CustomHeaderBack from '@/Components/Common/CustomHeaderBack'
import CustomRevenuForm from '@/Components/Forms/CustomRevenuForm'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const RevenueView = () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <Box px={5} py={2} pt={10} mt={0}>
            <CustomHeaderBack backlabel='View Revenue' />
            <CustomRevenuForm id={id} />

        </Box>
    )
}

export default RevenueView