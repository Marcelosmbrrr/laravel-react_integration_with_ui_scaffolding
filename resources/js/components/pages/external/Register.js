import * as React from 'react'; 
// Chakra ui and framer motion
import { Flex, FormControl, FormLabel, FormErrorMessage, Input, Box, Button, Select, Progress } from '@chakra-ui/react';
import { motion } from 'framer-motion';
// Link react-router
import { Link } from 'react-router-dom';
// Fontsawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
// Formik and Yup validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
// Axios
import Axios from 'axios';
// Input Mask
import InputMask from "react-input-mask";
// Custom

const MotionBox = motion(Box);

const masks_by_country = {
    brazil: "(55)**9****-****",
    us: "1(***)***-****"
}

export function Register(){

    const [isLoading, setIsLoading] = React.useState(false);

    const formik = useFormik({
        initialValues: {
        name: '',
        username: '',
        email: '',
        phone: '',
        country: 'none',
        password: '',
        confirm_password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            username: Yup.string().required("Username is required").min(6, "Must have at least 6 characters"),
            email: Yup.string().required('Email is required').email("Invalid email"),
            phone: Yup.string().required("Phone is required"),
            country: Yup.string().required("A country need to be selected"),
            password: Yup.string().required('Password is required').min(8, "Must have at least 8 characters"),
            confirm_password: Yup.string().required('Password must be confirmed').oneOf([Yup.ref('password')], 'Your passwords do not match')
        }),
        onSubmit: values => {
            setIsLoading(true);
            requestServerOperation(values);
        },
    });

    function requestServerOperation(values){

        Axios.post(`/api/do-registration`, {
            name: values.name,
            username: values.username,
            email: values.email,
            password: values.password,
            phone: values.phone.replace("(", "").replace(")", "").replace("-", ""),
            password: values.password,
            password_confirmation: values.confirm_password // password_confirmation = laravel pattern for validation
          }).then(function (response) {

            setIsLoading(false);

            alert("Message: " + response.data + "\r\n" + "Check your e-mail for confirm your registration!");

            setTimeout(() => {

                window.location.href = "/login";

            }, 2000);

          }).catch((error) => {

            setIsLoading(false);

            console.log(error);

            alert(error.response.data);

          });

    }

    return(
        <>
            <Flex width={"100vw"} height={"100vh"} justifyContent={"center"} align={"center"} background={"#19202B"}>

                <MotionBox 
                p={2} 
                background={"#222"} 
                rounded={15}
                initial = {{scale: 0.8}}
                animate = {{
                    scale: 1
                }}
                transition={{
                    duration: 1,
                    type: "spring"
                }}
                >

                    <Box mb={3} textAlign={"center"}>
                        <FontAwesomeIcon icon={faUserPlus} size="2x" color={"#36BCA3"} />
                    </Box>

                    <Flex direction={"column"} background={"#fff"} p={5} rounded={15}>
                    
                        <form onSubmit={formik.handleSubmit} style={{width: 400}}>
                            <Flex>
                                <FormControl sx={{mb: 2, mr: 3}} isInvalid={formik.errors.name && formik.touched.name}>
                                    <FormLabel htmlFor='name'>Name</FormLabel>
                                    <Input id='name' type='text' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
                                    <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                                </FormControl>

                                <FormControl sx={{mb: 2}} isInvalid={formik.errors.username && formik.touched.username}>
                                    <FormLabel htmlFor='username'>Username</FormLabel>
                                    <Input id='username' type='text' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} />
                                    <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                                </FormControl>
                            </Flex>

                            <FormControl sx={{mb: 2}} isInvalid={formik.errors.email && formik.touched.email}>
                                <FormLabel htmlFor='email'>Email address</FormLabel>
                                <Input id='email' type='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                            </FormControl>

                            <FormControl sx={{mb: 2}} isInvalid={formik.errors.country && formik.touched.country}>
                                <FormLabel htmlFor='country'>Country</FormLabel>
                                <Select id = "country" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.country}>
                                    <option value = 'none' disabled>Select Option</option>
                                    <option value='brazil'>Brazil</option>
                                    <option value='us'>United States</option>
                                </Select>
                                <FormErrorMessage>{formik.errors.country}</FormErrorMessage>
                            </FormControl>

                            <FormControl sx={{mb: 2}} isInvalid={formik.errors.phone && formik.touched.phone}>
                                <FormLabel htmlFor='phone'>Phone Number</FormLabel>  
                                <Input 
                                id='phone' 
                                type='tel' 
                                onBlur={formik.handleBlur} 
                                onChange={formik.handleChange} 
                                value={formik.values.phone} 
                                as={InputMask} 
                                mask={masks_by_country[formik.values.country]}
                                maskChar={null} 
                                disabled={formik.values.country == 'none'} 
                                placeholder={formik.values.country == 'none' ? 'Select a country before' : ''}
                                /> 
                                <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
                            </FormControl>

                            <FormControl sx={{mb: 2}} isInvalid={formik.errors.password && formik.touched.password}>
                                <FormLabel htmlFor='password'>Password</FormLabel>
                                <Input id='password' type='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
                                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                            </FormControl>

                            <FormControl sx={{mb: 5}} isInvalid={formik.errors.confirm_password && formik.touched.confirm_password}>
                                <FormLabel htmlFor='confirm_password'>Confirm Password</FormLabel>
                                <Input id='confirm_password' type='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirm_password} />
                                <FormErrorMessage>{formik.errors.confirm_password}</FormErrorMessage>
                            </FormControl>

                            {isLoading && <Progress size='md' colorScheme='green' isIndeterminate sx={{borderRadius: "5px", bottom: "2px"}} />}
                            <Button type = "submit" colorScheme='teal' isFullWidth>Register</Button> 
                        </form>   

                        <Flex justify={"space-between"}>
                            <Link to ="/login">Login</Link>
                            <Link to ="/forgot-password">Forgot my password</Link>
                        </Flex> 
                    
                    </Flex>   
                </MotionBox>
            </Flex>
        </>
    )
}