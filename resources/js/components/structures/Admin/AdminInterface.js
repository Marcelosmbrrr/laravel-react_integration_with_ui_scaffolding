import * as React from 'react';
// Chakra ui components
import { Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
// Custom component
import { UsersTable } from './UsersTable';

const FlexMotion = motion(Flex);

export function AdminInterface(){

    alert("Admin Interface");

    return(
        <>
            <FlexMotion 
            width={"100vw"} 
            height={"100vh"} 
            justifyContent={"center"} 
            align={"center"} 
            background={"#19202B"}
            >  
                
                <UsersTable />
            </FlexMotion>
        </>
    );

}