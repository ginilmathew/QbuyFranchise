import CustomTable from '@/Components/Common/CustomTable'
import CustomTableHeader from '@/Components/Common/CustomTableHeader'
import { Box } from '@mui/material'
import React from 'react'
import { GridColDef } from '@mui/x-data-grid';
import useSWR from 'swr'
import { fetchData } from '@/CustomAxios';


//below code for swr api call
const fetchuser = async () => {
    const response = await fetchData('franchisee/revenue/list')
    const data = await response.data.data;
    return data
}


const Revenue = () => {


    const { data, error, isLoading } = useSWR('revenuelist', fetchuser);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Order ID',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'name',
            headerName: 'Rider Name',
            flex: 1,
            headerAlign: 'center',
            align: 'center',

        },
        {
            field: 'storename',
            headerName: 'Store Name',
            flex: 1,
            headerAlign: 'center',
            align: 'center',

        },
        {
            field: 'city',
            headerName: 'City',
            flex: 1,
            headerAlign: 'center',
            align: 'center',

        },
        {
            field: 'TotalIncom',
            headerName: 'Total Order Income',
            flex: 1,
            headerAlign: 'center',
            align: 'center',

        },
        {
            field: 'vendorexpense',
            headerName: 'vendor Expense',
            flex: 1,
            headerAlign: 'center',
            align: 'center',

        },
        {
            field: 'deliveryExpress',
            headerName: 'Delivery Expense',
            flex: 1,
            headerAlign: 'center',
            align: 'center',

        },
        {
            field: 'profilt',
            headerName: 'Profit',
            flex: 1,
            headerAlign: 'center',
            align: 'center',

        },
        {
            field: 'Actions',
            headerName: 'Actions',
            flex: 1,
            headerAlign: 'center',
            align: 'center',

        },
    ]

    const row = [{
        id: '001',
        name: 'ginil',
        storename: 'MY Store',
        city: 'Thodupuzha',
        TotalIncom: '1000',
        vendorexpense: '1111',
        deliveryExpress: '30',
        profilt: '400'
    }]

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return (
        <Box px={5} py={2} pt={10} mt={0}>
            <Box bgcolor={"#ffff"} mt={3} p={2} borderRadius={5} height={'100%'}>
                <CustomTableHeader setState={''} imprtBtn={false} Headerlabel='Revenue' onClick={null} addbtn={false} />
                <Box py={3}>
                    <CustomTable dashboard={false} columns={columns} rows={row} id={"id"} bg={"#ffff"} label='Recent Activity' storeNumber={data?.total_store_count} />
                </Box>
            </Box>
        </Box>
    )
}

export default Revenue