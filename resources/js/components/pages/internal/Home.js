// Chakra ui components
import { Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
// Link react-router
import { Link } from 'react-router-dom';
// Custom components
import { PersonalCard } from '../../structures/PersonalCard';

const FlexMotion = motion(Flex);

export function Home(){

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
    )
}