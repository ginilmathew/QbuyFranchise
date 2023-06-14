import React, { useState } from "react";
import { Box, FormGroup, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
type props = {
    fieldName: string,
    control: any,
    fieldLabel: string,
    placeholder: string,
    error: any,
    type: string,
    readOnly: boolean
    multiple: any,
    selectvalue?: any,
    onChangeValue: any,
    children?: React.ReactNode,
    values: any

}


const Customselect = ({ fieldLabel, control, error, fieldName, readOnly, multiple, onChangeValue, children, values }: props) => {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    // const ITEM_HEIGHT = 48;
    // const ITEM_PADDING_TOP = 8;
    // const MenuProps = {
    //     PaperProps: {
    //         style: {
    //             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,

    //         },
    //     },
    // };

    return (
        <>
        
            <FormGroup >
                <Typography
                    letterSpacing={.5} px={'3px'} mb={'3px'}
                    paddingLeft={1}
                    sx={{
                        fontSize: {
                            lg: 16,
                            md: 14,
                            sm: 12,
                            xs: 11,
                        },
                        fontFamily: `'Poppins' sans-serif`,


                    }}>{fieldLabel}</Typography>
                <Controller
                    name={fieldName}
                    control={control}

                    render={({ field: { onBlur, onChange, value } }) => (
                        <Select
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            readOnly={readOnly}

                            IconComponent={() => (

                                <Box
                                    borderRadius={5}
                                    mx={1}
                                    sx={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={handleOpen}
                                    display="flex"
                                    justifyContent={"center"}
                                    alignItems="center"
                                    bgcolor="#58d36e"
                                    color={"#fff"}

                                >
                                    <KeyboardArrowDownIcon style={{ fontSize: 20, fontWeight: 'bold' }} />
                                </Box>
                            )}
                           
                            displayEmpty
                            onChange={(e) => {
                                onChangeValue ? onChangeValue(e) :
                                    onChange(e)
                            }}
                            value={values}


                            //   input={<OutlinedInput label="Name" />}


                            style={{
                                opacity: "1",
                                background: '#ffff',
                                height: "40px",
                                letterSpacing: "1px",
                                fontWeight: '700px',
                                border: 'none',
                                fontFamily: `'Poppins' sans-serif`,


                            }}

                        >
                            {children}
                        </Select>
                    )}
                />

                {error && (
                    <p
                        role="alert"
                        style={{
                            color: "red",
                            display: "flex",
                            paddingLeft: "10px",
                            fontSize: "12px",
                        }}
                    >
                        {error?.message}
                    </p>
                )}
            </FormGroup>
        </>
    )
}

export default Customselect