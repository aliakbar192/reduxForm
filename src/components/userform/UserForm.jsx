import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button, TextField, Typography, Container, Box, Paper } from '@mui/material';
import Data from './form-data.json';
import { createUserData } from '../../redux/reducers/userData';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [formData, setFormData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.userdata);
    useEffect(() => {
        setFormData(Data);
    }, []);

    const onSubmit = (data) => {
        const requiredFields = formData.filter((field) => field.required && !data[field.name]);

        if (requiredFields.length > 0) {
            toast.error('Please fill in all required fields');
        } else {
            dispatch(createUserData(data));
            navigate('/');
        }
    };
    useEffect(() => {
        const hasUserData = userData && userData.email && userData.firstName;
        if (hasUserData) {
            navigate('/');
        }
    });

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
                <Typography component="h1" variant="h5">
                    User Information
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {formData.map((field) => (
                        <Box key={field.name} marginTop={2}>
                            <TextField
                                fullWidth
                                label={field.label}
                                variant="outlined"
                                id={field.name}
                                {...register(field.name, { required: field.required })}
                                error={!!errors[field.name]}
                                helperText={errors[field.name] && `${field.label} is required`}
                            />
                        </Box>
                    ))}
                    <Box marginTop={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default UserForm;
