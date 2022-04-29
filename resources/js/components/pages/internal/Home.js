import * as React from 'react';
// Chakra ui components
import { Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
// Custom components
import { CommonUserInterface } from '../../structures/User/CommonUserInterface';
import { AdminInterface } from '../../structures/Admin/AdminInterface';

const FlexMotion = motion(Flex);

export function Home(){

    const [role, setRole] = React.useState('admin');

    return(
        <>
            <FlexMotion 
            width={"100vw"} 
            height={"100vh"} 
            justifyContent={"center"} 
            align={"center"} 
            background={"#19202B"}
            >  
                {role === 'admin' ? AdminInterface() : CommonUserInterface()}
            </FlexMotion>
        </>
    )
}