// React resources
import * as React from 'react';
// Chakra ui and framer motion
import {
Heading,
Box,
Center,
Text,
Stack,
VStack,
Input,
FormControl,
Button,
useColorModeValue,
Flex,
Image,
Link as CommonLink
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
// Fontsawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
// Png image from assets
import DefaultImage from "../../../assets/images/personal/default.png";
// Formik and Yup validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
// Context
import { useAuth } from '../../context/Auth';
// Lottie
import { AddLottie } from '../../../assets/lottie/AddLottie';

const MotionBox = motion(Box);

export function PersonalCard({...props}){

    const {auth, setAuth} = useAuth();

    const [editProfile, setEditProfile] = React.useState(false);

    const formik = useFormik({
        initialValues: {
        username: auth.information.username,
        email: auth.information.email
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Name is required"),
            email: Yup.string().required("Email is required").email("Email invalid")
        }),
        onSubmit: values => {
            handleUpdateProfileSubmit(values);
        },
    });

    function handleUpdateProfileSubmit(values){

        console.log(values)

    }

    return(
        <> 
        <Center py={6}>
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

                <Box sx={{mb: 3, display: "flex", justifyContent: "center", color: "#36BCA3"}}>
                    <FontAwesomeIcon icon={faAddressCard} size="2x" />
                </Box>

                <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: '100%', md: '600px' }}
                direction={{ base: 'column', md: 'row' }}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                padding={1}
                >
                    <Flex sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} bg="blue.200" rounded={5}>
                        {/*<Image
                            objectFit="cover"
                            boxSize="100%"
                            src={auth.information.photo ? auth.information.photo : DefaultImage}
                        />*/}
                        <AddLottie />
                    </Flex>

                    <Stack
                    flex={1}
                    flexDirection="column"
                    justifyContent="space-between"
                    alignItems="center"
                    p={1}
                    pt={2}
                    >
                        <Box width={"250px"}>
                            {!editProfile ? 
                            <div>
                                <Heading fontSize={'2xl'} fontFamily={'body'} textAlign="center">
                                    {`@${auth.information.username}`}
                                </Heading>
                                <Text fontWeight={600} color={'gray.500'} size="sm" mb={4} textAlign="center">
                                    {auth.information.email}
                                </Text>
                            </div>
                            
                            : 
                            <form onSubmit={formik.handleSubmit}>
                                <FormControl mb={1} isInvalid={formik.errors.username && formik.touched.username}>
                                    <Input type="text" placeholder='Enter your username' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} />
                                </FormControl>
                                <FormControl mb={2} isInvalid={formik.errors.email && formik.touched.email}>
                                    <Input type="text" placeholder='Enter your email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                                </FormControl>
                                <input type="file" accept="image/png, image/jpeg"/>
                                <Flex mt={3}>
                                    <Button mr={2} colorScheme='teal' isFullWidth onClick={() => {setEditProfile(false)}}>Close</Button>
                                    <Button colorScheme='teal' isFullWidth type='submit'>Update</Button>
                                </Flex>
                            </form>
                           
                            }

                        </Box>

                        <VStack
                        width={'100%'}
                        mt={'2rem'}
                        direction={'row'}
                        padding={1}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        >
                            {!editProfile && 
                            <Button colorScheme='teal' isFullWidth onClick={() => {setEditProfile(true)}}>Update Profile</Button>
                            }
                            
                            <Button colorScheme='teal' isFullWidth>Download Profile Data</Button>
                            {auth.information.is_admin && <Button colorScheme='teal' isFullWidth>Admin Section</Button>}
                            
                        </VStack>

                    </Stack>
                </Stack>
            </MotionBox>
        </Center>
        </>
    );
}