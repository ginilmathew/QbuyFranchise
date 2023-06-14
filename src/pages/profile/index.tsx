import { fetchData } from '@/CustomAxios';
import { Avatar, Box, Grid, MenuItem, Typography } from '@mui/material'
import useSWR from 'swr'
import React, { useContext, useState, useEffect } from 'react'
import CustomLabelHeader from '@/Components/Common/CustomLabelHeader';
import CustomBox from '@/Components/Common/CustomBox';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm, SubmitHandler } from "react-hook-form";
import { types } from 'util';
import Customselect from '@/Components/CustomSelect';
import ModeContext from '@/Context/type';



type inputform = {
    types: any
}

//below code for swr api call
const fetchuser = async () => {
    const response = await fetchData('franchisee/profile/view')
    const data = await response?.data?.data;
    return data
}



const Profile = () => {


    const { mode, setMode } = useContext(ModeContext);

    console.log({ mode })
    const { data, error, isLoading } = useSWR('profilelist', fetchuser);



    const [type, setType] = useState<{ value: string; id: number, name: string }[]>([{ value: 'green', id: 1, name: 'Green' }, { value: 'fashion', id: 2, name: 'Fashion' }, { value: 'panda', id: 3, name: 'Panda' }])

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
        setValue, } = useForm<any>({
            resolver: yupResolver(schema),
        });



    const ChangeMode = (e: any) => {
        const { value } = e.target;
        setMode(value)

    }


    useEffect(() => {
        setValue('types', mode ? mode : process.env.NEXT_PUBLIC_TYPE)
        setMode(mode ? mode : process.env.NEXT_PUBLIC_TYPE)
    }, [mode])


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
                    <Grid item xs={12} lg={3} mt={1}>
                        <Customselect
                            multiple={true}
                            control={control}
                            error={errors.types}
                            fieldName="types"
                            placeholder={``}
                            fieldLabel={"Change Type"}
                            readOnly={false}
                            values={mode}
                            onChangeValue={ChangeMode}
                            type=''
                        >
                            <MenuItem value=" " disabled >
                                <>Change Type</>
                            </MenuItem>
                            {type && type.map((res: any) => (
                                <MenuItem key={res?.id} value={res?.value}>{res?.name}</MenuItem>
                            ))}
                        </Customselect>
                    </Grid>

                </Grid>

            </CustomBox>
        </Box>
    )
}

export default Profile