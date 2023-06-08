import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

type props = {
    res: any
}


const RevenuViewTable = ({ res }: props) => {

    console.log({ res })

    return (
        <Box>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="center">Restaurant</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Unit Price</TableCell>
                            <TableCell align="center">Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {res?.order?.product_details?.map((row: any) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                   {row?.productdata?.store?.name}
                                </TableCell>
                                <TableCell align="center">{row.store?.name}</TableCell>
                                <TableCell align="center">{row.quantity}</TableCell>
                                <TableCell align="center">{row?.unitPrice}</TableCell>
                                <TableCell align="center">{row?.quantity * row?.unitPrice}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow >
                            <TableCell rowSpan={5} />
                            <TableCell colSpan={2}></TableCell>
                            <TableCell align="right">Sub-Total</TableCell>
                            <TableCell align="center">₹ {res?.order?.total_amount}</TableCell>
                        </TableRow>
                        {/* <TableRow>
              
              <TableCell colSpan={2}></TableCell>
              <TableCell align="right" >Platform & Other Charges </TableCell>
              <TableCell align="center">{0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}></TableCell>
              <TableCell align="right" >Multi Shop Pickup(No extra Seller)</TableCell>
              <TableCell align="center">{0}</TableCell>
            </TableRow> */}
                        <TableRow>
                            <TableCell colSpan={2}></TableCell>
                            <TableCell align="right" >Delivery Charge (SlotBased)</TableCell>
                            <TableCell align="center">₹ {res?.order?.delivery_charge}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}></TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="center">₹ {res?.order?.grand_total}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}></TableCell>
                            <TableCell align="right">Franchise Profit</TableCell>
                            <TableCell align="center">₹ {res?.franchise_profit}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}></TableCell>
                            <TableCell align="right">Franchise Revenue</TableCell>
                            <TableCell align="center">₹ {res?.franchise_revenue}</TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </TableContainer>
        </Box>
    )
}

export default RevenuViewTable