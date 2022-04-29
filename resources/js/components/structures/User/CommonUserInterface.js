import * as React from 'react';
// Chakra ui components
import { Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
// Custom component
import { PersonalCard } from './PersonalCard';

const FlexMotion = motion(Flex);

export function CommonUserInterface(){

    alert("Common User Interface");

    return(
        <>
            <FlexMotion 
            width={"100vw"} 
            height={"100vh"} 
            justifyContent={"center"} 
            align={"center"} 
            background={"#19202B"}
            >  
                <PersonalCard />
            </FlexMotion>
        </>
    );

}