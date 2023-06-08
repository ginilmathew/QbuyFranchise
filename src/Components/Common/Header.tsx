import { Avatar, Box, Button, Tooltip, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import PaymentsIcon from '@mui/icons-material/Payments';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CustomMenu from './CustomMenu';
import { useRouter } from 'next/router';
import { signOut } from "next-auth/react"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Header = () => {
    const router = useRouter()

    const colorHeader = router.pathname === '/';
    const colorHeader2 = router.pathname === '/smartSuggest';

    const [openDialog, setOpenDialog] = useState<boolean>(false);


    const handleClickOpenDialog = useCallback(() => {
        setOpenDialog(true);
    }, [openDialog]);

    const handleCloseDialog = useCallback(() => {
        setOpenDialog(false);
    }, [openDialog]);

    const NavigateRevenueScreen = useCallback(() => {
        router.push('/')

    }, [])


    const NavigateSuggestScreen = useCallback(() => {
        router.push('/smartSuggest')

    }, [])


    const NavigationToProfile = useCallback(() => {
        router.push('/profile')
    }, [])


    const LogoutAll = useCallback(async () => {

        await localStorage.clear();

        signOut({ callbackUrl: "/login" })

        // router.push('/login')
    }, [])


    return (
        <Box
            height={80}
            bgcolor={'#fff'}
            px={5}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            position={'fixed'}
            width={'100vw'}
            zIndex={100} >

            <Image
                style={{ cursor: 'pointer' }}
                // onClick={Homenavigation}
                // loader={myLoader}
                src='/images/panda.png'
                alt="Picture of the author"
                width={60}
                height={60}
            />
            <Box />
            <Box />
            <Box />
            <CustomMenu onclick={NavigateRevenueScreen} color={colorHeader ? '#58d36e' : '#000'} Icon={PaymentsIcon} label='Revenue' />
            <CustomMenu onclick={NavigateSuggestScreen} color={colorHeader2 ? '#58d36e' : '#000'} Icon={ThumbUpAltIcon} label='Smart Suggest' />
            <Box />
            <Box />


            <Box display={'flex'} gap={1} >
                <Tooltip title='Profile'>
                <Box width={140} height={50} sx={{ background: '#58d36e', cursor: 'pointer' }} borderRadius={10} display={'flex'} justifyContent={'space-between'} alignItems={'center'} onClick={NavigationToProfile}>
                    <Box px={1.5}>
                        <Typography sx={{ fontFamily: `'Poppins' sans-serif`, }}>{'Franchise'}</Typography>
                        <Typography fontSize={12} color={'#fff'} sx={{ fontFamily: `'Poppins' sans-serif`, }}>{'Franchisee'}</Typography>
                    </Box>
                    <Avatar sx={{ height: 40, borderRadius: 10 }}></Avatar>
                </Box>
                </Tooltip>
               
                <Box width={50} height={50} borderRadius={12} sx={{ background: '#58d36e', cursor: 'pointer' }} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <NotificationsIcon sx={{ color: "#fff" }} />
                </Box>
                <Box width={50} height={50} borderRadius={12} sx={{ cursor: 'pointer' }} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Tooltip title="logout here">
                        <LogoutIcon sx={{ fontWeight: 'bold' }} onClick={handleClickOpenDialog} />
                    </Tooltip>

                </Box>
            </Box>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontFamily: `'Poppins' sans-serif` }}>
                    Are you sure you want to log out ?
                </DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Disagree</Button>
                    <Button onClick={LogoutAll} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Header