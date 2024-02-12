import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Container, CircularProgress } from '@mui/material';
import formData from './form-data.json';
import postServices from '../../services/postServices';
import toastService from '../../services/toastService';
import { useNavigate } from 'react-router-dom';

const AddPostForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await postServices.createPost({ ...data, userId: 1 });
            console.log('create post Api Resonse:', response);
            setIsSubmitting(false);
            toastService.success('Post created successfully ');
            navigate('/');
        } catch (error) {
            toastService.error('Error creating post');
            setIsSubmitting(false);
        }
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Typography component="h1" variant="h5" gutterBottom>
                Add Post
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                {formData.map((field) => (
                    <TextField
                        key={field.name}
                        fullWidth
                        label={field.label}
                        variant="outlined"
                        margin="normal"
                        {...register(field.name, {
                            required: true,
                        })}
                        error={!!errors[field.name]}
                        helperText={errors[field.name] && `${field.label} is required`}
                        multiline={field.name === 'body'}
                        rows={4}
                    />
                ))}
                <Button
                    type="submit"
                    sx={{ marginTop: '10px' }}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <CircularProgress size={24} style={{ color: '#fff' }} /> : 'Add Post'}
                </Button>
            </form>
        </Container>
    );
};

export default AddPostForm;
