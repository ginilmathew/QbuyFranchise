import CustomTable from '@/Components/Common/CustomTable'
import CustomTableHeader from '@/Components/Common/CustomTableHeader'
import { Box, Stack, Typography } from '@mui/material'
import React, { startTransition, useCallback, useState, useEffect, useContext } from 'react'
import { GridColDef } from '@mui/x-data-grid';
import useSWR from 'swr'
import { fetchData } from '@/CustomAxios';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useRouter } from 'next/router';
import ModeContext from '@/Context/type';

//below code for swr api call


const Revenue = () => {
    const { mode } = useContext(ModeContext)


    const router = useRouter();
    const fetchuser = async () => {
        const response = await fetchData(`franchisee/revenue/list/${mode ? mode : process.env.NEXT_PUBLIC_TYPE}`)
        const data = await response?.data?.data;
        return data
    }


    const { data, error, isLoading } = useSWR('revenuelist', fetchuser);


    // console.log({ data })
    const [search, setSearch] = useState<any>(data?.revenue_list);
    const [list, setList] = useState<any>([]);


    // console.log({ list });

    useEffect(() => {
        if (data?.revenue_list?.length > 0) {
            setList(data?.revenue_list)
            setSearch(data?.revenue_list)
        }
    }, [data?.revenue_list])


    const viewRevenuePage = useCallback((id: string) => {
        router.push(`/revenue/view/${id}`)
    }, [])


    const columns: GridColDef[] = [
        {
            field: 'order_id',
            headerName: 'Order ID',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'rider_name',
            headerName: 'Rider Name',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.rider_name ? params.row.rider_name  : '_',

        },
        {
            field: 'store_name',
            headerName: 'Store Name',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.store_name?.map((res:any)=>res),

        },
        {
            field: 'city',
            headerName: 'City',
            flex: 1,
            headerAlign: 'center',
            align: 'center',

        },
        {
            field: 'total_order_income',
            headerName: 'Total Order Income',
            flex: 1,
            headerAlign: 'center',
            align: 'center',

        },
        {
            field: 'vendor_expense',
            headerName: 'vendor Expense',
            flex: 1,
            headerAlign: 'center',
            align: 'center',

        },
        {
            field: 'delivery_charge',
            headerName: 'Delivery Expense',
            flex: 1,
            headerAlign: 'center',
            align: 'center',

        },
        {
            field: 'franchise_profit',
            headerName: 'Profit',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => params.row.franchise_profit?.toFixed(2),

        },
        {
            field: 'Actions',
            headerName: 'Actions',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({ row }) => (
                <Stack alignItems={'center'} gap={1} direction={'row'}>
                    <RemoveRedEyeIcon
                        onClick={() => viewRevenuePage(row?._id)}
                        style={{
                            color: '#58D36E',
                            cursor: 'pointer'
                        }} />

                </Stack>
            )
        }
    ];


    const searchfranchise = (value: any) => {
        let Results = search?.filter((com: any) => com?.order_id.toString().toLowerCase().includes(value.toLowerCase()) || com?.store_name.toString().toLowerCase().includes(value.toLowerCase())
        )
        startTransition(() => {
            setList(Results)
        })
    }

    if (error) return <Box px={5} py={2} pt={10} mt={0}>failed to load</Box>
    if (isLoading) return <Box px={5} py={5} pt={10} mt={0}><Typography sx={{ fontSize: 18 }}>Loading...</Typography></Box>
    if (!data?.revenue_list) return <Box px={5} py={5} pt={10} mt={0}><Typography sx={{ fontSize: 18 }}>Loading...</Typography></Box>
    return (
        <Box px={5} py={2} pt={10} mt={0}>
            <Box bgcolor={"#ffff"} mt={3} p={2} borderRadius={5} height={'100%'}>
                <CustomTableHeader setState={searchfranchise} imprtBtn={false} Headerlabel='Revenue' onClick={null} addbtn={false} />

                <Box py={3}>
                    <CustomTable dashboard={false} columns={columns} rows={list ? list : []} id={"_id"} bg={"#ffff"} label='Recent Activity' storeNumber={data?.total_store_count} citynumber={data?.city_count} />
                </Box>
            </Box>
        </Box>
    )
}

export default Revenue