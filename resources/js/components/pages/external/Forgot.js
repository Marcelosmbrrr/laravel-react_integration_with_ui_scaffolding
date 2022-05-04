// React native components
import * as React from 'react';
// Chakra ui and framer motion
import { Flex, FormControl, FormLabel, FormErrorMessage, Input, InputGroup, InputRightElement, IconButton, Box, Button, Progress } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
// Link react-router
import { Link } from 'react-router-dom';
// Fontsawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
// Formik and Yup validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
// Axios
import Axios from 'axios';

const MotionBox = motion(Box);

const animation = {
    closed: {
        display: "none",
        opacity: 0
    },
    open: {
        display: "block",
        opacity: 1,
        transition: {
            duration: 2,
            type: "spring"
        }
    }
}

export function Forgot(){

    const [isLoading, setIsLoading] = React.useState({send_code: false, change_password: false});
    const [openFormulary, setOpenFormulary] = React.useState(false);

    const formik_send_code = useFormik({
        initialValues: {
        email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Email is required").email("Invalid email")
        }),
        onSubmit: value => {
            setIsLoading({send_code: true, change_password: false});
            handleSendCodeSubmit(value);
        },
    });

    function handleSendCodeSubmit(value){

        Axios.post("/api/do-get-token", {
            email: value.email
          }).then(function (response) {

            setIsLoading({send_code: false, change_password: false});

            setOpenFormulary(true);

            alert("Message: " + response.data);

          }).catch((error) => {

            setIsLoading({send_code: false, change_password: false});

            console.log(error);

            alert("Status: " + error.response.status + " | Message: " + error.response.data.message);

          });

    }

    const formik_change_password = useFormik({
        initialValues: {
        code: '',
        new_password: '',
        confirm_new_password: ''
        },
        validationSchema: Yup.object({
            code: Yup.string().required("Code is required"),
            new_password: Yup.string().required('The new password is required').min(8, "Must have at least 8 characters"),
            confirm_new_password: Yup.string().required('Password must be confirmed').oneOf([Yup.ref('new_password')], 'Your passwords do not match')
        }),
        onSubmit: values => {
            setIsLoading({send_code: false, change_password: true});
            handleChangePasswordSubmit(values);
        },
    });

    function handleChangePasswordSubmit(values){

        Axios.patch(`/api/do-change-password`, {
            code: values.code,
            new_password: values.new_password,
            new_password_confirmation: values.confirm_new_password
          }).then(function (response) {

            setIsLoading({send_code: false, change_password: false});

            alert("Message: " + response.data);

            setTimeout(() => {

                window.location.href = "/login";

            }, 2000);

          }).catch((error) => {

            setIsLoading({send_code: false, change_password: false});

            console.log(error);

            alert("Status: " + error.response.status + " | Message: " + error.response.data.message);

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
                        <FontAwesomeIcon icon={faKey} size="2x" color={"#36BCA3"} />
                    </Box>

                    <Flex direction={"column"} style={{width: 400, mb: 2, background: "#fff"}} p={5} rounded={15}>
                    
                        <form onSubmit={formik_send_code.handleSubmit}>

                            <FormControl isInvalid={formik_send_code.errors.email && formik_send_code.touched.email}>
                                <InputGroup size='md'>
                                    <Input type="text" id='email' placeholder="Enter your email address" onBlur={formik_send_code.handleBlur} onChange={formik_send_code.handleChange} value={formik_send_code.values.email}/>
                                    <InputRightElement>
                                        <IconButton variant='outline' colorScheme='teal' icon={<EmailIcon />} type= "submit" />
                                    </InputRightElement>
                                </InputGroup> 
                                <FormErrorMessage>{formik_send_code.errors.email}</FormErrorMessage>
                            </FormControl>
                            {isLoading.send_code && <Progress size='md' colorScheme='green' isIndeterminate sx={{borderRadius: "5px", top: "5px"}} />}

                        </form>   

                        <MotionBox 
                        sx={{mt: 5}}
                        animate = {openFormulary ? "open" : "closed"}
                        variants = {animation}
                        >

                            <form onSubmit={formik_change_password.handleSubmit}>

                                <Flex direction={"column"} mb={5}>
                                    <FormControl isInvalid={formik_change_password.errors.code && formik_change_password.touched.code} sx={{mb: 2}}>
                                        <FormLabel htmlFor='code'>Code</FormLabel>
                                        <Input id='code' type='text' onBlur={formik_change_password.handleBlur} onChange={formik_change_password.handleChange} value={formik_change_password.values.code} />
                                        <FormErrorMessage>{formik_change_password.errors.code}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={formik_change_password.errors.new_password && formik_change_password.touched.new_password} sx={{mb: 2}}>
                                        <FormLabel htmlFor='new_password'>New Password</FormLabel>
                                        <Input id='new_password' type='password' onBlur={formik_change_password.handleBlur} onChange={formik_change_password.handleChange} value={formik_change_password.values.new_password} />
                                        <FormErrorMessage>{formik_change_password.errors.new_password}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={formik_change_password.errors.confirm_new_password && formik_change_password.touched.confirm_new_password} sx={{mb: 2}}>
                                        <FormLabel htmlFor='confirm_new_password'>Confirm New Password</FormLabel>
                                        <Input id='confirm_new_password' type='password' onBlur={formik_change_password.handleBlur} onChange={formik_change_password.handleChange} value={formik_change_password.values.confirm_new_password} />
                                        <FormErrorMessage>{formik_change_password.errors.confirm_new_password}</FormErrorMessage>
                                    </FormControl>
                                </Flex>

                                {isLoading.change_password && <Progress size='md' colorScheme='green' isIndeterminate sx={{borderRadius: "5px", bottom: "2px"}} />}
                                <Button type = "submit" colorScheme='teal' isFullWidth>Change password</Button>

                            </form>
                            
                        </MotionBox>

                        <Flex justify={"space-between"}>
                            <Link to ="/login">Login</Link>
                        </Flex> 
                    
                    </Flex>   
                </MotionBox>
            </Flex>
        </>
    )
}