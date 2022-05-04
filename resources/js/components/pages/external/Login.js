// Chakra ui and framer motion
import { Flex, FormControl, FormLabel, FormErrorMessage, Input, Box, Button} from '@chakra-ui/react';
import { motion } from 'framer-motion';
// Link react-router
import { Link } from 'react-router-dom';
// Fontsawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
// Formik and Yup validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
// Axios
import Axios from 'axios';
import React from 'react';

const MotionBox = motion(Box);

export function Login(){

    const formik = useFormik({
        initialValues: {
        email: '',
        password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email")
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required')
        }),
        onSubmit: values => {
            requestServerOperation(values);
        },
    });

    function requestServerOperation(values){

        Axios.post(`/api/do-login`, {
            email: values.email,
            password: values.password
          }).then(function (response) {
              console.log(response)
            alert(response.data.message);
          }).catch((error) => {
              alert(error);
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

                    <Box sx={{mb: 3, display: "flex", justifyContent: "center"}}>
                        <FontAwesomeIcon icon={faRightToBracket} size="2x" color={"#36BCA3"} />
                    </Box>

                    <Flex direction={"column"} background={"#fff"} p={5} rounded={15}>

                        <form onSubmit={formik.handleSubmit} style={{width: 400}}>

                            <FormControl mb={2} isInvalid={formik.errors.email && formik.touched.email}>
                                <FormLabel htmlFor='email'>Email address</FormLabel>
                                <Input id='email' type='email' placeholder="Enter your email address" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                            </FormControl>
                            
                            <FormControl mb={5} isInvalid={formik.errors.password && formik.touched.password}>
                                <FormLabel htmlFor='password'>Password</FormLabel>
                                <Input id='password' type='password' placeholder="Enter your password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
                                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                            </FormControl>

                            <Button type = "submit" colorScheme='teal' isFullWidth>Login</Button>
                        
                        </form>   

                        <Flex justify={"space-between"}>
                            <Link to ="/register">Register</Link>
                            <Link to ="/forgot-password">Forgot my password</Link>
                        </Flex> 

                    </Flex>
                </MotionBox>  
            </Flex>
        </>
    )
}