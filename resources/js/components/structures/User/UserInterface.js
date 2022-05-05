import * as React from 'react';
// Chakra ui components
import { Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
// Custom component
import { PersonalCard } from './PersonalCard';

const FlexMotion = motion(Flex);

export function UserInterface(){

    return PersonalCard();

}