import { Box, Stack, Typography } from '@mui/material'
import React, { useCallback, useContext, useState } from 'react'
import Image from 'next/image';
import CustomLoginInput from '@/Components/CustomLoginInputs';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm, SubmitHandler } from "react-hook-form";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Custombutton from '@/Components/CustomButton';
import { useRouter } from 'next/router';
import { postData } from '@/CustomAxios';
import { toast } from "react-toastify";
import UserContext from '@/Context/user';
const Login = () => {

    const router = useRouter();

    const { setMobile } = useContext(UserContext);

    const [isLoading, setIsloading] = useState<any>(false)

    type Inputs = {
        mobile: any,

    };

    interface IFormInput {
        mobile: any,

    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const schema = yup
        .object()
        .shape({
            mobile: yup.string().matches(phoneRegExp, 'Phone number is not valid').max(10,'maximum number 10').required('A phone number is required'),
        })
        .required();


    const { register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        setValue, } = useForm<Inputs>({
            resolver: yupResolver(schema),
        });

    const NavigateToOtp: SubmitHandler<IFormInput> = useCallback(async (data) => {
        try {
            setIsloading(true);
            await postData('auth/franchiseloginotp', data);
            toast.success(`An OTP send to your registered number`);
            setMobile(data?.mobile);
            router.push('/otp');
        } catch (err: any) {
            toast.error(err?.message);
            setIsloading(false);
        } finally {
            setIsloading(false);
        }
    }, []);





    return (
        <Box sx={{ height: '100vh', backgroundImage: `url('/images/login.png')`, objectFit: 'contain', display: 'flex', justifyContent: 'center' }}>
            <Stack justifyContent={'center'} alignItems={'center'} gap={2}>
                <Image
                    // loader={myLoader}
                    src='/images/panda.png'
                    alt="Picture of the author"
                    width={100}
                    height={100}
                />
                <Typography letterSpacing={1} fontSize={14}>Please enter your login details </Typography>
                <CustomLoginInput
                    Icon={LocalPhoneIcon}
                    control={control}
                    error={errors.mobile}
                    fieldName="mobile"
                    placeholder={`Phone Number`} />

                <Custombutton
                    width={100}
                    disabled={false}
                    btncolor=''
                    height={40}
                    IconEnd={""}
                    IconStart={''}
                    startIcon={false}
                    endIcon={false}
                    onClick={handleSubmit(NavigateToOtp)}
                    label='login' />
            </Stack>
        </Box>
    )
}

export default Login
Login.auth = true