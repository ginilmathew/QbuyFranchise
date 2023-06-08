import React from 'react'
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Custombutton from '../CustomButton';
import CustomTableContent from './CustomTableContent';
type props = {
    label: string
    columns: any,
    rows: any,
    id: string,
    bg: string,
    dashboard: boolean,
    rowheight?: number,
    storeNumber: number,
    citynumber:number
}
const CustomTable = ({ columns, rows, id, bg, label, dashboard, rowheight, storeNumber ,citynumber}: props) => {
    let texttruncate = label.slice(0, 3);
    let custtext = label.slice(3)

    return (
        <>

            <Box height={'60vh'} boxShadow={0} mb={10}>
                <DataGrid
                    style={{
                        background: "#ffff",
                        borderRadius: '0px 0px 5px 5px',
                        opacity: 1,
                        fontFamily: `'Poppins' sans-serif`,
                        fontWeight: '200',
                        letterSpacing: '.5px'
                    }}
                    rowHeight={rowheight ? rowheight : 60}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    getRowId={row => row[id]}
                />
                <Box mt={5} mb={2} display={'flex'} alignItems={'center'} gap={2}>
                    <CustomTableContent label='Cities' nuberLabel={citynumber} />
                    <CustomTableContent label='Stores' nuberLabel={storeNumber} />
                </Box>
            </Box>

        </>
    )
}

export default CustomTable