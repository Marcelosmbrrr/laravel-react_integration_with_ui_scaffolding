// Chakra ui components
import { Flex, FormControl, FormLabel, FormErrorMessage, Input, Box, Button} from '@chakra-ui/react';
// Link react-router
import { Link } from 'react-router-dom';
// Custom components
import { PersonalCard } from '../../structures/PersonalCard';

export function Home(){

    return(
        <>
            <Flex width={"100vw"} height={"100vh"} justifyContent={"center"} align={"center"} background={"#19202B"}>   
                <PersonalCard />
            </Flex>
        </>
    )
}