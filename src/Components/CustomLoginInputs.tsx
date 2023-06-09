import React, { useState, memo } from 'react'
import { Controller } from "react-hook-form";
import { Avatar, Box, FormGroup, styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


type Inputs = {
    control: any,
    fieldName: string,
    placeholder: string,
    error: any,
    Icon: any,

};



const CustomLoginInput = ({ control, fieldName, placeholder, error, Icon }: Inputs) => {

    return (
        <>
            <FormGroup>
                <Controller
                    name={fieldName}
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <>
                            <TextField
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                // {...field}
                                aria-invalid={error ? "true" : "false"}
                                className="form-control"
                                placeholder={placeholder}
                                id="exampleInputEmail1"
                                type={'number'}
                                InputProps={{
                                    // disableUnderline: true,
                                    style: {
                                        opacity: "1",
                                        background: "#ffff",
                                        height: "48px",
                                        fontFamily: `'Poppins' sans-serif`,
                                        letterSpacing: "1px",
                                        fontWeight: '600px',
                                        width: 280
                                    },
                                    startAdornment: (
                                        <InputAdornment position={'start'}>
                                            <Box display={'flex'} alignItems={'center'}>
                                                <Icon sx={{ color: '#58d36e', }} />
                                            </Box>
                                        </InputAdornment>
                                    ),

                                }}
                            />
                        </>
                    )}
                />
                {error && (
                    <p
                        role="alert"
                        style={{
                            color: "red",
                            display: "flex",
                            paddingLeft: "5px",
                            fontSize: "12px",
                            fontFamily: `'Poppins' sans-serif`
                        }}
                    >
                        {error?.message}
                    </p>
                )}
            </FormGroup>
        </>
    )
}

export default CustomLoginInput