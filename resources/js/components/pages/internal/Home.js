import * as React from 'react';
// Axios
import Axios from 'axios';
// Chakra ui components
import { Flex, Progress} from '@chakra-ui/react';
import { motion } from 'framer-motion';
// Custom components
import { Layout } from './Layout';
import { ModalBackdrop } from '../../structures/Modal_Backdrop/ModalBackdrop';
// Hook for use the custom Context
import { useAuth } from '../../context/Auth';

const FlexMotion = motion(Flex);

export function Home(){

    const {auth, setAuth} = useAuth();

    React.useEffect(() => {

        setAuth({status: "loading"});

        Axios.get("/api/user")
        .then(function (response) {

            setAuth({status: "authenticated", information: {
                name: response.data.name,
                username: response.data.username,
                email: response.data.email,
                phone: response.data.phone,
                photo: response.data.photo,
                is_admin: response.data.is_admin
            }});

        }).catch((error) => {

            console.log(error)

            setAuth({status: "error"});

        });

    },[]);

    return(
        <>

            {auth.status === "authenticated" ? 
            <Layout /> 
            : 
            (auth.status === "loading" ? 
            <ModalBackdrop state = {"loading"} title = {"LOADING"} body = {Progress} /> 
            : 
            <ModalBackdrop state = {"error"} title = {"ERROR"} body = {"Authentication Error!"} />
            )}
        </>
    )
}