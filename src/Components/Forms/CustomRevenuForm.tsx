import React, { useCallback, useState, useEffect } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Box, Grid, Typography } from '@mui/material';
import CustomBox from '../Common/CustomBox';
import { useForm } from 'react-hook-form';
import CustomInput from '../CustomInputs';
import RevenuViewTable from '@/pages/revenue/Table/revenuViewTable';
import { fetchData } from '@/CustomAxios';
import { toast } from "react-toastify";

type Props = {
    id: any;
}

type Inputs = {
    name: string;
    email: string;
    mobile: string;


}
const CustomRevenuForm = ({ id }: Props) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [revenudata, setRevenuData] = useState<any>(null)



    const schema = yup
        .object()
        .shape({

        })
        .required();



    const { register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        getValues,
        setError,
        setValue, } = useForm<Inputs>({
            resolver: yupResolver(schema),
            defaultValues: {
                name: revenudata?.customer?.name

            }
        });


    const revenueList = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchData(`franchisee/revenue/show/${id}`)
            setRevenuData(response?.data?.data)
        } catch (err: any) {
            toast.error(err?.message);
            setLoading(false);
        } finally {
            setLoading(false)
        }
    }, [id])


    useEffect(() => {
        if (revenudata) {
            setValue('name', revenudata?.customer?.name);
            setValue('mobile', revenudata?.customer?.mobile);
            setValue('email', revenudata?.customer?.email);

        }
    }, [revenudata])




    useEffect(() => {
        revenueList()
    }, [])


    if (!revenudata) return <Box>loading...</Box>
    return (
        <Box>
            <CustomBox title='Customer Details'>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={2.4}>
                        <CustomInput

                            type='text'
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            placeholder={``}
                            fieldLabel={"Customer Name"}
                            disabled={false}
                            view={true}
                            defaultValue={''}
                        />

                    </Grid>
                    <Grid item xs={12} lg={2.4}>
                        <CustomInput
                            type='text'
                            control={control}
                            error={errors.mobile}
                            fieldName="mobile"
                            placeholder={``}
                            fieldLabel={"Customer mobile"}
                            disabled={false}
                            view={true}
                            defaultValue={''}
                        />

                    </Grid>
                    <Grid item xs={12} lg={2.4}>
                        <CustomInput
                            type='text'
                            control={control}
                            error={errors.email}
                            fieldName="email"
                            placeholder={``}
                            fieldLabel={"Customer Email"}
                            disabled={false}
                            view={true}
                            defaultValue={''}
                        />

                    </Grid>

                </Grid>

            </CustomBox>
            <CustomBox title='Product Details'>
                {revenudata &&
                    <RevenuViewTable res={revenudata} />}

            </CustomBox>
            <CustomBox title='Payment Details'>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={2.4}>
                        <Typography>Order ID: {revenudata?.order?.paymentDetails?.orderId}</Typography>
                    </Grid>
                    <Grid item xs={12} lg={2.4}>
                        <Typography>Payment Type : {revenudata?.order?.payment_type}</Typography>
                    </Grid>
                    <Grid item xs={12} lg={2.4}>
                        <Typography>Payment Status : {revenudata?.order?.payment_status}</Typography>
                    </Grid>

                </Grid>




            </CustomBox>
        </Box>
    )
}

export default CustomRevenuForm