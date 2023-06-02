import Reactm, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import { Box, Stack, styled, Typography } from '@mui/material'
import Image from 'next/image'
import Custombutton from '@/Components/CustomButton';
import { useRouter } from 'next/router';
import UserContext from '@/Context/user';
import { signIn } from 'next-auth/react'
import { toast } from "react-toastify";
const OTP = () => {


    const router = useRouter()


    const [otp, setOTP] = useState(['', '', '', '']);
    const { mobile } = useContext(UserContext);


    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleOTPChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);

        // Move focus to the next input
        if (value !== '' && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        // Prevent entering non-numeric characters
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }

        // Move focus to the previous input on Backspace/Delete if the current input is empty
        if ((event.key === 'Backspace' || event.key === 'Delete') && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        // Focus the first input when the component mounts
        inputRefs.current[0]?.focus();
    }, []);



    const NavigateToHome = useCallback(async () => {

        try {
            const res = await signIn('credentials', {
                redirect: false,
                mobile: mobile,
                otp: otp.join(''),
                callbackUrl: `${window.location.origin}`,
            });

            console.log({ res }, "OTP RES")
            if (res?.error) {
                toast.error(res.error)
                console.log({ response: res?.error })
            } else {
                if (res?.url) {
                    //auth.setUser(session?.user)
                    console.log("in")
                    //router.push('/home');
                    router.push(res?.url);
                }
                else {
                    //console.log({sessions: session})
                    router.push('/');
                }
            }
        } catch (error) {
            console.log({ error }, "OTP ERROR")
        }
    }, [otp]);


    return (
        <Box sx={{ height: '100vh', backgroundImage: `url('/images/login.png')`, objectFit: 'contain', display: 'flex', justifyContent: 'center' }}>
            <Stack justifyContent={'center'} alignItems={'center'} gap={3}>
                <Image
                    // loader={myLoader}
                    src='/images/panda.png'
                    alt="Picture of the author"
                    width={100}
                    height={100}
                />
                <Typography letterSpacing={1} fontSize={14} sx={{  fontFamily: `'Poppins' sans-serif`}}>A OTP has been sent to your registered mobile number</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {otp.map((value, index) => (
                        <input
                            style={{ width: 50, textAlign: 'center', height: 50, border: 'none', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: 5, fontSize: 18 }}
                            key={index}
                            type="text"
                            maxLength={1} // Specify the maximum length of each input
                            value={value}
                            onChange={(event) => handleOTPChange(index, event)}
                            onKeyUpCapture={(event) => handleKeyPress(index, event)}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                        />
                    ))}
                </Box>
                <Box px={100} display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
                    <Typography style={{ width: 150 }}></Typography>
                    <Typography fontSize={14} fontWeight={'bold'} letterSpacing={1} sx={{  fontFamily: `'Poppins' sans-serif`}}>Resend OTP</Typography>
                </Box>

                <Custombutton
                    width={100}
                    disabled={false}
                    btncolor=''
                    height={40}
                    IconEnd={""}
                    IconStart={''}
                    startIcon={false}
                    endIcon={false}
                    onClick={NavigateToHome}
                    label='Confirm' />
            </Stack>
        </Box>
    )
}

export default OTP

OTP.auth = true